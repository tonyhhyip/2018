<template>
    <div class="col s12">
        <ul class="tabs z-depth-2 secondary" ref="tabs">
            <template v-if="ready">
                <li class="tab col s3" v-for="day in days" :key="day.day">
                    <a :href="`#day${day.day}`" class="primary-text">
                        Day {{ day.day }}
                    </a>
                </li>
                <li class="col s2 filter">
                <span>
                    <i class="material-icons">filter_list</i>
                    <span class="hide-on-med-and-down">Filter</span>
                </span>
                </li>
            </template>
            <circular-loader v-else />
        </ul>
    </div>
</template>

<script>
  import $ from 'jquery';
  import CircularLoader from './CircularLoader.vue';

  export default {
    name: 'tab-bar',
    components: {
      CircularLoader,
    },
    props: {
      days: {
        required: true,
      },
      ready: {
        required: true,
        type: Boolean,
      }
    },
    methods: {
      bind() {
        if (this.ready) {
          $(this.$refs.tabs.$el).tabs();
        }
      },
    },
    mounted() {
      this.bind();
    },
    updated() {
      this.bind();
    },
  }
</script>
