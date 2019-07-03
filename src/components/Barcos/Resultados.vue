<template>
    <v-app id="inspire">
    <v-toolbar
      color="primary"
      dark
      fixed
      height="60px"
    >
       <v-toolbar-title style="width: 600px " class="ml-0 pl-3">
        <span class="hidden-sm-and-down">{{meetup.title}}</span>
        <v-spacer></v-spacer>
        <span class="hidden-sm-and-down">{{meetup.classes[0].text}}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>

      <v-list-tile
          @click="onSair">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
        </v-list-tile>
    </v-toolbar>

<!-- tabela lista de resultados -->
    <v-layout align-space-around justify-start column fill-height>
        <v-data-table
            :headers="headers"
            :items="resultados"
            class="elevation-1"
        >

         <template slot="headerCell" slot-scope="props">
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                <span v-on="on">
                    {{ props.header.text }}
                </span>
                </template>
                <span>
                {{ props.header.text }}
                </span>
            </v-tooltip>
            </template>

            <template v-slot:items="props">
                <td>{{ props.item.posicao }}</td>
                <td>{{ props.item.nacionalidade }}</td>
                <td>{{ props.item.club }}</td>
                <td>{{ props.item.matricula }}</td>
                <td>{{ props.item.barco }}</td>
                <td>{{ props.item.skipper }}</td>
                <td>{{ props.item.tempofinal }}</td>
                <td class="text-xs-left">{{ props.item.espacotempo }}</td>
                <td class="text-xs-left">{{ props.item.corrigido }}</td>
                <td class="text-xs-left">{{ props.item.total }}</td>
            </template>
        </v-data-table>
    </v-layout>

<!-- fim-->
    </v-app>
</template>

<script>
export default {
  props: ["id"],
  data: () => ({
    headers: [
      { text: "Pos", value: "posicao" },
      { text: "Nation", value: "nacionalidade" },
      { text: "Club", value: "club" },
      { text: "Matricula", value: "matricula" },
      { text: "Barco", value: "barco" },
      { text: "Skipper", value: "skipper" },
      { text: "Tempo Final", value: "tempofinal" },
      { text: "Espaço Tempo", value: "espacotempo" },
      { text: "Corrigido", value: "corrigido" },
      { text: "Pontos Totais", value: "total" }
    ],
    resultados: [
      {
        posicao: "1",
        nacionalidade: "PRT",
        club: "AVELA",
        matricula: "PRT1111",
        barco: "Swan 45",
        skipper: "Test",
        tempofinal: "12:40",
        espacotempo: "01:30",
        corrigido: "00:22",
        total: "934"
      },
      {
        posicao: "2",
        nacionalidade: "FRA",
        club: "IPD",
        matricula: "FRA999",
        barco: "Swan 43",
        skipper: "Loris",
        tempofinal: "13:40",
        espacotempo: "02:30",
        corrigido: "01:22",
        total: "800"
      }
    ]
  }),
  computed: {
    resultados() {
      //alert("RESULTADOS : " + this.id);
      return this.$store.getters.loadedResultado(this.id);
    },
    meetup() {
      // alert("REGATA : " + this.id);
      return this.$store.getters.loadedMeetup(this.id);
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  methods: {
    onSair() {
      this.$router.push("/");
    }
  }
};
</script>
