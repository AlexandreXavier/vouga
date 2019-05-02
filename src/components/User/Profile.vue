<template>
    <v-app id="inspire">
<!-- sandwich -->
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      app
      temporary
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ item.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click="onOne"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" @click="onFour">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>


<!-- tab -->
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="primary"
      dark
      app
      fixed
      height="50px"
    >
      <v-toolbar-title style="width: 300px " class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Utilizadores</span>
      </v-toolbar-title>

      <v-text-field v-if="fotoUser"
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
<!--  img perfil  -->
        <div v-if="fotoUser">
            <span class="hidden-sm-and-down">{{"U: "+user.displayName}}</span>
            <v-avatar size="32px" color="grey lighten-4">
                <v-img :src="displayUser.photoUR" :alt="displayUser.displayName">
                </v-img>
            </v-avatar>
        </div>
      <v-list-tile
          @click="onSair">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
        </v-list-tile>
    </v-toolbar>

<!--  btn + -->
    <v-btn
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>


<!-- caixa criar utilizador -->
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title
          class="grey lighten-4 py-4 title"
        >
          Criar Utilizador
        </v-card-title>
        <v-container grid-list-sm class="pa-4">
          <v-layout row wrap>
            <v-flex xs12 align-center justify-space-between>
              <v-layout align-center>
                <v-avatar size="40px" class="mr-3">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </v-avatar>
                <v-text-field
                  placeholder="Name"
                  value="FALTA REFERENCIAR"
                ></v-text-field>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="mail"
                placeholder="Email"
                value="FALTA REFERENCIAR"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                type="tel"
                prepend-icon="phone"
                placeholder="(000) 00 0000000"
                mask="phone"
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                prepend-icon="notes"
                placeholder="Notes"
                value="FALTA REFERENCIAR"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-card-actions>
          <v-btn flat color="success" @click="dialog = false">Cancelar</v-btn>
          <v-btn flat @click="dialog = false">Gravar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


<!-- tabela lista de utilizadores -->
    <v-layout align-space-around justify-start column fill-height>
        <v-data-table
            :headers="headers"
            :items="users"
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
            <td>{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>
            <td class="text-xs-left">{{ props.item.password }}</td>
            <td class="justify-center layout px-0">
                <v-icon
                    small
                    class="mr-2"
                    @click="editItem(props.item)"
                >
                    edit
                </v-icon>
                <v-icon
                    small
                    @click="deleteItem(props.item)"
                >
                    delete
                </v-icon>
                </td>
            </template>
        </v-data-table>
    </v-layout>

<!-- fim-->
    </v-app>
</template>

<script>
export default {
  data: () => ({
    profileData: {
      displayName: "Time to Hack",
      photoURL: "https://vuetifyjs.com/apple-touch-icon-180x180.png"
    },
    dialog: false,
    drawer: null,
    items: [
      { icon: "contacts", text: "Contactos" },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "Dados",
        model: true,
        children: [{ icon: "add", text: "Criar Dados" }]
      },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "Mais",
        model: false,
        children: [
          { text: "Importar" },
          { text: "Exportar" },
          { text: "Imprimir" }
        ]
      },
      { icon: "chat_bubble", text: "Ligar" }
    ],
    headers: [
      { text: "Id", value: "id" },
      { text: "Nome", value: "name" },
      { text: "Email", value: "email" },
      { text: "password", value: "password" },
      { text: "Alterar", value: "name", sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      icon: "",
      position: "",
      ideventos: 0
    },
    defaultItem: {
      id: "",
      name: "",
      email: "",
      password: ""
    }
  }),
  computed: {
    users() {
      return this.$store.getters.loadedUsers;
    },
    formTitle() {
      return this.editedIndex === -1 ? "Novo User" : "Editar User";
    },
    user() {
      return this.$store.state.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
    fotoUser() {
      return (
        this.$store.getters.getProfilePicUrl !== null &&
        this.$store.getters.getProfilePicUrl !== undefined
      );
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    displayUser() {
      (this.displayName =
        this.profileData.displayName || this.user.displayName),
        (this.photoURL = this.profileData.photoURL || this.user.photoURL);
    },
    onSair() {
      this.$router.push("/");
    },
    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.users.indexOf(item);
      confirm("Tem a certeza que quer apagar este utilizador?") &&
        this.users.splice(index, 1);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem);
      } else {
        this.users.push(this.editedItem);
      }
      this.close();
    },
    onOne() {
      return "One";
    },
    onFour() {
      return "Four";
    },
    onTen() {
      return "Ten";
    }
  },
  props: {
    source: String
  }
};
</script>
