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

const service = function (url, postfix) {
  return new Promise((resolve, reject) => {
    fetch(`${url}${postfix}`).then((res) => {
      return res.json();
    }).then((data) => {
      resolve(data);
    });
  });
}

class GoodsItem {
  constructor({ title, price }) {
    this.title = title;
    this.price = price;
  }

  render() {
    return `
    <div class="featuredItem">
      <div class="featuredData">
        <div class="featuredName">
          ${this.title}
        </div>
        <div class="featuredPrice">
          $${this.price}
        </div>
      </div >
    </div >
  `;
  }
}

class GoodsList {

  getTotalSum() {
    const _goods2 = [...this.goods];
    let goodsPrice = 0;
    for (let i = 0; i < _goods2.length; i++) {
      goodsPrice = goodsPrice + _goods2[i].price;
    }
    return goodsPrice;
  }

  setGoods() {
    return service(URL, GOODS_POSTFIX).then((data) => {
      return reformData(data);
    });
  }

  render() {
    this.setGoods().then((data) => {
      this.goods = data;
      const _goods = [...this.goods];
      const _goodsItems = _goods.map((item) => {
        const goodsItem = new GoodsItem(item);
        return goodsItem.render();
      });
      document.querySelector('.goods-list .featuredItems').innerHTML = _goodsItems.join('');
    });
  }
}


const productEl = document.querySelector('.products');
const cartIconWrapEl = document.querySelector('.cartIconWrap');
const spanEl = cartIconWrapEl.querySelector("span");
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketEl = document.querySelector('.basket');
cartIconWrapEl.onclick = () => {
  basketEl.classList.toggle("hidden");
}


const CART_POSTFIX = "/getBasket.json";

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
  const goodsList = new GoodsList();
  goodsList.render();

  const basket = new Basket();
  basket.render();
}

