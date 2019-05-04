<template>
<!-- camera -->
  <div class="camera-modal">
    <video ref="video" class="camera-stream"/>
    <div class="camera-modal-container">
            <span @click.prevent="capture" class="take-picture-button take-picture-button mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
              <i class="material-icons">camera</i>
            </span>
           <!--  <span @click.prevent="onSair" class="open-in-new open-in-new mdl-button mdl-js-button mdl-button--fab mdl-button--colored">
              <i class="material-icons">sair</i>
            </span> -->
    </div>
  </div>
</template>

<script>
import { storage } from "@/services/firebase";
import postCat from "@/mixins/postCat";
//import { pathToFileURL } from "url";
//import { url } from "inspector";

export default {
  mixins: [postCat],
  data() {
    return {
      mediaStream: null
    };
  },
  mounted() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(mediaStream => {
        this.mediaStream = mediaStream;
        this.$refs.video.srcObject = mediaStream;
        this.$refs.video.play();
      })
      .catch(error => console.error("getUserMedia() error:", error));
  },
  destroyed() {
    const tracks = this.mediaStream.getTracks();
    tracks.map(track => track.stop());
  },
  methods: {
    capture() {
      const mediaStreamTrack = this.mediaStream.getVideoTracks()[0];
      const imageCapture = new window.ImageCapture(mediaStreamTrack);
      let caminhoURL = "";

      /* var filePath = firebase.auth().currentUser.uid + '/' + messageRef.id + '/' + file.name;
    return firebase.storage().ref(filePath).put(file).then(function(fileSnapshot) {
      // 3 - Generate a public URL for the file.
      return fileSnapshot.ref.getDownloadURL().then((url) => {
        // 4 - Update the chat message placeholder with the image’s URL.
        return messageRef.update({
          imageUrl: url,
          storageUri: fileSnapshot.metadata.fullPath
        });
      });
    }); */

      return imageCapture.takePhoto().then(blob => {
        storage
          .ref()
          .child("files/" + new Date().getTime() + ".jpg")
          .put(blob)
          .then(snapshot => {
            snapshot.ref.getDownloadURL().then(url => {
              caminhoURL = url;
              //       alert("caminhoURL " + caminhoURL);
            });
          })
          .then(res => {
            this.postCat(
              res.metadata.url,
              res.metadata.name,
              res.metadata.bucket,
              res.metadata.metageneration,
              res.metadata.updated,
              (res.metadata.contentType = "image/jpeg"),
              (res.metadata.customMetadata = caminhoURL)
            );
            /* setTimeout(() => {
              alert("TIMER");
            }, 20000); */
          })
          .catch(err => {
            alert("ERROR " + err.message);
          });
      });
    }

    /* onSair() {
      alert(this.postCat);
      const tracks = this.mediaStream.getTracks();
      tracks.map(track => track.stop());

      this.$router.push("/post");
    } */
  }
};
</script>

<style scoped>
.camera-modal {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-color: white;
  z-index: 10;
}
.camera-stream {
  width: 100%;
  max-height: 100%;
}
.camera-modal-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  align-items: center;
  margin-bottom: 28px;
}
.take-picture-button {
  display: flex;
}
</style>
