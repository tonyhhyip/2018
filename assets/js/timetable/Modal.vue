<template>
    <div id="modal" :class="{ show: open }">
        <div class="modal modal-fixed-footer modal-event-details">
            <div class="modal-content">
                <div class="metadata">
                    <div class="main-info">
                        <div class="info">
                            <h2>{{ event.display }}</h2>
                            <div
                                class="description"
                                v-if="event.description"
                                v-html="event.description"
                            ></div>
                            <div class="card event-card">
                                <div class="card-content">
                                    <p v-if="event.detail">{{ event.detail }}</p>
                                    <div>
                                        <i class="material-icons">event</i>
                                        <span>
                                            {{ event.startTime }} - {{ event.endTime }}
                                            &nbsp;
                                            (DAY {{ event.day }})
                                        </span>
                                    </div>
                                    <div v-if="event.venue">
                                        <i class="material-icons">explore</i>
                                        <span>{{ event.venue.name }}</span>
                                    </div>
                                    <div v-if="event.language">
                                        <i class="material-icons">message</i>
                                        <span>{{ event.language }}</span>
                                    </div>
                                    <div v-if="event.topic && event.level">
                                        <i class="material-icons">network_check</i>
                                        <span>{{ event.level }}</span>
                                    </div>
                                </div>
                            </div>
                            <div v-if="event.topic && event.speakers && event.speakers.length > 0" class="card person-card">
                                <div class="card-content">
                                    <div class="speakers">
                                        <div v-for="(speaker, index) in event.speakers" :key="index" class="speaker">
                                            <div class="thumbnail">
                                                <i v-if="!speaker.thumbnail" class="material-icons">account_circle</i>
                                                <img v-if="speaker.thumbnail" :src="speaker.thumbnail" />
                                            </div>
                                            <div class="details">
                                                <div class="name">
                                                    <span>{{ speaker.name }}</span>
                                                </div>
                                                <div
                                                    class="description"
                                                    v-if="speaker.description && speaker.description != ''"
                                                    v-html="speaker.description"
                                                ></div>
                                                <div
                                                    class="affiliations"
                                                    v-if="speaker.community || speaker.country"
                                                >
                                                    <ul>
                                                        <li v-if="speaker.community">{{ speaker.community }}</li>
                                                        <li v-if="speaker.country">{{ speaker.country }}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="modal-action waves-effect waves-light btn" @click="closeModal">Close</button>
            </div>
        </div>
        <div class="modal-overlay" @click="closeModal"></div>
    </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';

  /* globals window */
  const { mapState, mapActions } = createNamespacedHelpers('modal');

  export default {
    name: 'modal',
    computed: mapState(['open', 'event']),
    methods: mapActions(['closeModal']),
    mounted() {
      window.addEventListener('keyup', (e) => {
        if (this.open && e.keyCode === 27) {
          this.closeModal();
        }
      });
    },
  };
</script>
