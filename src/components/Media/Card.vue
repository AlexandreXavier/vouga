<template>
  <v-container>
    <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img
            :src="meetup.imageUrl"
            class="white--text"
            height="600px"
          >
          </v-img>
        </v-card>
      </v-flex>
  </v-container>
</template>

<script>
//import { Facebook, Twitter, WhatsApp } from "vue-socialmedia-share";

export default {
  props: ["id"],
  data: () => ({
    show: false,
    dialog: false
  }),
  computed: {
    foto() {
      return this.$store.getters.loadedMeetup(this.id);
    }
  }
};
</script>
