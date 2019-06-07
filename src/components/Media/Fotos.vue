<template>
  <v-card flat tile>

    <v-container
      v-for="type in types"
      :key="type"
      fluid
      grid-list-md
      grey
      lighten-4
    >
      <v-subheader>{{ type }}</v-subheader>

      <v-layout row wrap>
        <v-spacer></v-spacer>
        <v-flex
          v-for="card in cards"
          :key="card.id"
          xs12
          sm6
          md4
        >
          <v-card>
            <v-img
              :src="card.src"
              height="300px"
            >
                <span
                class="headline white--text pl-3 pt-3"
                >
                </span>
            </v-img>

            <v-card-actions class="white justify-center">
                <v-btn class="white--text" fab icon small>
                    <facebook :url="card.src" scale="2"></facebook>
                </v-btn>
                <v-btn class="white--text" fab icon small>
                    <twitter :url="card.src" title="Check me on Github" scale="2"></twitter>
                </v-btn>
                <v-btn class="white--text" fab icon small>
                    <whats-app :url="card.src" title="Hello" scale="2"></whats-app>
                </v-btn>
            </v-card-actions>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import { Facebook, Twitter, WhatsApp } from "vue-socialmedia-share";

export default {
  data: () => ({
    currentImage: null,
    currentIndex: 0,
    currentCaption: "",
    windowWidth: 0,
    isLoading: true,
    types: ["Palma"],
    card: [{ id: "", src: "", thumbnail: "", caption: "" }]
  }),
  components: {
    Facebook,
    Twitter,
    WhatsApp
  },
  computed: {
    cards() {
      return this.$store.getters.featuredImages;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>







