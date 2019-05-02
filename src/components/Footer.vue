<template>
<div id="app">
  <v-app id="inspire">
    <v-footer fixed dark height="20px"
    >
    <v-card dense
        class="flex"
        flat
        tile
        light
      >
      <v-card-title dense >

          <strong class="subheading" >XANI
            <v-tooltip right>
                <template v-slot:activator="{ on }">
                    <v-btn href="https://xani.hashbase.io" icon small target="https://xani.hashbase.io" v-on="on">
                        <v-icon small>code</v-icon>
                    </v-btn>
                </template>
                <span>{developer site}</span>
            </v-tooltip>&copy;{{ new Date().getFullYear() }}
          </strong>

          <!-- <v-spacer></v-spacer> -->
          <v-btn
            v-for="(icon,i) in icons"
            :key="i"
            :href="icon.link"
            class="mx-5"
            icon
          >
            <v-icon size="28px">{{ icon.icon }}</v-icon>
          </v-btn>
        </v-card-title>
    </v-card>
    </v-footer>
  </v-app>
</div>
</template>

<script>
export default {
  data: () => ({
    icons: [
      {
        icon: "fab fa-facebook",
        link: "https://www.facebook.com/portocaro.dos"
      },
      /*       { icon: "fab fa-twitter", link: "https://twitter.com/portocarodos/" },
 */
      {
        icon: "fab fa-instagram",
        link: "https://www.instagram.com/portocarodos/"
      }
    ]
  })
  /* computed: {
    socialItems() {
      let socialItems = [
        {
          icon: "fab fa-facebook",
          title: "fab fa-facebook",
          link: (href = "https://www.facebook.com")
        },
        { icon: "fab fa-twitter", title: "fab fa-twitter", link: "/signin" },
        { icon: "fab fa-google-plus", title: "Google+", link: "/signin" },
        { icon: "fab fa-instagram", title: "instagram", link: "/signin" }
      ];
      if (this.userIsAuthenticated) {
        socialItems = [
          {
            icon: "fab fa-linkedin",
            title: "LinkIn",
            link: "/meetups"
          }
        ];
      }
      return socialItems;
    }
  }*/
};
</script>


<style>
</style>
