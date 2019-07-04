<template>
<v-app>
<!-- tab sandwich -->
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

            <router-link to="/" tag="span" style="cursor: pointer"
            class="font-weight-regular title hidden-sm-and-down">
                    PORTOCARODOS &copy;
            </router-link>
        </v-toolbar-title>


<!-- Manager -->
            <v-menu open-on-hover top offset-y
                    v-if="userIsAuthenticated"
                    class="hidden-xs-only">
                <template v-slot:activator="{ on }">
                    <v-btn dense
                        color="primary"
                        dark
                        v-on="on"
                    >
                    <v-icon left dark>folder_shared</v-icon>
                        Manager
                    </v-btn>
                </template>

                <v-list>
                <v-list-tile v-for="(item, index) in menuItemsManager"                        :key="index"
                            :to="item.link">
                    <v-list-tile-action>
                        <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
                </v-list>
            </v-menu>

        <v-spacer></v-spacer>

        <v-toolbar-items class="hidden-xs-only" >

<!-- media -->
            <v-menu open-on-hover top offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn dense
                        color="primary"
                        dark
                        v-on="on"
                    >
                    <v-icon left dark>image</v-icon>
                        Media
                    </v-btn>
                </template>

                <v-list>
                <v-list-tile v-for="(item, index) in itemsMedia"                                       :key="index"
                            :to="item.link">
                    <v-list-tile-action>
                        <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
                </v-list>
            </v-menu>

<!-- main -->
            <v-btn
            flat
            v-for="item in menuItems"
            :key="item.title"
            :to="item.link">

            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
            </v-btn>

<!-- sair -->
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
<!-- media -->
        <v-list-tile
          v-for="item in itemsMedia"
          :key="item.title"
          :to="item.link">

            <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
                {{ item.title }}
            </v-list-tile-content>
        </v-list-tile>
<!-- main -->
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>

<!-- manager -->
        <v-list-tile v-for="item in menuItemsManager"
        :key="item.title"
        :to="item.link">
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>


<!-- sair -->
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
export default {
  data() {
    return {
      sideNav: false,
      itemsMedia: [
        {
          icon: "videocam",
          title: "Video",
          link: "/video"
        },
        {
          icon: "image",
          title: "Fotos",
          link: "/fotos"
        }
      ]
    };
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "help", title: "Ajuda", link: "/ajuda" },
        { icon: "", title: "", link: "" },
        { icon: "face", title: "Registar", link: "/signup" },
        { icon: "lock_open", title: "Entrar", link: "/signin" }
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: "supervisor_account",
            title: "Regatas",
            link: "/meetups"
          },
          { icon: "calendar_today", title: "Calendario", link: "/calendar" },
          { icon: "waves", title: "Vento", link: "/tempo" },
          { icon: "help", title: "Ajuda", link: "/ajuda" }
        ];
      }
      return menuItems;
    },
    menuItemsManager() {
      let menuItemsManager = [];

      if (this.userIsAuthenticated) {
        menuItemsManager = [
          { icon: "room", title: "Org. Evento", link: "/meetup/new" },
          { icon: "person", title: "Utilizador", link: "/profile" },
          { icon: "directions_boat", title: "Barcos", link: "/barcos" }
        ];
      }
      return menuItemsManager;
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
    profilePicUrl() {
      return this.$store.getters.profilePicUrl;
    }
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

