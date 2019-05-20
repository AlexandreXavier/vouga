<template>
  <v-container>
      <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
      <v-card>
                  <v-card-text class="py-2">
                    <v-layout align-center>
                      <v-flex xs3>
                        <v-avatar class="grey lighten-4 elevation-0" d-flex>
                          <img src="/avatar-1.png">
                        </v-avatar>
                      </v-flex>
                      <v-flex xs5>
                        <p class="text-xs-left"><b> User: <span class="grey--text">{{meetup.creatorId | criador}} </span></b></p>
                      </v-flex>
                      <v-flex xs4>
                        <p class="text-xs-right"><b>Criado  <span class="grey--text">{{tempoDataCriacao}}</span> Dias a Traz</b></p>
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

export default {
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetups;
    },
    imgHeight: function() {
      var offset = 320;
      console.log("new image height is " + (this.pageHeight - offset));
      return this.pageHeight - offset;
    },
    user() {
      return this.$store.getters.user;
    },
    tempoDataCriacao() {
      const datehoje = new Date(this.date);
      return timetable.diff("2018-12-25", "2019-01-05");
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
      console.log("resized to " + this.pageHeight);
    },
    clickFlip: function() {
      this.flipperClass = !this.flipperClass;
    }
  },
  mounted: function() {
    this.calculateHeight();
  },
  filters: {
    criador(value) {
      return value.toUpperCase();
    }
  }
};
</script>
