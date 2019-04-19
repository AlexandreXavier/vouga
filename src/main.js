import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import Vuefire from "vuefire";
import VueResource from "vue-resource";
import * as firebase from "firebase";
import { database } from "@/services/firebase";
import router from "./route";
import store from "./store";
import "./registerServiceWorker";

import Footer from "./components/Footer";
import "@fortawesome/fontawesome-free/css/all.css"; // Ensure you are using css-loader

Vue.use(Vuefire);
Vue.use(VueResource);

Vue.config.productionTip = false;

Vue.component("portocaro-footer", Footer);

new Vue({
  firebase: {
    cat: database.ref("cat").orderByChild("created_at")
  },
  router,
  store,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // alert("Utilizador " + user.id);
        this.$store.dispatch("autoSignIn", user);
      }
    });
    //carregar os eventos gravados na db do firebase
    this.$store.dispatch("loadMeetups");
  }
}).$mount("#app");
