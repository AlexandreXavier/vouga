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
                    <v-layout row>
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
      confirmPassword: ""
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
        Id: ""
      });
      this.see = true;
      this.$router.push("/");
    },
    onCancel() {
      this.$router.push("/");
    }
  }
};
</script>
