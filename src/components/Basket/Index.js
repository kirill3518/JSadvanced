import { fetchAddBaskedGoods } from "../../services";
// import { BasketItem } from "../../components/basket-item";
// import { CustomButton } from "../../components/custom-button";


export default Vue.component('basket', {
  props: ['close'],
  // components: {
  //   'basket-item': BasketItem,
  //   'custom-button': CustomButton
  // },
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
        <custom-button class="closeBasket" @click="$emit('close')"><img src="../images/close-card.svg" alt="close"></custom-button>
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