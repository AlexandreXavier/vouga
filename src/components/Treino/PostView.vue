<template>
<v-layout row>
      <!-- <v-flex xs12 sm6 offset-sm3> -->
          <div class="col-12 text-center" v-if="loading">
                <h2>Wait a sec...</h2>
            </div>
        <v-flex xs10 offset-xs1>
        <v-card>
          <v-img
            :src="files[0].url"
            height="400px"
          >
          </v-img>

          <v-card-title primary-title>
            <div>
              <div class="headline">Top western road trips</div>
              <span class="grey--text">1,000 miles of wonder</span>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat @click.prevent="addFile($event)">Post</v-btn>
            <v-btn flat color="purple"  @click="$refs.inputFile.click()">ADD</v-btn>
            <input
                hidden
                type="file"
                ref="inputFile"
                multiple="false"
                class="input-file"
                @change="addFile($event)"
                >
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
              <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-slide-y-transition>
            <v-card-text v-show="show">

            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>


</template>


<script>
import { database } from "@/services/firebase";
import { storage } from "@/services/firebase";
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
  methods: {
    fileExtension(file) {
      let reversed = file.name
        .split("")
        .reverse()
        .join("");
      reversed = reversed.split(".")[0];
      return reversed
        .split("")
        .reverse()
        .join("");
    },
    addFile(ev) {
      const ext = this.fileExtension(ev.target.files[0]);
      const type = ev.target.files[0].type;
      const file = new File(
        [ev.target.files[0]],
        `${new Date().getTime()}.${ext}`,
        { type }
      );

      this.$emit("file", file);

      let storageRef = storage.ref();
      let fileRef = storageRef.child(`files/${file.name}`);
      alert("DENTRO " + file.name);

      fileRef
        .put(file)
        .then(snapshot => {
          snapshot.ref
            .getDownloadURL()
            .then(url => {
              let db = database.ref(`files/`);
              db.push({ url, name: file.name });
              this.$emit("fileOk", file);
              alert("GRAVADO " + file.name + " NA " + url);
              setTimeout(() => {
                alert("GRAVADO " + file.name + " NA " + url);
              }, 2000);
            })
            .catch(err => {
              alert(err.message);
            });
        })

        .catch(err => {
          alert(err.message);
        });

      this.$refs.inputFile.value = null;
    },
    getFiles() {
      this.loading = true;
      const db = database.ref(`files`);
      db.on("value", snapshot => {
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
      alert("APAGAR");
      // We will not really delete, but update, inserting a property called 'deleted'
      try {
        if (confirm("Do you really want to delete?")) {
          alert("APAGAR DENTRO");
          const dbRef = database.ref(`files/${file.id}`);
          await dbRef.set({
            name: file.name,
            url: file.url,
            // Logic deletion
            deleted: true
          });

          alert("Successfully deleted");
        }
      } catch (err) {
        alert(err.message);
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
.waiting {
  padding: 10px;
  color: #ff0000;
}
</style>
