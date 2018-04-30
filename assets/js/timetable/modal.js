import Vue from 'vue';
import Modal from './Modal.vue';

export default function createModal(store) {
  return new Vue({
    store,
    render: h => h(Modal),
  });
}
