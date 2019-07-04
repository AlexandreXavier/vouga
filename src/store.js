import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedImages: [
      {
        id: "000",
        src: "https://s3-eu-west-1.amazonaws.com/xanivouga/16.jpg",
        thumbnail: "https://s3-eu-west-1.amazonaws.com/xanivouga/16.jpg",
        caption: ""
      },
      {
        id: "111",
        src: "https://s3-eu-west-1.amazonaws.com/xanivouga/9.jpg",
        thumbnail: "https://s3-eu-west-1.amazonaws.com/xanivouga/9.jpg",
        caption: ""
      }
    ],
    loadedVideos: [
      {
        id: "00",
        src: "https://s3-eu-west-1.amazonaws.com/xanivouga/video/0.mp4",
        thumbnail: "https://s3-eu-west-1.amazonaws.com/xanivouga/video/0.mp4",
        caption: ""
      }
    ],
    loadedUsers: [
      {
        name: "xani",
        email: "xani@getnada.com",
        password: "123456",
        country: "Portugal",
        nivel: 0,
        Id: ""
      },
      {
        name: "xico",
        email: "xico@getnada.com",
        password: "123456",
        country: "Portugal",
        nivel: 3,
        Id: ""
      }
    ],
    loadedMeetups: [
      {
        imageurl:
          "http://www.52superseries.com/wp-content/gallery/2017-52-super-series-miami-royal-cup/170307_nm_52SS_1034.jpg",
        id: "afajfjadfaadfa323",
        title: "Baiona Marina",
        date: new Date().toISOString().slice(0, 10),
        location: "Baiona Manina",
        description: "Regata do Principe"
      },
      {
        imageurl:
          "http://www.52superseries.com/wp-content/gallery/2017-52-super-series-miami-royal-cup/170311_nm_52SS_7219.jpg",
        id: "aadsfhbkhlk1241",
        title: "Miami",
        date: new Date().toISOString().slice(0, 10),
        location: "Miami",
        description: "Miami Florida"
      }
    ],
    loadedBarcos: [
      {
        name: "PortocaroDos",
        country: "ESP",
        sailnumber: "ESP5015"
      },
      {
        name: "Metralha",
        country: "POR",
        sailnumber: "POR8175"
      }
    ],
    user: null,
    currentUser: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedUsers(state, payload) {
      state.loadedUsers = payload;
    },
    setLoadedImages(state, payload) {
      state.loadedImages = payload;
    },
    setLoadedVideos(state, payload) {
      state.loadedVideos = payload;
    },
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    setLoadedResultados(state, payload) {
      state.loadedResultados = payload;
    },
    setLoadedBarcos(state, payload) {
      state.loadedBarcos = payload;
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
    createBarco(state, payload) {
      state.loadedBarcos.push(payload);
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    createUsers(state, payload) {
      state.loadedUsers.push(payload);
    },
    createResultado(state, payload) {
      state.loadedResultados.push(payload);
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    loadImages({ commit }) {
      commit("setLoading", true);
      const images = [];
      const base = parseInt(Math.random() * 12, 10) + 20;
      for (let i = 0; i < 40; i++) {
        images.push({
          id: i,
          src:
            "https://s3-eu-west-1.amazonaws.com/xanivouga/" +
            (base + i) +
            ".jpg",
          thumbnail:
            "https://s3-eu-west-1.amazonaws.com/xanivouga/" +
            (base + i) +
            ".jpg",
          caption: ""
        });
      }
      //Carrega a variavel images com as imagens da amazon s3
      commit("setLoadedImages", images);
      commit("setLoading", false);
    },
    loadVideos({ commit }) {
      commit("setLoading", true);
      const videos = [];
      //const base = parseInt(Math.random() * 12, 2) + 2;
      for (let i = 0; i < 6; i++) {
        videos.push({
          id: i,
          src:
            "https://s3-eu-west-1.amazonaws.com/xanivouga/video/" + i + ".mp4",
          thumbnail:
            "https://s3-eu-west-1.amazonaws.com/xanivouga/video/" + i + ".jpg",
          caption: "'i'"
        });
      }
      //Carrega a variavel videos com os videos da amazon s3
      commit("setLoadedVideos", videos);
      commit("setLoading", false);
    },
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
              classes: obj[key].classes,
              location: obj[key].location,
              imageurl: obj[key].imageurl,
              date: obj[key].date,
              dates: obj[key].dates,
              horainicio: obj[key].horainicio,
              creatorid: obj[key].creatorid,
              creatorname: obj[key].creatorname,
              creatoravatar: obj[key].creatoravatar,
              creatordate: obj[key].creatordate
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
    loadResultados({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("resultados")
        .once("value")
        .then(data => {
          const resultados = [];
          const obj = data.val();
          for (let key in obj) {
            resultados.push({
              id: key,
              meettupsid: obj[key].meettupsid,
              posicao: obj[key].posicao,
              nacionalidade: obj[key].nacionalidade,
              club: obj[key].club,
              matricula: obj[key].matricula,
              barco: obj[key].barco,
              skipper: obj[key].skipper,
              tempofinal: obj[key].tempofinal,
              espacotempo: obj[key].espacotempo,
              corrigido: obj[key].corrigido,
              total: obj[key].total
            });
          }
          //Carrega a variavel meetups com os dados do firebase
          commit("setLoadedResultados", resultados);
          commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    loadBarcos({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("barcos")
        .once("value")
        .then(data => {
          const barcos = [];
          const obj = data.val();
          for (let key in obj) {
            barcos.push({
              id: key,
              name: obj[key].name,
              country: obj[key].country,
              sailnumber: obj[key].sailnumber,
              builder: obj[key].builder,
              type: obj[key].type,
              year: obj[key].year,
              gph: obj[key].gph,
              loa: obj[key].loa,
              main: obj[key].main,
              genoa: obj[key].genoa,
              spinnaker: obj[key].spinnaker,
              crew: obj[key].crew,
              creatorid: obj[key].creatorid,
              creatorname: obj[key].creatorname
            });
          }
          //Carrega a variavel meetups com os dados do firebase
          commit("setLoadedBarcos", barcos);
          commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    createBarco({ commit, getters }, payload) {
      const barco = {
        name: payload.name,
        country: payload.country,
        sailnumber: payload.matricula,
        builder: payload.builder,
        type: payload.type,
        year: payload.year,
        gph: payload.gph,
        loa: payload.loa,
        main: payload.main,
        genoa: payload.genoa,
        spinnaker: payload.spinnaker,
        crew: payload.crew,
        creatorid: getters.user.id,
        creatorname: getters.currentUserName
      };
      //      alert("DENTRO " + barco.classe);
      firebase
        .database()
        .ref("barcos")
        .push(barco)
        .then(data => {
          const key = data.key;
          commit("createBarco", {
            ...barco,
            id: key
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    createMeetup({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageurl: payload.imageurl,
        description: payload.description,
        date: payload.date,
        dates: payload.dates,
        horainicio: payload.horainicio,
        classes: payload.classes,
        creatorid: getters.user.id,
        creatorname: getters.currentUserName,
        creatoravatar: getters.profilePicUrl,
        creatordate: payload.creatordate
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
              country: obj[key].country,
              nivel: obj[key].nivel,
              creatorid: obj[key].creatorid
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
        country: payload.country,
        nivel: payload.nivel,
        id: getters.user.id
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
    loadedImages(state) {
      return state.loadedImages.sort((imagesA, imagesB) => {
        return imagesA.date > imagesB.date;
      });
    },
    featuredImages(state, getters) {
      return getters.loadedImages.slice(0, 46);
    },
    loadedImage(state) {
      return imageId => {
        return state.loadedImages.find(image => {
          return image.id === imageId;
        });
      };
    },
    loadedVideos(state) {
      return state.loadedVideos.sort((videosA, videosB) => {
        return videosA.date > videosB.date;
      });
    },
    featuredVideos(state, getters) {
      return getters.loadedVideos.slice(0, 6);
    },
    loadedVideo(state) {
      return videoId => {
        return state.loadedVideos.find(video => {
          return video.id === videoId;
        });
      };
    },
    loadedUsers(state) {
      return state.loadedUsers.sort((usersA, usersB) => {
        return usersA.date > usersB.date;
      });
    },
    featuredUsers(state, getters) {
      return getters.loadedUsers.slice(0, 5);
    },
    loadedMeetups(state) {
      return state.loadedMeetups.sort((a, b) => {
        return a.date > b.date;
      });
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetup(state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          //alert("id " + meetup.id + " - " + meetupId);
          return meetup.id === meetupId;
        });
      };
    },
    loadedResultados(state) {
      return state.loadedResultados.sort((resultadoA, resultadoB) => {
        return resultadoA.date > resultadoB.date;
      });
    },
    featuredResultados(state, getters) {
      return getters.loadedResultados.slice(0, 2);
    },
    loadedResultado(state) {
      return resultadoId => {
        return state.loadedResultados.find(resultado => {
          /*  alert("id " + resultado.id + " - " + resultadoId);
          alert(
            "meetupID " + resultado.meetupid + " barco: " + resultado.barco
          );*/
          //alert("resultadoId " + resultadoId);
          return resultado.id === resultadoId;
        });
      };
    },
    loadedBarcos(state) {
      return state.loadedBarcos.sort((barcoA, barcoB) => {
        return barcoA.date > barcoB.date;
      });
    },
    featuredBarcos(state, getters) {
      return getters.loadedBarcos.slice(0, 25);
    },
    loadedBarco(state) {
      return barcoId => {
        return state.loadedBarcos.find(barco => {
          alert("id " + barco.id + " - " + barcoId);
          return barco.id === barcoId;
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
    },
    currentUserName() {
      return firebase.auth().currentUser.displayName;
    },
    profilePicUrl() {
      return firebase.auth().currentUser.photoURL || "/profile.png";
    }
  }
});
