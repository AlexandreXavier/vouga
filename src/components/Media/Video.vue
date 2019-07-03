<template>
<v-card flat tile>
    <v-container v-for="type in types" :key="type" fluid grid-list-md grey lighten-4>
        <v-layout row wrap>
            <v-spacer></v-spacer>
            <v-flex v-for="video in videos" :key="video.id" xs12 sm6 md4>
                <v-card>
                     <Media
                    :kind="'video'"
                    :isMuted="(false)"
                    :src="video.src"
                    :poster="video.thumbnail"
                    :autoplay="false"
                    :controls="true"
                    :loop="false"
                    @pause="handle()"
                    :ref="'fish'"
                    :style="{width: '370px'}"
                    >
                    <span class="headline white--text pl-3 pt-3">
                    </span>
                    </Media>
                    <v-card-actions class="white justify-center">
                                <v-btn class="white--text" fab icon small>
                                    <facebook :url="video.src" scale="2" title="Mais um Video"></facebook>
                                </v-btn>
                                <v-btn class="white--text" fab icon small>
                                    <twitter :url="video.src" title="Mais um Video" scale="2"></twitter>
                                </v-btn>
                                <v-btn class="white--text" fab icon small>
                                    <whats-app :url="video.src" title="Ola" scale="2"></whats-app>
                                </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</v-card>
</template>

<script>
import Media from "./Media";
import { setTimeout } from "timers";
import { Facebook, Twitter, WhatsApp } from "vue-socialmedia-share";

export default {
  data: () => ({
    currentIndex: 0,
    currentCaption: "",
    windowWidth: 0,
    isLoading: true,
    types: ["Palma"],
    video: [{ id: "", src: null, thumbnail: "", caption: "" }]
  }),
  components: {
    Media,
    Facebook,
    Twitter,
    WhatsApp
  },
  computed: {
    videos() {
      return this.$store.getters.featuredVideos;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    handle() {
      console.log("Video paused!, playing in 2 sec...");

      setTimeout(() => {
        this.$refs.fish.play();
      }, 2000);
    }
  }
};
</script>
