import { service } from './services';
import { URL, GOODS_POSTFIX } from './constants';
import CartSearch from './components/cart-search';
import GoodsItem from './components/goods-item';
import Basket from './components/Basket';
import { BasketItem } from "./components/basket-item";
import { CustomButton } from "./components/custom-button";

const reformData = (items) => {
  return items.map(({ product_name, ...rest }) => {
    return {
      ...rest,
      title: product_name
    }
  });
}

onload = () => {

  const app = new Vue({
    el: "#app",
    components: {
      'basket': Basket,
      'cart-search': CartSearch,
      'goods-item': GoodsItem,
      'basket-item': BasketItem,
      'custom-button': CustomButton
    },
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
