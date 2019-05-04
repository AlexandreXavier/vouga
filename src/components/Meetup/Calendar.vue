<template>
   <v-layout wrap>
    <v-flex
      xs12
      class="mb-3"
    >
        <v-sheet height="500">
          <v-calendar
            ref="cal"
            :now="today"
            :value="today"
            color="primary"
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
                    class="my-card"
                    color="primary"
                    min-width="400px"
                    flat
                  >
                    <v-toolbar
                      color="primary"
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
                        color="white"
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
        <v-flex sm4 xs12 class="text-sm-left text-xs-center hidden-sm-and-down">
            <v-btn outline color="primary" @click="$refs.cal.prev()">
                <v-icon dark left>
                    keyboard_arrow_left
                </v-icon>
                Prev
            </v-btn>
        </v-flex>

        <v-flex sm4 xs12 class="text-xs-center hidden-sm-and-down">
            <v-select  color="primary"
                v-model="type"
                :items="typeOptions"
                label="Tipo"
            ></v-select>
        </v-flex>

        <v-flex sm4 xs12 class="text-sm-right text-xs-center hidden-sm-and-down">
            <v-btn outline color="primary" @click="$refs.cal.next()">
                Next
                <v-icon right dark >
                keyboard_arrow_right
                </v-icon>
            </v-btn>
        </v-flex>


    </v-layout>

</template>

<script>
export default {
  /* today: this.dataHoje */
  data: () => ({
    today: "2019-05-04",
    type: "month",
    typeOptions: [
      { text: "Dia", value: "day" },
      { text: "4 Dias", value: "4day" },
      { text: "Semana", value: "week" },
      { text: "Mes", value: "month" },
      { text: "Dia Especial", value: "custom-daily" },
      { text: "Semana Especial", value: "custom-weekly" }
    ],
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
  watch: {
    hoje(dataHoje) {
      alert("VALUE --" + dataHoje);
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
  background-color: #ff0000;
  color: #ffffff;
  border: 1px solid #ff0000;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}
.my-card {
  color: #ffffff;
}
</style>
