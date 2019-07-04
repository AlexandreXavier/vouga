<template>
  <v-container>
<!-- alert -->
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>

        <v-stepper v-model="e1">
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">Dados</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 2" step="2">Gerar Codigo</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3">Assinar</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <form @submit.prevent="onSignup">
                            <v-layout row>
                            <v-flex xs12 >
                                <v-text-field
                                name="name"
                                label="Nome"
                                id="name"
                                text-lowercase
                                v-model="name"
                                :rules="nameRules"
                                :counter="10"
                                required></v-text-field>
                            </v-flex>
                            </v-layout>

                            <v-layout row>
                            <v-flex xs12>
                                <v-text-field
                                name="email"
                                label="Email"
                                id="email"
                                v-model="email"
                                :rules="emailRules"
                                :counter="20"
                                type="email"
                                required></v-text-field>
                            </v-flex>
                            </v-layout>

                            <v-layout row>
                            <v-flex xs12 md6>
                                <v-text-field
                                name="password"
                                label="Password"
                                id="password"
                                v-model="password"
                                :rules="passRules"
                                :counter="8"
                                type="password"
                                required>
                                </v-text-field>
                            </v-flex>
                            </v-layout>
                    </form>
                    <v-layout row>
                        <v-btn v-if="this.formIsValid"
                            color="primary"
                            @click="e1 = 2"
                            @change="seen = !seen"
                        >
                            Continue
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click="onCancel">
                            Cancel
                        </v-btn>
                    </v-layout>
                </v-stepper-content>



                <v-stepper-content step="2">
                    <v-card ref="form">
                    <v-layout row>
                         <v-autocomplete
                            ref="country"
                            v-model="country"
                            :rules="[() => !!country || 'This field is required']"
                            :items="countries"
                            label="Pais"
                            placeholder="Seleciona..."
                            required
                            ></v-autocomplete>

                         <v-autocomplete
                            ref="nivel"
                            v-model="nivel"
                            :rules="[() => !!nivel || 'This field is required']"
                            :items="niveis_seguranca"
                            label="Nivel Segurança"
                            placeholder="Seleciona..."
                            required
                            ></v-autocomplete>
                        <v-btn
                            v-if="this.formIsValid && user == null"
                            color="primary"
                            type="submit"
                            :loading="loading"
                            v-on:click="onSignup">
                            Gerar Codigo
                            <span slot="loader" class="custom-loader">
                                <v-icon light>cached</v-icon>
                            </span>
                        </v-btn>

                        <span class="grey--text">{{user}}</span>
                    </v-layout>

                    <v-layout row>
                        <v-btn v-if="user!== null"
                            @change="$refs.calendarr.disabled()"
                            color="primary"
                            @click="e1 = 3">
                            Continue
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click="onCancel">
                            Cancel
                        </v-btn>
                    </v-layout>
                    </v-card>
                </v-stepper-content>




                <v-stepper-content step="3">
                    <v-layout row>
                        <v-btn
                            outline
                            color="primary"
                            @click="onUsers">
                            Assinar
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click="onCancel">
                            Cancel
                        </v-btn>
                    </v-layout>
                </v-stepper-content>

            </v-stepper-items>
        </v-stepper>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      e1: 0,
      seen: false,
      name: "",
      nameRules: [
        v => !!v || "O nome é necessário",
        v => v.length <= 10 || "O nome tem que ter menos que 10 caracteres",
        v => v.length > 2 || "O nome tem que ter mais que 3 caracteres"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail é necessário",
        v => /.+@.+/.test(v) || "O e-mail tem que ser valido"
      ],
      password: "",
      passRules: [
        v => v.length <= 10 || "A password tem que ter menos que 8 caracteres",
        v => v.length > 2 || "A password tem que ter mais que 3 caracteres"
      ],
      confirmPassword: "",
      countries: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antigua &amp; Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bosnia &amp; Herzegovina",
        "Botswana",
        "Brazil",
        "British Virgin Islands",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Cape Verde",
        "Cayman Islands",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Congo",
        "Cook Islands",
        "Costa Rica",
        "Cote D Ivoire",
        "Croatia",
        "Cruise Ship",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Estonia",
        "Ethiopia",
        "Falkland Islands",
        "Faroe Islands",
        "Fiji",
        "Finland",
        "France",
        "French Polynesia",
        "French West Indies",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kuwait",
        "Kyrgyz Republic",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macau",
        "Macedonia",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Namibia",
        "Nepal",
        "Netherlands",
        "Netherlands Antilles",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Norway",
        "Oman",
        "Pakistan",
        "Palestine",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Reunion",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Pierre &amp; Miquelon",
        "Samoa",
        "San Marino",
        "Satellite",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "South Africa",
        "South Korea",
        "Spain",
        "Sri Lanka",
        "St Kitts &amp; Nevis",
        "St Lucia",
        "St Vincent",
        "St. Lucia",
        "Sudan",
        "Suriname",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor L'Este",
        "Togo",
        "Tonga",
        "Trinidad &amp; Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks &amp; Caicos",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Venezuela",
        "Vietnam",
        "Virgin Islands (US)",
        "Yemen",
        "Zambia",
        "Zimbabwe"
      ],
      niveis_seguranca: [0, 1, 2, 3],
      errorMessages: "",
      level: null,
      country: null
    };
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Password não é igual!!!"
        : "OK";
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
    formIsValid() {
      return this.name !== "" && this.email !== "" && this.password !== "";
    },
    user() {
      return this.$store.state.user;
    },
    form() {
      return {
        level: this.level,
        country: this.country
      };
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined && this.see == true) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    onSignup() {
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password
      });
      this.formIsValid.false;
    },
    onUsers() {
      if (!this.formIsValid) {
        return;
      }
      this.$store.dispatch("createUsers", {
        name: this.name,
        email: this.email,
        password: this.password,
        country: this.country,
        nivel: this.nivel,
        Id: ""
      });
      this.see = true;
      this.$router.push("/");
    },
    onCancel() {
      this.$router.push("/");
    },
    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;

      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset();
      });
    }
  }
};
</script>
