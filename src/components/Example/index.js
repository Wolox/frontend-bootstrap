import Vue from 'vue'

import './styles.scss'

export default Vue.component('example', {
  template: `
    <h1 class="title">
      {{ message }}
    </h1>
  `,
  data: () => ({
    message: 'This is an example component!'
  })
})
