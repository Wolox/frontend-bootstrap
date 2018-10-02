import Vue from 'vue'

const Example = () => import(/* webpackChunkName: "example" */ '../../components/Example')

import './index.pug'
import './index.scss'

const vm = new Vue({
  el: '#app',
  data: {
    title: 'Frontend Bootstrap!'
  },
  components: {
    Example
  }
})
