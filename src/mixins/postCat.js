const postCat = {
  methods: {
    postCat(catUrl, name, gravado, gerado, data, tipo, custom) {
      this.$root.$firebaseRefs.files
        .push({
          url: catUrl,
          name: name,
          bucket: gravado,
          metageneration: gerado,
          updated: data,
          contentType: tipo,
          customMetadata: custom
        })

        .then(this.$router.push("/"));
    }
  }
};

export default postCat;
