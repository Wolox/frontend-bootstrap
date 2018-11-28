import Vue from 'vue';

const Example = () => import(/* webpackChunkName: "example" */ '../../components/Example');

import './index.pug';
import './index.scss';

// eslint-disable-next-line
const vm = new Vue({
  el: '#app',
  components: {
    Example
  },
  data: {
    title: 'Frontend Bootstrap!'
  }
});
