const goods = [
  { image: "images/featured/1.jpg", title: 'Shirt', price: 150 },
  { image: "images/featured/2.jpg", title: 'Socks', price: 50 },
  { image: "images/featured/3.jpg", title: 'Jacket', price: 350 },
  { image: "images/featured/4.jpg", title: 'Shoes', price: 250 },
];

const renderGoodsItem = (image = 'images/featured/noProduct.jpg', title = '', price = 0) => `
    <div class="featuredItem" data-id="1" data-name="ELLERY X M'O CAPSULE 1" data-price="52.22">
      <div class="featuredImgWrap">
        <img src=${image} alt="">
        <div class="featuredImgDark">
          <button class="addToCart">
            <img src="images/cart.svg" alt="">
            Add to Cart
          </button>
        </div>
      </div>
      <div class="featuredData">
        <div class="featuredName">
          ${title}
        </div>
        <div class="featuredText">
          Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery
          teams
          up with Moda Operandi.
        </div>
        <div class="featuredPrice">
          $${price}
        </div>
      </div>
    </div>   
  `;


const renderGoodsList = (list) => {
  let goodsList = list.map(item => renderGoodsItem(item.image, item.title, item.price)).join("");
  document.querySelector('.goods-list .featuredItems').innerHTML = goodsList;
}

onload = () => renderGoodsList(goods);
