<template>
    <div id="schedule" class="container">
        <div class="row">
            <filter-bar />
            <day
                    v-if="ready"
                    v-for="day in days"
                    :key="day.day"
                    :ready="ready"
                    :day="day"
                    :filter="filter"
                    :filterActive="filterActive"
            />
            <day
                    v-if="!ready"
                    :ready="ready"
                    :filter="filter"
                    :filterActive="filterActive"
            />
        </div>
    </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex';

  export default {
    name: 'timetable',
    computed: {
      ...mapState(['ready', 'days', 'filter']),
      ...mapGetters(['filterActive']),
    },
    components: {
      FilterBar: () => import('./FilterBar.vue'),
      Day: () => import('./Day.vue'),
    },
    methods: mapActions(['loadFromRemote']),
    mounted() {
      this.loadFromRemote();
    },
  };
</script>
