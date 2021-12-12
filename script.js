const reformData = (items) => {
  return items.map(({ product_name, ...rest }) => {
    return {
      ...rest,
      title: product_name
    }
  });
}

const URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GOODS_POSTFIX = "/catalogData.json";
const CART_POSTFIX = "/getBasket.json";

const service = function (url, postfix) {
  return new Promise((resolve, reject) => {
    fetch(`${url}${postfix}`).then((res) => {
      return res.json();
    }).then((data) => {
      resolve(data);
    });
  });
}

class Basket {

  setBasket() {
    return service(URL, CART_POSTFIX);
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

  const app = new Vue({
    el: "#app",
    data: {
      goods: 'Нет данных',
      filteredGoods: 'Нет данных',
      searchLine: '',
      isVisibleCart: false
    },
    mounted() {
      service(URL, GOODS_POSTFIX).then((data) => {
        const result = reformData(data);
        this.goods = result;
        this.filteredGoods = result;
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
