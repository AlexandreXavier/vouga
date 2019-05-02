<template>
    <div id="app">
  <v-app id="inspire">
    <v-layout>
      <v-flex>
        <v-sheet height="500">
          <v-calendar
            :now="today"
            :value="today"
            color="teal"
            type="month"
            locale='pt-pt'
          >
            <template v-slot:day="{ date }">
              <template v-for="event in eventsMap[date]">
                <v-menu
                  :key="event.title"
                  v-model="event.open"
                  full-width
                  offset-x
                >
                  <template v-slot:activator="{ on }">
                    <div
                      v-if="!event.time"
                      v-ripple
                      class="my-event"
                      v-on="on"
                      v-html="event.title"
                    ></div>
                  </template>
                  <v-card
                    color="grey lighten-4"
                    min-width="350px"
                    flat
                  >
                    <v-toolbar
                      color="teal"
                      dark
                    >
                      <v-btn icon>
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-toolbar-title v-html="event.title"></v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn icon>
                        <v-icon>favorite</v-icon>
                      </v-btn>
                      <v-btn icon>
                        <v-icon>more_vert</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-title primary-title>
                      <span v-html="event.location"></span>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn
                        flat
                        color="secondary"
                      >
                        Sair
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </template>
            </template>
          </v-calendar>
        </v-sheet>
      </v-flex>
    </v-layout>
  </v-app>
</div>
</template>

<script>
export default {
  /* today: this.dataHoje */
  data: () => ({
    today: "2019-04-28",
    events: [
      {
        title: "Treino",
        location: "Clube Avela!",
        date: "2019-04-27"
      }
    ]
  }),
  computed: {
    eventsMap() {
      const map = {};
      this.meetups.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      //this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      //alert(this.meetups[0].dates;
      //this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    },
    meetups() {
      return this.$store.getters.loadedMeetups;
    },
    dataHoje: () => {
      var hoje = "";
      var d = new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      //alert("d " + [year, month, day].join("-"));
      hoje = [year, month, day].join("-");
      //alert("HOJE " + hoje);

      return hoje;
    }
  },
  methods: {
    // convert the list of events into a map of lists keyed by date
    open(event) {
      alert(event.title);
    }
  }
};
</script>



<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
</style>
