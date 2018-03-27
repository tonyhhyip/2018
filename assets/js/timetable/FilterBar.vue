<template>
    <div class="col s12" data-usage="filter">
        <div class="filter-bar primary secondary-text">
            <button @click="toggle">
                <i class="material-icons">filter_list</i>
                <span>Filter</span>
            </button>
        </div>
        <div class="filter-items z-depth-1" :class="dropdown ? 'show' : 'hide'">
            <div class="filter-type">
                <h5>Difficult</h5>
                <ul>
                    <li
                            v-for="level in levels"
                            :key="level"
                            :class="activeLevels.indexOf(level) !== -1 ? 'active': ''"
                            @click="() => toggleLevel(level)"
                    >
                        {{ level }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';

  const { mapActions, mapState } = createNamespacedHelpers('filter');

  export default {
    name: 'filter-bar',
    data() {
      return {
        dropdown: false,
        levels: ['Beginner', 'Intermediate', 'Advance'],
      };
    },
    computed: mapState({
      activeLevels: 'level',
    }),
    methods: {
      toggle() {
        this.dropdown = !this.dropdown;
      },
      ...mapActions({
        toggleLevel: 'toggleLevel',
      }),
    },
  };
</script>
