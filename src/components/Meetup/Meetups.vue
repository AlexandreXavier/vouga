<template>
  <v-container>
    <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" class="mb-2">
        <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card>
                    <v-card-text class="py-2">
                        <v-layout align-center>
                        <v-chip color="white">
                            <v-avatar>
                                <img :src="meetup.creatorAvatar">
                            </v-avatar>
                            {{meetup.creatorName}}
                        </v-chip>
                        <v-spacer></v-spacer>
                        <v-flex xs4>
                            <p class="text-xs-right"><b>Criado a <span class="grey--text">
                                {{tempoDataCriacao}}</span> Dias</b></p>
                        </v-flex>
                        </v-layout>
                    </v-card-text>

                    <v-card-media :src="meetup.imageUrl"
                        :height="calculateHeight"
                        v-resize="calculateHeight">
                    </v-card-media>

                        <v-flex xs7 sm8 md9>
                            <v-card-title primary-title>
                            <div>
                                <h4>{{ meetup.title }}</h4>
                                <span class="grey--text">{{meetup.description}}</span><br>
                                <span>{{meetup.location}}</span><br>
                            </div>
                            </v-card-title>

                            <v-card-actions>
                            <v-btn flat :to="'/meetups/' + meetup.id">
                                <v-icon left light>arrow_forward</v-icon>
                                Detalhe
                            </v-btn>
                            </v-card-actions>
                        </v-flex>

                    </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const timetable = require("timetable-fns");
import * as firebase from "firebase";

export default {
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetups;
    },
    /* imgHeight: function() {
      var offset = 320;
      console.log("new image height is " + (this.pageHeight - offset));
      return this.pageHeight - offset;
    }, */
    user() {
      return this.$store.getters.user;
    },
    profilePicUrl() {
      return firebase.auth().currentUser.photoURL || "/avatar-1.png";
    },
    username() {
      return this.$store.getters.currentUser;
    },
    tempoDataCriacao() {
      const delta = "2019-05-24";
      const datahoje = new Date().toISOString().slice(0, 10);
      return timetable.diff(delta, datahoje);
    }
  },
  methods: {
    calculateHeight: function() {
      var body = document.body;
      var html = document.documentElement;

      this.pageHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      // alert("resized to " + this.pageHeight);
    },
    clickFlip: function() {
      this.flipperClass = !this.flipperClass;
    }
  },
  mounted: function() {
    this.calculateHeight();
  }
};
</script>
