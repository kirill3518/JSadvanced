const reformData = (items) => {
  return items.map(({ product_name, ...rest }) => {
    return {
      ...rest,
      title: product_name
    }
  });
}

const URL = "http://localhost:8000";
const GOODS_POSTFIX = "/goods.json";
const BASKET_GOODS_POSTFIX = "/getBasket.json";
const ADD_GOOD_TO_BASKET_POSTFIX = "/addToBasket.json";
const DELETE_GOOD_TO_BASKET_POSTFIX = "/deleteFromBasket.json";

// app.post('/:id', (req, res)
const fetchAddGood = (id) => {
  fetch(`${URL}/${id}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    }
  });
}

// app.get('/basketgoods', (req, res)
const fetchAddBaskedGoods = (id) => {
  return fetch(`${URL}/basketgoods`).then((res) => {
    return res.json();
  }).then((data) => {
    return data;
  });
}

// app.delete('/:id', (req, res)
const fetchDeleteBaskedGoods = (id) => {
  // console.log(id);
  fetch(`${URL}/delete/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    }
  });
}

const service = function (url, postfix, method = "GET") {
  return new Promise((resolve, reject) => {
    fetch(`${url}${postfix}`, {
      method
    }).then((res) => {
      return res.json();
    }).then((data) => {
      resolve(data);
    });
  });
}

class Basket {

  setBasket() {
    return service(URL, BASKET_GOODS_POSTFIX);
  }

  deleteGoodToBasket(id) {
    return service(URL, `${DELETE_GOOD_TO_BASKET_POSTFIX}/${id}`, "DELETE").then((data) => {

    });
  }

  render() {
    this.setBasket().then((data) => {
      this.goods = data;
      const { contents, amount, countGoods } = this.goods;
      const _basketItems = contents.map((item) => {
        const backetItem = new BasketItem(item);
        return backetItem.render();
      });
      productEl.innerHTML = _basketItems.join('');
      spanEl.textContent = countGoods;
      basketTotalValueEl.textContent = amount;
    });
  }
}

class BasketItem {

  constructor({ product_name, quantity, price }) {
    this.product_name = product_name;
    this.quantity = quantity;
    this.price = price;
  }

  render() {
    return `
    <div class="product">
      <div>${this.product_name}</div>
      <div>${this.quantity} шт.</div>
      <div>$${this.price}</div>
      <div>$${(this.quantity * this.price).toFixed(2)}</div>
		</div>
  `;
  }
}

onload = () => {

  Vue.component('cart-search', {
    props: ['searchLine'],
    template: `
    <input
      v-bind:value="searchLine"
      v-on:input="$emit('input', $event.target.value)"
      placeholder="Введите название товара"
    >
    `
  });


  Vue.component('basket', {
    props: ['close'],
    data: function () {
      return {
        basketGoods: []
      }
    },
    template: `
      <div class="basket">
        <div class="basketRow basketHeader">
          <div>Название товара</div>
          <div>Количество</div>
          <div>Цена за шт.</div>
          <div>Итого</div>
        </div>

        <basket-item v-for="item in basketGoods" v-bind:item="item" v-bind:key="item.id"></basket-item>

        <div class="basketTotal">
          Товаров в корзине на сумму:
          $<span class="basketTotalValue">{{ totalSum }}</span>
        </div>
        <custom-button class="closeBasket" @click="$emit('close')"><img src="images/close-card.svg" alt="close"></custom-button>
      </div>
    `,
    mounted() {
      fetchAddBaskedGoods().then((data) => {
        this.basketGoods = data;
      });
    },
    computed: {
      totalSum: function () {
        let sum = 0;
        this.basketGoods.forEach(element => {
          sum = sum + element.price * element.count;
        });
        return sum
      }
    }
  });

  Vue.component('custom-button', {
    props: ['click'],
    template: `
      <button @click="$emit('click')">
        <slot></slot>
      </button>
    `
  });

  Vue.component('goods-item', {
    props: ['item'],
    template: `
      <div class="featuredData">
        <div class="featuredName">
          {{ item.title }}
        </div>
        <div class="featuredPrice">
          $ {{ item.price }}
        </div>
        <div>
          <custom-button @click="addGood">Добавить товар</custom-button>
          <custom-button @click="deleteGood">Удалить товар</custom-button>
        </div>
      </div>
    `,
    methods: {
      addGood() {
        fetchAddGood(this.item.id);
      },
      deleteGood() {
        fetchDeleteBaskedGoods(this.item.id);
      }
    }
  });

  Vue.component('basket-item', {
    props: ['item'],
    template: `
      <div class="basket-item">
        <div class="featuredName">
          {{ item.title }}
        </div>
        <div class="featuredCount">
          {{ item.count }} шт.
        </div>
        <div class="featuredPrice">
          $ {{ item.price }}
        </div>
        <div class="featuredTotal">
          $ {{ item.count * item.price }}
        </div>
      </div>
    `
  });

  const app = new Vue({
    el: "#app",
    data: {
      goods: 'Нет данных',
      filteredGoods: [],
      searchLine: '',
      isVisibleCart: false
    },
    mounted() {
      service(URL, GOODS_POSTFIX).then((data) => {
        this.goods = data;
        this.filteredGoods = data;
      });
    },
    methods: {
      filterGoods() {
        this.filteredGoods = this.goods.filter(({ title }) => {
          return new RegExp(this.searchLine, 'i').test(title);
        });
      },
      showBasket() {
        this.isVisibleCart = true
      },
      closeBasket() {
        this.isVisibleCart = false
      }
    }
  });
}
