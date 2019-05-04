import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl:
          "http://www.52superseries.com/wp-content/gallery/2017-52-super-series-miami-royal-cup/170307_nm_52SS_1034.jpg",
        id: "afajfjadfaadfa323",
        title: "Baiona Marina",
        date: new Date().toISOString().slice(0, 10),
        location: "Baiona Manina",
        description: "Regata do Principe"
      },
      {
        imageUrl:
          "http://www.52superseries.com/wp-content/gallery/2017-52-super-series-miami-royal-cup/170311_nm_52SS_7219.jpg",
        id: "aadsfhbkhlk1241",
        title: "Miami",
        date: new Date().toISOString().slice(0, 10),
        location: "Miami",
        description: "Miami Florida"
      }
    ],
    user: null,
    loadedUsers: [
      {
        name: "xani",
        email: "xani@getnada.com",
        password: "123456",
        Id: ""
      },
      {
        name: "xico",
        email: "xico@getnada.com",
        password: "123456",
        Id: ""
      }
    ],
    loading: false,
    error: null
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    setLoadedUsers(state, payload) {
      state.loadedUsers = payload;
    },
    createUsers(state, payload) {
      state.loadedUsers.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    loadMeetups({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("meetups")
        .once("value")
        .then(data => {
          const meetups = [];
          const obj = data.val();
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            });
          }
          //Carrega a variavel meetups com os dados do firebase
          commit("setLoadedMeetups", meetups);
          commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    createMeetup({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        dates: payload.dates,
        horaInicio: payload.dates,
        classes: payload.classes,
        creatorId: getters.user.id
      };
      firebase
        .database()
        .ref("meetups")
        .push(meetup)
        .then(data => {
          const key = data.key;
          commit("createMeetup", {
            ...meetup,
            id: key
          });
        })
        .catch(error => {
          console.log(error);
        });
      // Reach out to firebase and store it
    },
    loadUsers({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("users")
        .once("value")
        .then(data => {
          const users = [];
          const obj = data.val();
          for (let key in obj) {
            users.push({
              id: key,
              name: obj[key].name,
              email: obj[key].email,
              password: obj[key].password,
              creatorId: obj[key].creatorId
            });
          }
          //Carrega a variavel users com os dados do firebase
          commit("setLoadedUsers", users);
          commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    createUsers({ commit, getters }, payload) {
      const users = {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        Id: getters.user.id
      };
      firebase
        .database()
        .ref("users")
        .push(users)
        .then(data => {
          const key = data.key;
          //chama a mutation createUsers
          commit("createUsers", {
            ...users,
            id: key
          });
        })
        .catch(error => {
          console.log(error);
        });
      // Reach out to firebase and store it
    },
    signUserUp({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    signUserInGoogle({ commit }) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            registeredMeetups: ["Google"]
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    signUserInFacebook({ commit }) {
      commit("setLoading", true);
      commit("clearError");
      //alert("STORE FACEBOOK");
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            registeredMeetups: ["Facebook"]
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    signUserInTwitter({ commit }) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.TwitterAuthProvider())
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    autoSignIn({ commit }, payload) {
      commit("setUser", {
        id: payload.uid
      });
    },
    logout({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    },
    clearError({ commit }) {
      commit("clearError");
    }
  },
  getters: {
    loadedUsers(state) {
      return state.loadedUsers.sort((usersA, usersB) => {
        return usersA.date > usersB.date;
      });
    },
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },
    featuredUsers(state, getters) {
      return getters.loadedUsers.slice(0, 5);
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup(state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId;
        });
      };
    },
    user(state) {
      return state.user;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    }
  }
});
