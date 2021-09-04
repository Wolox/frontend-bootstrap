import Vue from 'vue'
import Example from '../../components/Example'

// const Example = () => import(/* webpackChunkName: "example" */ '../../components/Example')

import './about.pug'
import './about.scss'

// eslint-disable-next-line
const vm = new Vue({
  el: '#about',
  components: {
    Example
  },
  data: {
    title: 'Welcome to Frontend Bootstrap!'
  }
})
