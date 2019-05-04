<template>
  <v-container>
<v-layout row wrap v-for="file in files" :key="file.id" class="mb-2">
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
        <v-card>
<!-- img -->
                <v-img
                  :src="file.url"
                  v-if="fileType(file) === 'img'"
                  >
                <v-container fill-height fluid>
                    <v-layout fill-height>
                        <v-flex xs12 align-end flexbox>
                            <span color="white" class="headline">{{file.name}}</span>
                        </v-flex>
                    </v-layout>
                </v-container>
                </v-img>

<!-- titulo -->
          <v-card-title>
            <div>
              <span class="grey--text">Coordenadas GPS</span><br>
              <span>Nome do Autor do Post</span><br>
              <span>Nota do Autor</span>
            </div>
                <v-slide-y-transition>
                        <v-card-text v-show="show">
                            <v-layout>
                                <div>
                                    <v-btn small outline fab color="primary" @click="deleteFile(file)">
                                        <i class="far fa-trash-alt"></i>
                                    </v-btn>
                                     <h5> ID:{{ file.id }}</h5>
                                    <span class="grey--text">USER: {{user}}</span><br>
                                </div>
                            </v-layout>
                        </v-card-text>
          </v-slide-y-transition>
          </v-card-title>
<!-- accao -->
          <v-card-actions>
                <!-- <v-btn flat color="orange">Share</v-btn>
                <v-btn flat color="orange">Explore</v-btn>  -->
                <v-spacer></v-spacer>
                <v-btn icon @click="show = !show">
                    <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                </v-btn>
          </v-card-actions>

        </v-card>
            <router-link class="add-picture-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored" to="/post">
             <i class="material-icons">add</i>
            </router-link>

            <router-link class="take-picture-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored" to="/camera">
            <i class="material-icons">camera_alt</i>
            </router-link>
      </v-flex>

    </v-layout>
</v-layout>
  </v-container>

</template>

<script>
import { database } from "@/services/firebase";

export default {
  data() {
    return {
      files: [],
      loading: false,
      show: false
    };
  },
  mounted() {
    this.getFiles();
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    getFiles() {
      this.loading = true;
      const databases = database.ref("files");
      databases.on("value", snapshot => {
        let data = snapshot.val();
        this.files = [];
        for (let index in data) {
          let payload = data[index];
          // Don't show if was deleted
          if (!payload.deleted) {
            payload.id = index;
            this.files.push(payload);
          }
        }
        this.files.reverse();
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
    },
    async deleteFile(file) {
      // We will not really delete, but update, inserting a property called 'deleted'
      try {
        {
          const dbRef = database.ref(`files/${file.id}`);
          await dbRef.set({
            name: file.name,
            url: file.url,
            // Logic deletion
            deleted: true
          });
        }
      } catch (err) {
        alert(err);
      }
    },
    fileType(file) {
      if (
        file.name.includes("jpg") ||
        file.name.includes("jpeg") ||
        file.name.includes("png")
      ) {
        return "img";
      } else {
        return "video";
      }
    }
  }
};
</script>


<style scoped>
.add-picture-button {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 998;
}
.take-picture-button {
  position: fixed;
  right: 24px;
  top: 24px;
  z-index: 998;
}
.image-card {
  position: relative;
  margin-bottom: 8px;
}
.image-card__picture > img {
  width: 100%;
}
.image-card__comment {
  position: absolute;
  bottom: 0;
  height: 52px;
  padding: 16px;
  text-align: right;
  background: rgba(0, 0, 0, 0.5);
}
.image-card__comment > span {
  color: #fff;
  font-size: 14px;
  font-weight: bold;
}
</style>
