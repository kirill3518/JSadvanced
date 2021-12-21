import { fetchAddGood, fetchDeleteBaskedGoods } from '../../services';
// import { CustomButton } from "../../components/custom-button";

export default Vue.component('goods-item', {
  props: ['item'],
  // components: {
  //   'custom-button': CustomButton
  // },
  template: `
      <div class="featuredItem">
        <div class="featuredImgWrap">
          <img v-bind:src="item.image" alt="">
          <div class="featuredImgDark">
            <button class="addToCart">
              <img src="../images/cart.svg" alt="">
                Add to Cart
            </button>
          </div>
        </div>
        <div class="featuredData">
          <div class="featuredName">
            {{ item.title }}
          </div>
          <div class="featuredPrice">
            $ {{ item.price }}
          </div>
          <div class="featuredAddDelite">
            <custom-button @click="addGood">Добавить товар</custom-button>
            <custom-button @click="deleteGood">Удалить товар</custom-button>
          </div>
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