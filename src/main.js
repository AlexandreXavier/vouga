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
import AlertCmp from "./components/Alert.vue";
import "@fortawesome/fontawesome-free/css/all.css";

Vue.use(Vuefire);
Vue.use(VueResource);

Vue.config.productionTip = false;

Vue.component("portocaro-footer", Footer);
Vue.component("app-alert", AlertCmp);

new Vue({
  firebase: {
    files: database.ref("files").orderByChild("created_at")
  },
  router,
  store,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
      }
    });
    //carregar os eventos gravados na db do firebase
    this.$store.dispatch("loadMeetups");
    this.$store.dispatch("loadUsers");
  }
}).$mount("#app");
