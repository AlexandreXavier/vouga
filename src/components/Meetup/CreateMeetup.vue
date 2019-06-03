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
<!-- combo -->
            <v-layout row>
                <v-flex xs12 sm6 offset-sm3>
                    <v-combobox
                        v-model="model"
                        :filter="filter"
                        :hide-no-data="!search"
                        :items="items"
                        :search-input.sync="search"
                        hide-selected
                        label="Classes"
                        multiple
                        small-chips
                        solo
                        >

                        <!-- <template v-slot:no-data>
                        <v-list-tile>
                            <span class="subheading">Criar</span>
                            <v-chip
                                color="white"
                                label
                                small
                            >
                                {{ search }}
                            </v-chip>
                        </v-list-tile>
                        </template> -->

                        <template v-slot:selection="{ item, parent, selected }">
                            <v-chip
                            v-if="item === Object(item)"
                            color="white"
                            :selected="selected"
                            label
                            small
                            >
                            <span class="pr-2">
                                {{item.text}}
                            </span>
                            <v-spacer></v-spacer>
                            <v-avatar>
                                <img :src="`https://xanivouga.s3-eu-west-1.amazonaws.com/class/cinza/${item.icon}.png`">
                            </v-avatar>
                            <v-icon
                                small
                                @click="parent.selectItem(item)"
                            >close</v-icon>
                            </v-chip>
                        </template>

                        <template v-slot:item="{ index, item }">
                            <v-list-tile-content>
                            <v-text-field
                                v-if="editing === item"
                                v-model="editing.text"
                                autofocus
                                flat
                                background-color="transparent"
                                hide-details
                                solo
                                @keyup.enter="edit(index, item)"
                            ></v-text-field>
                            <!-- <v-chip
                                v-else
                                color="cinza"
                                label
                                small
                            >
                                {{ item.text }}
                            </v-chip> -->
                             <v-avatar>
                                <img :src="`https://xanivouga.s3-eu-west-1.amazonaws.com/class/cinza/${item.icon}.png`">
                            </v-avatar>
                            <v-spacer></v-spacer>
                            </v-list-tile-content>
                            <v-spacer></v-spacer>
                            <v-list-tile-action @click.stop>
                           <!--  <v-btn
                                icon
                                @click.stop.prevent="edit(index, item)"
                            >
                                <v-icon>{{ editing !== item ? 'edit' : 'check' }}</v-icon>
                            </v-btn> -->
                            </v-list-tile-action>
                        </template>

                </v-combobox>

                <!-- <v-text-field
                    name="classes"
                    label="Classes"
                    id="classes"
                    v-model="classes"
                    required></v-text-field> -->
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
      activator: null,
      attach: null,
      icons: ["ORC_0", "ORC_1", "ORC_2", "ORC_3", "ORC_4"],
      editing: null,
      index: -1,
      items: [
        {
          header: "Seleciona uma opção ou cria uma",
          text: "ORC0-",
          icon: "ORC_0"
        },
        {
          text: "ORC1-",
          icon: "ORC_1"
        },
        {
          text: "ORC2-",
          icon: "ORC_1"
        },
        {
          text: "ORC3-",
          icon: "ORC_3"
        },
        {
          text: "ORC4-",
          icon: "ORC_4"
        }
      ],
      nonce: 1,
      menu: false,
      model: [
        {
          text: "ORC 1-",
          icon: "ORC_1"
        }
      ],
      x: 0,
      search: null,
      y: 0,
      date: new Date().toISOString().slice(0, 10),
      dates: [new Date().toISOString().slice(0, 10)],
      time: "14:00",
      autor: null,
      creatorDate: new Date().toISOString().slice(0, 10)
    };
  },
  watch: {
    model(val, prev) {
      if (val.length === prev.length) return;
      this.model = val.map(v => {
        if (typeof v === "string") {
          v = {
            text: v,
            icon: this.icons[this.nonce - 1]
          };
          this.items.push(v);
          this.nonce++;
        }
        return v;
      });
    }
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.imageUrl !== "" &&
        this.description !== ""
      );
    },
    submittableDateTime() {
      const date = new Date(this.date);

      if (this.dates != null) {
        let dataInicio = this.dates[0];
        return dataInicio;
      } else {
        var d = new Date(date),
          month = "" + (d.getMonth() + 1),
          day = "" + d.getDate(),
          year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        return [year, month, day].join("-");
      }
    }
  },
  methods: {
    edit(index, item) {
      if (!this.editing) {
        this.editing = item;
        this.index = index;
      } else {
        this.editing = null;
        this.index = -1;
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false;

      const hasValue = val => (val != null ? val : "");

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return (
        text
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      );
    },
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        classes: this.model,
        date: this.submittableDateTime,
        dates: this.dates,
        horaInicio: this.time,
        creatorDate: this.date
      };
      alert("model " + this.model);
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push("/meetups");
    }
  }
};
</script>
