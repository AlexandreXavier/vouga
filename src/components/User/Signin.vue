<template>
  <v-container fluid fill-height>
        <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>

        <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>

        <v-card color="white" >

            <v-layout row v-if="error">
                <v-flex xs12 sm6 offset-sm3>
                    <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
                </v-flex>
            </v-layout>

            <!-- form -->
            <form @submit.prevent="onSignin">
                 <v-flex xs12 sm8 offset-sm2>
                    <v-flex xs12>
                        <v-text-field
                        prepend-icon="person"
                        name="email"
                        label="Mail"
                        id="email"
                        v-model="email"
                        type="email"
                        :rules="emailRules"
                        :counter="20"
                        required></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field
                        prepend-icon="lock"
                        name="password"
                        label="Password"
                        id="password"
                        v-model="password"
                        type="password"
                        :rules="passRules"
                        :counter="20"
                        required></v-text-field>
                    </v-flex>

                    <div align-center justify-center>
                        <!-- button facebook -->
                        <v-btn color="light-blue darken-4"
                            center
                            dark
                            :disabled="loading"
                            :loading="loading"
                            @click.prevent="onSigninFacebook">
                            <svg width="24px" height="24px" viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio>
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="Artboard-1" transform="translate(-332.000000, -456.000000)">
                                        <g id="facebook_buttn" transform="translate(332.000000, 456.000000)">
                                            <path d="M0,0 L120,0 L120,120 L0,120 L0,0 Z" id="Shape"></path>
                                            <path d="M113.377146,0 L6.62285402,0 C2.96477253,0 0,2.96432291 0,6.62285402 L0,113.377146 C0,117.034778 2.96477253,120 6.62285402,120 L64.0955585,120 L64.0955585,73.5298658 L48.45744,73.5298658 L48.45744,55.419305 L64.0955585,55.419305 L64.0955585,42.0634409 C64.0955585,26.5638044 73.5622382,18.1240492 87.388851,18.1240492 C94.011705,18.1240492 99.7043021,18.6172788 101.362938,18.837591 L101.362938,35.0354823 L91.7735131,35.0399784 C84.2536737,35.0399784 82.7978149,38.6130823 82.7978149,43.8565123 L82.7978149,55.419305 L100.731676,55.419305 L98.3963671,73.5298658 L82.7978149,73.5298658 L82.7978149,120 L113.377146,120 C117.034778,120 120,117.034778 120,113.377146 L120,6.62285402 C120,2.96432291 117.034778,0 113.377146,0" id="Imported-Layers-Copy" fill="#FFFFFF"></path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <span slot="loader" class="custom-loader">
                            <v-icon light>cached</v-icon>
                            </span>
                        </v-btn>

                        <!-- button twitter -->
                        <v-btn  color="info"
                            dark
                            :disabled="loading"
                            :loading="loading"
                            @click.prevent="onSigninTwitter">
                            <svg width="24px" height="24px" viewBox="0 0 120 98" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="Artboard-1" transform="translate(-332.000000, -286.000000)">
                                        <g id="twitter_buttn" transform="translate(332.000000, 273.000000)">
                                            <path d="M0,0 L120,0 L120,120 L0,120 L0,0 Z" id="Shape"></path>
                                            <path d="M120,24.8777205 C115.584769,26.8358023 110.839899,28.1591865 105.859761,28.7543802 C110.943048,25.7073046 114.846483,20.8825487 116.684736,15.1338381 C111.928015,17.954863 106.659058,20.0038041 101.051245,21.1081605 C96.560079,16.3233476 90.161747,13.3333333 83.0808735,13.3333333 C69.4840338,13.3333333 58.4606606,24.3562676 58.4606606,37.9522294 C58.4606606,39.8817806 58.6788105,41.7608545 59.0984308,43.562676 C38.6371118,42.5360108 20.4964337,32.7346282 8.35378031,17.8398625 C6.2346099,21.4759867 5.02052014,25.7051099 5.02052014,30.2169063 C5.02052014,38.7581111 9.36727752,46.2937196 15.9732251,50.7085117 C11.9372325,50.580782 8.14133655,49.4733531 4.82168331,47.6293939 C4.81992758,47.7321043 4.81992758,47.8352537 4.81992758,47.9388419 C4.81992758,59.8672958 13.3062658,69.8179158 24.5688577,72.0793006 C22.5027982,72.6420132 20.3278832,72.9426826 18.0823,72.9426826 C16.4959947,72.9426826 14.9535828,72.788617 13.4506749,72.5011156 C16.5833425,82.2823073 25.6754088,89.4000512 36.4485899,89.598888 C28.0228245,96.201763 17.4072205,100.137679 5.87292878,100.137679 C3.88587732,100.137679 1.92603972,100.021361 0,99.7939939 C10.8952047,106.77918 23.8362778,110.854676 37.739493,110.854676 C83.0233732,110.854676 107.786239,73.3403563 107.786239,40.8070522 C107.786239,39.7395662 107.762537,38.6777863 107.715132,37.6221515 C112.524964,34.1510662 116.699221,29.8148433 120,24.8777205" id="Fill-1" fill="#FFFFFF"></path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <span slot="loader" class="custom-loader">
                            <v-icon light>cached</v-icon>
                            </span>
                        </v-btn>

                        <!-- button google -->
                        <v-btn  color="white"
                            dark
                            :disabled="loading"
                            :loading="loading"
                            @click.prevent="onSigninGoogle">
                            <svg width="24px" height="24px" viewBox="0 0 118 120" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="Artboard-1" transform="translate(-332.000000, -639.000000)">
                                            <g id="google_buttn" transform="translate(332.000000, 639.000000)">
                                                <g id="logo_googleg_48dp">
                                                    <path d="M117.6,61.3636364 C117.6,57.1090909 117.218182,53.0181818 116.509091,49.0909091 L60,49.0909091 L60,72.3 L92.2909091,72.3 C90.9,79.8 86.6727273,86.1545455 80.3181818,90.4090909 L80.3181818,105.463636 L99.7090909,105.463636 C111.054545,95.0181818 117.6,79.6363636 117.6,61.3636364 L117.6,61.3636364 Z" id="Shape" fill="#4285F4"></path>
                                                    <path d="M60,120 C76.2,120 89.7818182,114.627273 99.7090909,105.463636 L80.3181818,90.4090909 C74.9454545,94.0090909 68.0727273,96.1363636 60,96.1363636 C44.3727273,96.1363636 31.1454545,85.5818182 26.4272727,71.4 L6.38181818,71.4 L6.38181818,86.9454545 C16.2545455,106.554545 36.5454545,120 60,120 L60,120 Z" id="Shape" fill="#34A853"></path>
                                                    <path d="M26.4272727,71.4 C25.2272727,67.8 24.5454545,63.9545455 24.5454545,60 C24.5454545,56.0454545 25.2272727,52.2 26.4272727,48.6 L26.4272727,33.0545455 L6.38181818,33.0545455 C2.31818182,41.1545455 0,50.3181818 0,60 C0,69.6818182 2.31818182,78.8454545 6.38181818,86.9454545 L26.4272727,71.4 L26.4272727,71.4 Z" id="Shape" fill="#FBBC05"></path>
                                                    <path d="M60,23.8636364 C68.8090909,23.8636364 76.7181818,26.8909091 82.9363636,32.8363636 L100.145455,15.6272727 C89.7545455,5.94545455 76.1727273,0 60,0 C36.5454545,0 16.2545455,13.4454545 6.38181818,33.0545455 L26.4272727,48.6 C31.1454545,34.4181818 44.3727273,23.8636364 60,23.8636364 L60,23.8636364 Z" id="Shape" fill="#EA4335"></path>
                                                    <path d="M0,0 L120,0 L120,120 L0,120 L0,0 Z" id="Shape"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            <span slot="loader" class="custom-loader">
                            <v-icon light>cached</v-icon>
                            </span>
                        </v-btn>

                        <!-- button instagram -->
                         <!-- <v-btn  color="white"
                            dark
                            :disabled="loading"
                            :loading="loading"
                            @click.prevent="onSigninInstagram">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 3 48 48" style="enable-background:new 0 3 48 48;" xml:space="preserve" width="40px" height="40px">
                            <g id="surface1">
                                <path style="fill:#304FFE;" d="M32,42H16c-5.5,0-10-4.5-10-10V16c0-5.5,4.5-10,10-10h16c5.5,0,10,4.5,10,10v16   C42,37.5,37.5,42,32,42z"/>
                                <path style="fill:#304FFE;fill-opacity:0.2902;" d="M6,16v16c0,5.5,4.5,10,10,10h16c5.5,0,10-4.5,10-10V16c0-1-0.1-1.9-0.4-2.8   C36,8.7,28.8,6,21,6c-3.7,0-7.3,0.6-10.7,1.8C7.7,9.6,6,12.6,6,16z"/>
                                <path style="fill:#6200EA;" d="M21,8c-5,0-9.6,1.2-13.8,3.2C6.4,12.7,6,14.3,6,16v16c0,5.5,4.5,10,10,10h16c5.5,0,10-4.5,10-10   V16.2C36.5,11.1,29.1,8,21,8z"/>
                                <path style="fill:#673AB7;" d="M42,19c-5.3-5.5-12.7-9-21-9c-5.4,0-10.5,1.5-14.8,4.1C6.1,14.7,6,15.3,6,16v16c0,5.5,4.5,10,10,10   h16c5.5,0,10-4.5,10-10V19z"/>
                                <path style="fill:#8E24AA;" d="M42,22c-4.9-6.1-12.5-10-21-10c-5.6,0-10.7,1.7-15,4.6V32c0,5.5,4.5,10,10,10h16c5.5,0,10-4.5,10-10   V22z"/>
                                <path style="fill:#C2185B;" d="M42,32v-6.6C37.5,18.6,29.8,14,21,14c-5.6,0-10.8,1.9-15,5v13c0,5.5,4.5,10,10,10h16   C37.5,42,42,37.5,42,32z"/>
                                <path style="fill:#D81B60;" d="M42,32v-2.4C38.4,21.6,30.4,16,21,16c-5.7,0-11,2.1-15,5.6V32c0,5.5,4.5,10,10,10h16   C37.5,42,42,37.5,42,32z"/>
                                <path style="fill:#F50057;" d="M41.6,34.8C39.7,25.2,31.2,18,21,18c-5.9,0-11.2,2.4-15,6.3V32c0,5.5,4.5,10,10,10h16   C36.5,42,40.4,39,41.6,34.8z"/>
                                <path style="fill:#FF1744;" d="M39.9,38C39.4,28,31.2,20,21,20c-6.1,0-11.5,2.9-15,7.4V32c0,5.5,4.5,10,10,10h16   C35.2,42,38.1,40.4,39.9,38z"/>
                                <path style="fill:#FF5722;" d="M21,22c-6.5,0-12.1,3.6-15,9v1c0,5.5,4.5,10,10,10h16c2.2,0,4.3-0.7,5.9-2c0-0.3,0.1-0.7,0.1-1   C38,29.6,30.4,22,21,22z"/>
                                <path style="fill:#FF6F00;" d="M21,24c-7,0-12.8,4.7-14.5,11.2c1.3,4,5.1,6.8,9.5,6.8h16c1.4,0,2.6-0.3,3.8-0.8   c0.1-0.7,0.2-1.5,0.2-2.2C36,30.7,29.3,24,21,24z"/>
                                <path style="fill:#FF9800;" d="M21,26c-6.9,0-12.5,5.3-12.9,12c1.8,2.4,4.7,4,7.9,4h16c0.6,0,1.1-0.1,1.7-0.2   C33.9,40.9,34,40,34,39C34,31.8,28.2,26,21,26z"/>
                                <path style="fill:#FFC107;" d="M31.6,42c0.3-1,0.4-2,0.4-3c0-6.1-4.9-11-11-11s-11,4.9-11,11c0,0.3,0,0.7,0.1,1   c1.7,1.2,3.7,2,5.9,2H31.6z"/>
                                <path style="fill:#FFD54F;" d="M21,30c-5,0-9,4-9,9c0,0.8,0.1,1.6,0.3,2.3c1.1,0.5,2.4,0.7,3.7,0.7h13.5c0.3-0.9,0.5-1.9,0.5-3   C30,34,26,30,21,30z"/>
                                <path style="fill:#FFE082;" d="M21,32.1c-3.9,0-7,3.1-7,7c0,1,0.2,1.9,0.6,2.8C15.1,42,15.5,42,16,42h11.4c0.4-0.9,0.6-1.9,0.6-2.9   C28,35.2,24.9,32.1,21,32.1z"/>
                                <path style="fill:#FFECB3;" d="M21,34.1c-2.8,0-5,2.2-5,5c0,1.1,0.4,2.1,1,2.9H25c0.6-0.8,1-1.8,1-2.9C26,36.3,23.8,34.1,21,34.1z"/>
                                <path style="fill:#FFFFFF;" d="M30,38H18c-4.4,0-8-3.6-8-8V18c0-4.4,3.6-8,8-8h12c4.4,0,8,3.6,8,8v12C38,34.4,34.4,38,30,38z    M18,12c-3.3,0-6,2.7-6,6v12c0,3.3,2.7,6,6,6h12c3.3,0,6-2.7,6-6V18c0-3.3-2.7-6-6-6H18z"/>
                                <path style="fill:#FFFFFF;" d="M24,31c-3.9,0-7-3.1-7-7c0-3.9,3.1-7,7-7c3.9,0,7,3.1,7,7C31,27.9,27.9,31,24,31z M24,19   c-2.8,0-5,2.2-5,5s2.2,5,5,5s5-2.2,5-5S26.8,19,24,19z"/>
                                <path style="fill:#FFFFFF;" d="M32,16c0,0.6-0.4,1-1,1s-1-0.4-1-1s0.4-1,1-1S32,15.4,32,16z"/>
                            </g>
                            </svg>
                         </v-btn> -->
                    </div>

                 </v-flex>

        <v-layout row>
                <v-btn color="primary"
                    type="submit"
                    :disabled="loading"
                    :loading="loading">
                    Entrar
                    <v-icon right>
                        lock_open
                    </v-icon>
                            <span slot="loader" class="custom-loader">
                                    <v-icon light>cached</v-icon>
                            </span>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    @click="onSair">
                    Cancel
                    <v-icon right>
                        exit_to_app
                    </v-icon>
                </v-btn>
        </v-layout>

            </form>
            <!-- fim form -->
        </v-card>


    </v-flex>
    </v-layout>
    </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      emailRules: [
        v => !!v || "E-mail é necessário",
        v => /.+@.+/.test(v) || "O e-mail tem que ser valido"
      ],
      password: "",
      passRules: [
        v => v.length <= 10 || "A password tem que ter menos que 8 caracteres",
        v => v.length > 2 || "A password tem que ter mais que 3 caracteres"
      ]
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    onSignin() {
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password
      });
    },
    onSigninFacebook() {
      this.$store.dispatch("signUserInFacebook");
    },
    onSigninTwitter() {
      this.$store.dispatch("signUserInTwitter");
    },
    onSigninGoogle() {
      this.$store.dispatch("signUserInGoogle");
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    },
    onSair() {
      this.$router.push("/");
    }
  }
};
</script>
