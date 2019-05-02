<template>
  <v-container>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <h4>Criar um novo Evento</h4>
        </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">
<!-- data input text -->
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                <v-text-field
                    name="title"
                    label="Titulo"
                    id="title"
                    v-model="title"
                    required></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                <v-text-field
                    name="location"
                    label="Local"
                    id="location"
                    v-model="location"
                    required></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                <v-text-field
                    name="imageUrl"
                    label="Image URL"
                    id="image-url"
                    v-model="imageUrl"
                    required></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                <img :src="imageUrl" height="150">
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                <v-text-field
                    name="description"
                    label="Descrição"
                    id="description"
                    v-model="description"
                    required></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                <v-text-field
                    name="classes"
                    label="Classes"
                    id="classes"
                    v-model="classes"
                    required></v-text-field>
                </v-flex>
            </v-layout>

            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                <h4>Escolher a Data & Hora</h4>
                </v-flex>
            </v-layout>
<!-- data pick -->
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                            <v-date-picker v-model="dates"
                            multiple
                            header-color="primary"
                            color="primary"
                            ></v-date-picker>
                </v-flex>
            </v-layout>
            <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="dates" lazy transition="scale-transition" >
                                <template v-slot:activator="{ on }">
                                    <v-combobox hidden
                                        v-model="dates"
                                        multiple
                                        chips
                                        small-chips
                                        label="Varios Dias"
                                        prepend-icon="event"
                                        readonly
                                        v-on="on"
                                    ></v-combobox>
                                </template>
                                <v-date-picker
                                    v-model="dates"
                                    multiple
                                    no-title
                                    scrollable>
                                </v-date-picker>
                            </v-menu>

                            <!-- <v-btn flat color="teal" @click="menu=false">
                                Cancelar
                            </v-btn>
                            <v-btn flat color="teal" @click="$refs.menu.save(dates)">
                                OK
                            </v-btn> -->
                    </v-flex>
                </v-layout>

<!-- time pick -->
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                    <v-time-picker
                    header-color="primary"
                    v-model="time"
                    format="24hr"
                    color="primary">
                    </v-time-picker>
                </v-flex>
            </v-layout>
<!-- validar -->
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                    <h4>DATA: {{date}}</h4>
                    <v-btn outline
                        class="teal"
                        :disabled="!formIsValid"
                        type="submit">Criar Evento
                    </v-btn>
                </v-flex>
            </v-layout>
<!-- fim -->
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      title: "",
      location: "",
      imageUrl: "",
      description: "",
      classes: "ORC",
      date: new Date().toISOString().slice(0, 10),
      dates: ["2019-04-23", "2019-04-25"],
      time: "14:00",
      menu: false
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.imageUrl !== "" &&
        this.description !== "" &&
        this.classes !== ""
      );
    },
    submittableDateTime() {
      const date = new Date(this.date);

      if (this.dates != null) {
        let dataInicio = this.dates[0];
        alert("DATES " + this.dates + " -0- " + dataInicio);
        return dataInicio;
      } else {
        var d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        alert("d " + [year, month, day].join("-"));
        return [year, month, day].join("-");
      }
    }
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        classes: this.classes,
        date: this.submittableDateTime,
        dates: this.dates,
        horaInicio: this.time
      };
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push("/meetups");
    }
  }
};
</script>
