<template>
<v-app id="inspire">
  <v-card flat tile>

    <v-container
      v-for="type in types"
      :key="type"
      fluid
      grid-list-md
      grey
      lighten-4
    >
      <v-subheader>{{ type }}</v-subheader>

      <v-layout row wrap>
        <v-spacer></v-spacer>
        <v-flex
          v-for="card in cards"
          :key="card"
          xs12
          sm6
          md4
        >
          <v-card>
            <v-img
              :src="`https://s3-eu-west-1.amazonaws.com/xanivouga/princepe_2018.jpg`"
              height="300px"
            >
              <span
                class="headline white--text pl-3 pt-3"
                v-text="card.title"
              ></span>
            </v-img>

            <v-card-actions class="white justify-center">
              <v-btn
                v-for="(social, i) in socials"
                :key="i"
                :color="social.color"
                class="white--text"
                fab
                icon
                small
              >
                <v-icon>{{ social.icon }}</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
   </v-app>
</template>

<script>
export default {
  data: () => ({
    types: ["Baiona", "Palma"],
    cards: ["Vouga", "Snipe", "ORC1"],
    socials: [
      {
        icon: "fab fa-facebook",
        color: "primary"
      },
      {
        icon: "fab fa-linkedin",
        color: "primary"
      },
      {
        icon: "fab fa-instagram",
        color: "primary"
      }
    ]
  }),
  methods: {
    getImage() {
      const min = 550;
      const max = 560;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
};
</script>
