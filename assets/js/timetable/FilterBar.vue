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
                    <li>Beginner</li>
                    <li>Intermediate</li>
                    <li>Advance</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'filter-bar',
    data() {
      return {
        dropdown: false,
      };
    },
    methods: {
      toggle() {
        this.dropdown = !this.dropdown;
      },
    }
  }
</script>
