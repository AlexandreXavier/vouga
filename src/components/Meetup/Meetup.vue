<template>
  <v-container>
    <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img
            :src="meetup.imageUrl"
            class="white--text"
            height="400px"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">{{ meetup.title }}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-title>
            <div>
               <span>Dias de Regata: </span>
               <span class="grey--text">{{ meetup.dates }} </span><br>
             <!--  <span>{{ new Date | moment }}</span> -->
             <span>Hora Inicio: </span>
             <span class="grey--text">{{ meetup.time }} </span><br>
             <span>Local: </span>
              <span class="grey--text">{{ meetup.location }}</span><br>
              <span>Descrição: </span>
              <span class="grey--text">{{ meetup.description }}</span>
              <span>Classes: </span>
              <span class="grey--text">{{ meetup.classes }}</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="primary">Share</v-btn>
            <v-btn flat color="primary">Participar</v-btn>
            <v-btn flat color="primary" @click="onSair">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
  </v-container>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    }
  },
  filters: {
    Upper(value) {
      return value.toUpperCase();
    }
  },
  methods: {
    onSair() {
      this.$router.push("/");
    }
  }
};
</script>
