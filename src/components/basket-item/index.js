export default Vue.component('basket-item', {
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