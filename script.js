const goods = [
  { image: "images/featured/1.jpg", title: 'Shirt', price: 150 },
  { image: "images/featured/2.jpg", title: 'Socks', price: 50 },
  { image: "images/featured/3.jpg", title: 'Jacket', price: 350 },
  { image: "images/featured/4.jpg", title: 'Shoes', price: 250 },
];

class GoodsItem {
  constructor({ image, title, price }) {
    this.image = image;
    this.title = title;
    this.price = price;
  }

  render() {
    return `
    <div class="featuredItem" data-id="1" data-name="ELLERY X M'O CAPSULE 1" data-price="52.22">
      <div class="featuredImgWrap">
        <img src=${this.image} alt="">
        <div class="featuredImgDark">
          <button class="addToCart">
            <img src="images/cart.svg" alt="">
            Add to Cart
          </button>
        </div>
      </div>
      <div class="featuredData">
        <div class="featuredName">
          ${this.title}
        </div>
        <div class="featuredText">
          Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery
          teams
          up with Moda Operandi.
        </div>
        <div class="featuredPrice">
          $${this.price}
        </div>
      </div>
    </div>   
  `;
  }
}

class GoodsList {
  constructor() {
    this.goods = goods;
  }

  render() {
    const _goods = [...this.goods];

    const _goodsItems = _goods.map((item) => {
      const goodsItem = new GoodsItem(item);
      return goodsItem.render();
    });
    document.querySelector('.goods-list .featuredItems').innerHTML = _goodsItems.join('');
  }

  getTotalSum() {
    const _goods2 = [...this.goods];
    let goodsPrice = 0;
    for (let i = 0; i < _goods2.length; i++) {
      goodsPrice = goodsPrice + _goods2[i].price;
    }
    return goodsPrice;
  }

}

onload = () => {
  const goodsList = new GoodsList();
  goodsList.render();
}

class Basket {

  open() {

  }

  close() {

  }

  addItem() {

  }

  removeItem() {

  }

  getTotalSum() {

  }

  getTotalCount() {

  }

}

class BasketItem {

  addCount() {

  }

  removeCount() {

  }

  getSum() {

  }

  getCount() {

  }

}