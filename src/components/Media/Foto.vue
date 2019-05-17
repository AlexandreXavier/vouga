<template>
  <v-container>
    <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-img
            :src="card.src"
            class="white--text"
            height="400px"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">{{ card.caption }}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-title>
            <div>
               <span>Dias de Regata: </span>
               <span class="grey--text">{{ card.caption }} </span><br>
             <!--  <span>{{ new Date | moment }}</span> -->
             <span>Hora Inicio: </span>
             <span class="grey--text">{{ card.caption }} </span><br>
             <span>Local: </span>
              <span class="grey--text">{{ card.caption }}</span><br>
              <span>Descrição: </span>
              <span class="grey--text">{{ card.caption }}</span>
              <span>Classes: </span>
              <span class="grey--text">{{ card.caption }}</span>
            </div>
          </v-card-title>
          <v-card-actions>
                <v-btn class="white--text" fab icon small>
                    <facebook :url="card.src" scale="3"></facebook>
                </v-btn>
                <v-btn class="white--text" fab icon small>
                    <twitter :url="card.src" title="Check me on Github" scale="3"></twitter>
                </v-btn>
                <v-btn class="white--text" fab icon small>
                    <whats-app :url="card.src" title="Hello" scale="3"></whats-app>
                </v-btn>

                <v-btn flat color="primary" @click="onSair">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
  </v-container>
</template>

<script>
import { Facebook, Twitter, WhatsApp } from "vue-socialmedia-share";

export default {
  props: ["id"],
  components: {
    Facebook,
    Twitter,
    WhatsApp
  },
  computed: {
    card() {
      alert("FOTO : " + this.id);
      return this.$store.getters.loadedImage(this.id);
    }
  },
  methods: {
    onSair() {
      this.$router.push("/fotos/");
    }
  }
};
</script>
