<template>
    <div class="timeslot">
        <div class="startTime">
            <template v-if="ready">
                <span class="hours">{{ timeslot.startTime.slice(0, 2) }}</span>
                <span class="minutes">{{ timeslot.startTime.slice(3) }}</span>
            </template>
            <linear-loader v-if="!ready" />
        </div>
        <div class="sessions">
            <template v-if="ready">
                <session
                        v-for="(event, i) in timeslot.events"
                        :key="i"
                        :event="event"
                        :ready="ready"
                />
            </template>
            <session v-if="!ready" :ready="ready" />
        </div>
    </div>
</template>

<script>
  export default {
    name: 'timeslot',
    components: {
      LinearLoader: () => import('./LinearLoader.vue'),
      Session: () => import('./Session.vue'),
    },
    props: {
      ready: {
        type: Boolean,
        required: true,
      },
      timeslot: {
        type: Object,
        required: false,
      }
    }
  }
</script>
