<template>
    <div id="schedule" class="container">
        <div class="row">
            <tab-bar
                    :ready="ready"
                    :days="days"
            />
            <day
                    v-if="ready"
                    v-for="day in days"
                    :key="day.day"
                    :ready="ready"
                    :day="day"
            />
            <day
                    v-if="!ready"
                    :ready="ready"
            />
        </div>
    </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'timetable',
    computed: mapState(['days', 'ready']),
    components: {
      TabBar: () => import('./TabBar.vue'),
      Day: () => import('./Day.vue'),
    },
    methods: mapActions(['loadFromRemote']),
    mounted() {
      this.loadFromRemote();
    }
  }
</script>
