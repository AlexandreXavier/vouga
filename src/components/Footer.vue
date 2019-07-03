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

          <strong class="hidden-sm-and-down" >XANI
            <v-tooltip right>
                <template v-slot:activator="{ on }">
                    <v-btn href="https://xani.hashbase.io" icon small target="https://xani.hashbase.io" v-on="on">
                        <v-icon small>code</v-icon>
                    </v-btn>
                </template>
                <span>{developer site}</span>
            </v-tooltip><!-- &copy;{{ new Date().getFullYear() }} -->
          </strong>

          <!-- <v-spacer></v-spacer> -->
          <v-btn
            v-for="(icon,i) in icons"
            :key="i"
            :href="icon.link"
            icon
            class="hidden-xs-only">

            <v-icon size="28px">{{ icon.icon }}</v-icon>
          </v-btn>
<!--
xs: 0
sm: 576px
md: 768px
lg: (992 + 16)px
xl: (1200 + 16)px
-> use class="hidden-md-and-up" in a element
-> use class="hidden-sm-and-down" in another
-->
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
      {
        icon: "fab fa-youtube",
        link: "https://www.youtube.com/channel/UC6D7Ogkw37GpnSiixGTyuqA"
      },
      {
        icon: "fab fa-instagram",
        link: "https://www.instagram.com/portocarodos/"
      },
      {
        icon: "fab fa-twitter",
        link: "https://twitter.com/portocarodos/"
      }
    ]
  })
};
</script>


<style>
</style>
