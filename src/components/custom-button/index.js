export default Vue.component('custom-button', {
  props: ['click'],
  template: `
      <button @click="$emit('click')">
        <slot></slot>
      </button>
    `
});