<template>
    <div
            :id="id"
            class="col s12"
            :data-day="day.day"
    >
        <h4 v-if="ready">Day {{ day.day }}</h4>
        <timeslot
                v-if="ready"
                v-for="(timeslot, i) in day.timeslots"
                :key="i"
                :timeslot="timeslot"
                :ready="ready"
        />
        <timeslot
                v-if="!ready"
                :ready="ready"
        />
    </div>
</template>

<script>
  export default {
    components: {
      Timeslot: () => import('./Timeslot.vue'),
    },
    props: {
      day: {
        type: Object,
        required: false,
        default: () => ({
          day: 0,
          timeslots: [],
        }),
      },
      ready: {
        type: Boolean,
        required: true,
      },
    },
    computed: {
      id() {
        return `day${this.day.day}`;
      },
    },
  };
</script>
