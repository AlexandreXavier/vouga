<template>
  <v-app>
<!-- tab -->
    <v-toolbar dark dense class="primary">
        <v-toolbar-side-icon
            @click.stop="sideNav = !sideNav"
            class="hidden-md-and-up ">
        </v-toolbar-side-icon>

<!-- user avatar -->
        <v-toolbar-title>
            <v-btn fab dark color="white" v-if="userIsAuthenticated">
                <v-avatar size="52" >
                    <v-img :src="profilePicUrl">
                    </v-img>
                </v-avatar>
            </v-btn>

            <router-link to="/" tag="span" style="cursor: pointer">
                    PortocaroDos &copy;
            </router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-xs-only">
            <v-btn
            flat
            v-for="item in menuItems"
            :key="item.title"
            :to="item.link">

            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
            </v-btn>

            <v-btn
            v-if="userIsAuthenticated"
            flat
            @click="onLogout">
            <v-icon left dark>exit_to_app</v-icon>
            Sair
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>

<!-- sandwich-->
    <v-navigation-drawer temporary absolute v-model="sideNav">
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="userIsAuthenticated"
          @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Sair</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

<!-- main -->
    <main>
      <router-view></router-view>
    </main>

<!-- footer-->
 <portocaro-footer class="custon-footer"></portocaro-footer>

<!-- fim -->

  </v-app>
</template>

<script>
//import img from "./assets/profile.png";
export default {
  data() {
    return {
      sideNav: false
      //    image: img
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "help", title: "Ajuda", link: "/ajuda" },
        { icon: "image", title: "Fotos", link: "/fotos" },
        { icon: "", title: "", link: "" },
        { icon: "face", title: "Registar", link: "/signup" },
        { icon: "lock_open", title: "Entrar", link: "/signin" }
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: "supervisor_account",
            title: "Ver Regatas",
            link: "/meetups"
          },
          { icon: "room", title: "Org. Evento", link: "/meetup/new" },
          { icon: "calendar_today", title: "Calendario", link: "/calendar" },
          { icon: "fa-dumbbell", title: "Treino", link: "/treino" },
          { icon: "person", title: "Utilizador", link: "/profile" },
          { icon: "image", title: "Fotos", link: "/fotos" },
          { icon: "help", title: "Ajuda", link: "/ajuda" }
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    user() {
      return this.$store.state.user;
    },
    userName() {
      return this.$store.getters.currentUserName;
    },
    profilePicUrl() {
      return this.$store.getters.profilePicUrl;
    }
    /* profilePicUrl() {
      return (
        this.$store.getters.currentUser.photoURL !== null &&
        this.$store.getters.currentUser.photoURL !== undefined
      );
    } */
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import url("https://code.getmdl.io/1.2.1/material.blue-red.min.css");
</style>

