<template>
    <div class="session-wrap" :class="ready ? [''] : ['notReady']">
        <div class="session">
            <div class="session-card z-depth-1">
                <div class="overlay">
                    <div class="card-content">
                        <template v-if="ready">
                            <span class="card-title">{{ event.display }}</span>
                            <ul class="meta">
                                <li v-if="event.language">{{ event.language }}</li>
                                <li>{{ event.venue.name }}</li>
                            </ul>
                        </template>
                        <linear-loader v-if="!ready" />
                    </div>

                    <tag :tags="event.tags" />

                    <speaker v-if="event.topic" :speaker="event.speaker" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'session',
    components: {
      LinearLoader: () => import('./LinearLoader.vue'),
      Speaker: () => import('./Speaker.vue'),
      Tag: () => import('./Tag.vue'),
    },
    props: {
      event: {
        type: Object,
        default: () => ({
          topic: false,
        }),
      },
      ready: {
        type: Boolean,
        required: true,
      }
    },
  }
</script>