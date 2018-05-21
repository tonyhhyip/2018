<template>
    <div id="modal" :class="{ show: open }">
        <div class="modal modal-fixed-footer modal-event-details">
            <div class="modal-content">
                <div class="metadata">
                    <div class="main-info">
                        <div class="info">
                            <div class="header">
                                <h2>{{ event.display }}</h2>
                                <div v-if="event.topic && event.speakers && event.speakers.length > 0" class="speaker-thumbnails">
                                    <ul>
                                        <li v-for="(speaker, index) in event.speakers" :key="index" class="speaker-thumbnail">
                                            <i v-if="!speaker.thumbnail" class="material-icons">account_circle</i>
                                            <img v-if="speaker.thumbnail" :src="speaker.thumbnail" :alt="speaker.name" :title="speaker.name" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="summary">
                                <div class="datetime">
                                    <i class="material-icons">event</i>
                                    <span class="date">Day {{ event.day }}</span>,
                                    <span class="time time-start">{{ event.startTime }}</span> -
                                    <span class="time time-end">{{ event.endTime }}</span>
                                </div>
                                <div v-if="event.venue && event.venue.name" class="venue">
                                    <i class="material-icons">explore</i>
                                    {{ event.venue.name }}
                                </div>
                                <div class="misc">
                                    <span v-if="event.language">
                                        <i class="material-icons">message</i>
                                        <span>{{ event.language }}</span>
                                    </span>
                                    <span v-if="event.topic && event.level">
                                        <i class="material-icons">network_check</i>
                                        <span>{{ event.level }}</span>
                                    </span>
                                </div>
                            </div>
                            <div
                                class="description"
                                v-if="event.description"
                                v-html="event.description"
                            ></div>
                            <div v-if="event.topic && event.speakers && event.speakers.length > 0" class="card person-card">
                                <div class="card-content">
                                    <div class="speakers">
                                        <div v-for="(speaker, index) in event.speakers" :key="index" class="speaker">
                                            <div class="thumbnail">
                                                <i v-if="!speaker.thumbnail" class="material-icons">account_circle</i>
                                                <img v-if="speaker.thumbnail" :src="speaker.thumbnail" :alt="speaker.name" :title="speaker.name" />
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
                <div class="share">
                    <button @click="openFacebook" class="btn-floating btn-large waves-effect waves-light facebook">
                        <i class="fa fa-facebook" aria-hidden="true"></i>
                    </button>
                    <button @click="openTwitter" class="btn-floating btn-large waves-effect waves-light twitter">
                        <i class="fa fa-twitter" aria-hidden="true"></i>
                    </button>
                    <button
                            class="btn-floating btn-large waves-effect waves-light primary"
                            ref="share"
                            :data-clipboard-text="`${this.shareLink}&utm_source=clipboard`"
                    >
                        <i class="material-icons">share</i>
                    </button>
                </div>
            </div>
            <div class="modal-footer">
                <a class="modal-action waves-effect waves-light btn" :href="link" target="_blank" rel="noopener">Permlink</a>
                <button class="modal-action waves-effect waves-light btn" @click="closeModal">Close</button>
            </div>
        </div>
        <div class="modal-overlay" @click="closeModal"></div>
    </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex';

  /* globals window, URL, URLSearchParams, FB, ClipboardJS, Materialize */
  const { mapState, mapActions } = createNamespacedHelpers('modal');

  const frameOptions = 'toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=200,width=800,height=400';

  export default {
    name: 'modal',
    computed: {
      link() {
        if (!this.event.internal) {
          return '';
        }

        const url = new URL(this.event.internal);
        return url.pathname.replace('/event/', '/2018/topic/');
      },
      shareLink() {
        return `${window.location.protocol}//${window.location.host}${this.link}?utm_medium=share&utm_campaign=website_share`;
      },
      ...mapState(['open', 'event']),
    },
    methods: {
      openFacebook() {
        FB.ui({
          app_id: '1826257884309248',
          method: 'share',
          mobile_iframe: true,
          href: `${this.shareLink}&utm_source=facebook`,
        });
      },
      openTwitter() {
        const params = new URLSearchParams();
        params.append('url', `${this.shareLink}&utm_source=twitter`);
        params.append('via', 'hkoscon');
        params.append('hashtags', 'hkoscon,hkoscon2018');
        const speaker = this.event.speakers.map(s => s.name).join(' and ');
        params.append('text', `${speaker} in going to deliver "${this.event.display}" in HKOSCon 2018`);
        window.open(`https://twitter.com/share?${params.toString()}`, '_blank', frameOptions);
      },
      ...mapActions(['closeModal']),
    },
    mounted() {
      // eslint-disable-next-line no-new
      const clipboard = new ClipboardJS(this.$refs.share);
      clipboard.on('success', (e) => {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
        Materialize.toast('Link is Copied', 3000, 'rounded');
        e.clearSelection();
      });
      window.addEventListener('keyup', (e) => {
        if (this.open && e.code === 'Escape') {
          this.closeModal();
        }
      });
    },
  };
</script>
