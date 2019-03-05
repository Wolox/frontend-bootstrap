import Vue from 'vue'

import { installServiceWorker } from '../../serviceWorkerInstaller'

const Example = () => import(/* webpackChunkName: "example" */ '../../components/Example')

import './index.pug'
import './index.scss'

// eslint-disable-next-line
const vm = new Vue({
  el: '#app',
  components: {
    Example
  },
  data: {
    title: 'Welcome to Frontend Bootstrap!'
  }
})

if (process.env.NODE_ENV === 'production') {
  installServiceWorker()
}
