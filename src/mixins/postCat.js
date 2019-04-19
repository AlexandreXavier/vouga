const postCat = {
  methods: {
    postCat(catUrl, title) {
      this.$root.$firebaseRefs.cat
        .push({
          url: catUrl,
          comment: title,
          info: "Posto por " + this.$store.getters.user,
          created_at: -1 * new Date().getTime()
        })
        .then(this.$router.push("/"));
    }
  }
};

export default postCat;
