<template>
  <v-container>
    <v-flex xs12 sm12 offset-sm3>
        <v-card>
          <v-img
            :src="meetup.imageurl"
            class="white--text"
            height="500px"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs8 align-end flexbox>
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
                <span class="grey--text">{{ meetup.horainicio }} </span><br>
                <span>Local: </span>
                <span class="grey--text">{{ meetup.location }}</span><br>
                <span>Descrição: </span>
                <span class="grey--text">{{ meetup.description }}</span><br>
                <span>Class: </span><br>
                <!-- <v-layout row wrap> -->
                    <!-- <v-flex size="20px"
                        v-for="n in 1"
                        :key="n"
                        xs2> -->

                        <v-combobox v-model="meetup.classes"
                            small-chips
                            multiple
                            readonly
                        ></v-combobox>

                        <!-- <v-card flat tile>
                        <span class="grey--text">{{ meetup.classes[0].text }}</span>
                        <v-img                      :src="`https://xanivouga.s3-eu-west-1.amazonaws.com/class/cinza/ORC_${n}.png`"
                            height="30px" width="30px"
                        ></v-img>
                        </v-card> -->
                    <!-- </v-flex> -->
               <!--  </v-layout> -->
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="primary"
                :to="'/resultados/' + meetup.id"
                v-if="resultados">
                Resultados
            </v-btn>

            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
              <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-actions>
<!-- menu detalhe -->
          <v-slide-y-transition>
            <v-card-text v-show="show">
                <div>
                    <span>Autor da Regata: </span>
                    <v-spacer></v-spacer>
                    <v-chip color="white">
                            <v-avatar>
                                <img :src="meetup.creatoravatar">
                            </v-avatar>
                            <span class="grey--text">{{meetup.creatorname}}</span>
                    </v-chip>
                    <v-spacer></v-spacer>
                    <span>Email: </span>
                    <span class="grey--text">{{ meetup.time }} </span><br>
                    <span>Tel: </span>
                    <span class="grey--text">{{ meetup.time }} </span><br>
                </div>
            </v-card-text>
          </v-slide-y-transition>
<!-- caixa dialogo share -->
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-toolbar card color="primary" dark >
                    <v-toolbar-title>Redes Sociais</v-toolbar-title>
                </v-toolbar>

            <v-card-actions class="white justify-center">
                <v-btn class="white--text" fab icon small>
                    <facebook :url="meetup.imageurl" scale="3"></facebook>
                </v-btn>
                <v-btn class="white--text" fab icon small>
                    <twitter :url="meetup.imageurl" title="Check me on Github" scale="3"></twitter>
                </v-btn>
                <v-btn class="white--text" fab icon small>
                    <whats-app :url="meetup.imageurl" title="Hello" scale="3"></whats-app>
                </v-btn>
            </v-card-actions>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="primary"
                flat
                @click="dialog = false"
                >
                cancel
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>

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
  data: () => ({
    show: false,
    dialog: false
  }),
  computed: {
    meetup() {
      return;
      this.$store.getters.loadedMeetup(this.id);
    },
    resultados() {
      return (
        this.$store.getters.loadedResultado(this.id) !== null &&
        this.$store.getters.loadedResultado(this.id) !== undefined
      );
    }
  }
};
</script>
