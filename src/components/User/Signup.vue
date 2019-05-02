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
        <v-card>
          <v-card-text>
            <v-container>
<!-- form -->
              <form @submit.prevent="onSignup">
                <v-layout row>
                  <v-flex xs12 >
                    <v-text-field
                      name="name"
                      label="Nome"
                      id="name"
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
                     <v-flex xs12 md4>
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
                <v-layout row>
                  <v-flex xs12 md4>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]">
                      </v-text-field>
                  </v-flex>
                </v-layout>
<!-- submit -->
                <v-layout align-end>
                    <v-flex xs12 md4>
                        <v-btn outline color="primary" type="submit" :disabled="loading" :loading="loading">
                            Assinar
                            <span slot="loader" class="custom-loader">
                                <v-icon light>cached</v-icon>
                            </span>
                        </v-btn>
                    </v-flex>

                    <v-checkbox  :disabled="!formIsValid" v-model="checkbox" @change="onUsers">
                    <template :disabled="!formIsValid" v-slot:label>
                    <div>
                        Eu aceito entrar para
                        <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                            <a
                            target="_blank"
                            href="http://portocarodos.eu"
                            @click.stop
                            v-on="on"
                            >
                            PortocaroDos
                            </a>

                        </template>
                        Ler os requesitos
                        </v-tooltip>
                    </div>
                    </template>
                    </v-checkbox>
                </v-layout>
<!-- end  -->
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      checkbox: false,
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
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
    formIsValid() {
      return this.name !== "" && this.email !== "" && this.password !== "";
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
    onSignup() {
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password
      }),
        this.onUsers();
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    },
    onUsers() {
      if (!this.formIsValid) {
        return;
      }
      this.$store.dispatch("createUsers", {
        name: this.name,
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>
