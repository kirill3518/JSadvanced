export default Vue.component('cart-search', {
  props: ['searchLine'],
  template: `
    <input
      v-bind:value="searchLine"
      v-on:input="$emit('input', $event.target.value)"
      placeholder="Введите название товара"
    >
    `
});