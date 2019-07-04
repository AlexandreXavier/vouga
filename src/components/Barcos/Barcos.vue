<template>
<v-container>

<!-- criar ou editar users -->
<v-dialog v-model="dialog" max-width="500px">
    <v-card class="mx-auto" max-width="650px">

                        <v-card-title class="title font-weight-regular justify-space-between">
                            <span>{{ currentTitle }}</span>
                        </v-card-title>

                        <v-window v-model="step">

                            <v-window-item :value="1">
                            <v-card-text>
                                <v-form>
                                <v-container>
                                <v-layout row wrap justify-center>
                                            <v-flex xs12 sm3>
                                            <v-text-field v-model="editedItem.main" label="Vela Grande" suffix="m2" readonly>
                                            </v-text-field>
                                            <v-text-field v-model="editedItem.genoa" label="Genoa"
                                            suffix="m2" readonly>
                                            </v-text-field>
                                            <v-text-field v-model="editedItem.spinnaker" label="Balao" suffix="m2" readonly>
                                            </v-text-field>
                                        </v-flex>
                                        <v-spacer></v-spacer>
                                        <v-flex xs12 sm3>
                                            <v-text-field v-model="editedItem.loa" label="Comp.Casco" suffix="m" readonly>
                                            </v-text-field>

                                            <v-text-field v-model="editedItem.draft" label="Alt.Casco" suffix="m" readonly>
                                            </v-text-field>
                                        </v-flex>
                                        <v-spacer></v-spacer>
                                        <v-flex xs12 sm3>
                                            <v-text-field v-model="editedItem.spinnaker" label="Balao" suffix="m2"                    readonly>
                                            </v-text-field>
                                            <v-text-field v-model="editedItem.spinnaker" label="Balao" suffix="m2" >
                                            </v-text-field>
                                        </v-flex>
                                </v-layout>
                                </v-container>
                                </v-form>
                            </v-card-text>
                            </v-window-item>

                            <v-window-item :value="2">
                            <v-card-text>
                                <v-form>
                                    <v-container>
                                    <v-layout row wrap justify-center>
                                        <v-flex xs12 sm3>
                                                <v-text-field v-model="editedItem.gph" label="Rating"
                                                    suffix="m2" readonly>
                                                </v-text-field>
                                                <v-text-field v-model="editedItem.genoa" label="Genoa"
                                                suffix="m2" readonly>
                                                </v-text-field>
                                                <v-text-field v-model="editedItem.spinnaker" label="Balao" suffix="m2" readonly>
                                                </v-text-field>
                                            </v-flex>
                                            <v-spacer></v-spacer>
                                            <v-flex xs12 sm3>
                                                <v-text-field v-model="editedItem.loa" label="Comp.Casco" suffix="m" readonly>
                                                </v-text-field>

                                                <v-text-field v-model="editedItem.draft" label="Alt.Casco" suffix="m" readonly>
                                                </v-text-field>
                                            </v-flex>
                                            <v-spacer></v-spacer>
                                            <v-flex xs12 sm3>
                                                <v-text-field v-model="editedItem.spinnaker" label="Balao" suffix="m2" readonly>
                                                </v-text-field>
                                                <v-text-field v-model="editedItem.spinnaker" label="Balao" suffix="m2" >
                                                </v-text-field>
                                            </v-flex>
                                    </v-layout>
                                    </v-container>
                                </v-form>

                            </v-card-text>
                            </v-window-item>

                            <v-window-item :value="3">
                                <div class="pa-3 text-xs-center">
                                    <v-img
                                    class="mb-3"
                                    contain
                                    height="128"
                                    src="https://cdn.vuetifyjs.com/images/logos/v.svg"
                                    ></v-img>
                                <h3 class="title font-weight-light mb-2">ORC</h3>
                                    <span class="caption grey--text">Thanks for the Data!</span>
                                </div>
                            </v-window-item>

                        </v-window>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-btn
                                :disabled="step === 1"
                                flat
                                @click="step--"
                                >
                                Previo
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                                :disabled="step === 3"
                                color="primary"
                                depressed
                                @click="step++"
                                >
                                Proximo
                            </v-btn>
                        </v-card-actions>

    </v-card>
</v-dialog>

<!-- filtros -->
<v-layout row wrap justify-center>
            <v-flex xs2>
                <v-select
                    :items="filterFields"
                    v-model="filterField"
                    label="Filtrar por">
                </v-select>
            </v-flex>
             <v-spacer></v-spacer>
            <v-flex xs2 sm1>
                <v-select
                    :items="filterOperators"
                    v-model="filterOperator"
                    label="Operador">
                </v-select>
            </v-flex>
             <v-spacer></v-spacer>
            <v-flex xs2 v-show="filterOperator && filterType !== 'lookup'">
                <v-text-field
                    name="filterTerm"
                    :label="filterTermLabel"
                    :mask="filterTermMask"
                    :rules='filterTermRules'
                    return-masked-value
                    v-model="filterTerm"
                ></v-text-field>
            </v-flex>
            <v-flex xs2 v-show="filterOperator === 'between'">
                <v-text-field
                    name="filterTerm2"
                    :label="filterTermLabel"
                    :mask="filterTermMask"
                    :rules='filterTermRules'
                    return-masked-value
                    v-model="filterTerm2"
                ></v-text-field>
            </v-flex>
            <v-flex xs2 v-show="filterType === 'lookup'">
                <v-autocomplete
                  :items="filterLookupItems"
                  :label="filterLookupLabel"
                  v-model="filterLookupValue"
                ></v-autocomplete>
            </v-flex>
             <v-spacer></v-spacer>
            <v-flex xs2>
                <v-btn color="warning" @click="onClearAllFilters">Limpar Filtro</v-btn>
            </v-flex>

<!-- tabela -->
    <v-data-table
    :headers="headers"
    :items="filteredBarcos"
    class="elevation-1">
                <template slot="items" slot-scope="props">
                    <td>{{ props.item.name }}</td>
                    <td class="text-xs-left">{{ props.item.gph }}</td>
                    <td class="justify-center" v-if="userIsAuthenticated">
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
</v-container>
</template>

<script>
import moment from "moment";
export default {
  name: "home",
  data() {
    return {
      dialog: false,
      step: 1,
      paises: [
        "Afghanistan",
        "Albania",
        "Algeria",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antigua &amp; Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia",
        "Bosnia &amp; Herzegovina",
        "Botswana",
        "Brazil",
        "British Virgin Islands",
        "Brunei",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cambodia",
        "Cameroon",
        "Cape Verde",
        "Cayman Islands",
        "Chad",
        "Chile",
        "China",
        "Colombia",
        "Congo",
        "Cook Islands",
        "Costa Rica",
        "Cote D Ivoire",
        "Croatia",
        "Cruise Ship",
        "Cuba",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Estonia",
        "Ethiopia",
        "Falkland Islands",
        "Faroe Islands",
        "Fiji",
        "Finland",
        "France",
        "French Polynesia",
        "French West Indies",
        "Gabon",
        "Gambia",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea Bissau",
        "Guyana",
        "Haiti",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kuwait",
        "Kyrgyz Republic",
        "Laos",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macau",
        "Macedonia",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Mauritania",
        "Mauritius",
        "Mexico",
        "Moldova",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Namibia",
        "Nepal",
        "Netherlands",
        "Netherlands Antilles",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger",
        "Nigeria",
        "Norway",
        "Oman",
        "Pakistan",
        "Palestine",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Reunion",
        "Romania",
        "Russia",
        "Rwanda",
        "Saint Pierre &amp; Miquelon",
        "Samoa",
        "San Marino",
        "Satellite",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Slovakia",
        "Slovenia",
        "South Africa",
        "South Korea",
        "Spain",
        "Sri Lanka",
        "St Kitts &amp; Nevis",
        "St Lucia",
        "St Vincent",
        "St. Lucia",
        "Sudan",
        "Suriname",
        "Swaziland",
        "Sweden",
        "Switzerland",
        "Syria",
        "Taiwan",
        "Tajikistan",
        "Tanzania",
        "Thailand",
        "Timor L'Este",
        "Togo",
        "Tonga",
        "Trinidad &amp; Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks &amp; Caicos",
        "Uganda",
        "Ukraine",
        "United Arab Emirates",
        "United Kingdom",
        "United States",
        "Uruguay",
        "Uzbekistan",
        "Venezuela",
        "Vietnam",
        "Virgin Islands (US)",
        "Yemen",
        "Zambia",
        "Zimbabwe"
      ],
      headers: [
        { text: "Nome", value: "name" },
        { text: "Rating", value: "gph" }
      ],
      editedIndex: -1,
      editedItem: {
        id: "",
        name: "",
        gph: 3
      },
      defaultItem: {
        id: "",
        name: "",
        gph: 3
      },
      filterFields: [
        { text: "Nome", value: "name", type: "text" },
        { text: "Rating", value: "gph", type: "number" }
      ],
      filterDefs: {
        text: {
          contains: {
            display: "Contém",
            function: this.filterByTextContains
          },
          startsWith: {
            display: "Começa por",
            function: this.filterByTextStartsWith
          }
        },
        number: {
          equal: {
            display: "=",
            function: this.filterByNumberEqual,
            decimalPoint: 1
          },
          greater: {
            display: ">",
            function: this.filterByNumberGreater,
            decimalPoint: 1
          },
          less: {
            display: "<",
            function: this.filterByNumberLess,
            decimalPoint: 1
          },
          between: {
            display: "> <",
            function: this.filterByNumberBetween,
            decimalPoint: 1
          }
        },
        date: {
          equal: {
            display: "Igual",
            function: this.filterByDateEqual,
            format: "MM/DD/YYYY"
          },
          greater: {
            display: "Maior que",
            function: this.filterByDateGreater,
            format: "MM/DD/YYYY"
          },
          less: {
            display: "Menor que",
            function: this.filterByDateLess,
            format: "MM/DD/YYYY"
          },
          between: {
            display: "Entre",
            function: this.filterByDateBetween,
            format: "MM/DD/YYYY"
          }
        },
        lookup: {
          is: { display: "É", function: this.filterByLookupIs },
          isNot: { display: "Não é", function: this.filterByLookupIsNot }
        }
      },
      filterField: "",
      filterType: "",
      filterOperators: [],
      filterOperator: "",
      filterTerm: "",
      filterTerm2: "",
      filterTermMask: "",
      filterTermLabel: "",
      filterTermRules: [],
      dateFilterFormat: "MM/DD/YYYY",
      filterLookupItems: [],
      filterLookupValue: "",
      filterLookupLabel: ""
    };
  },
  computed: {
    barcos() {
      return this.$store.getters.loadedBarcos;
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
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    currentTitle() {
      switch (this.step) {
        case 1:
          return "Medidas";
        case 2:
          return "Rating";
        default:
          return "Polares";
      }
    },
    filteredBarcos() {
      if (
        this.filterField &&
        this.filterOperator &&
        (this.filterTerm || this.filterLookupValue)
      ) {
        const filterFunction = this.filterDefs[this.filterType][
          this.filterOperator
        ]["function"];
        if (this.filterType === "number") {
          const decimalPoint =
            this.filterDefs[this.filterType][this.filterOperator][
              "decimalPoint"
            ] || 0;
          if (this.filterOperator === "between") {
            if (this.filterTerm && this.filterTerm2) {
              return filterFunction(
                this.barcos,
                this.filterField,
                this.filterTerm,
                this.filterTerm2,
                decimalPoint
              );
            } else {
              return this.barcos;
            }
          } else {
            return filterFunction(
              this.barcos,
              this.filterField,
              this.filterTerm,
              decimalPoint
            );
          }
        } else if (this.filterType === "date") {
          const format =
            this.filterDefs[this.filterType][this.filterOperator]["format"] ||
            this.dateFilterFormat;
          if (
            this.filterOperator === "between" &&
            this.rulesIsValidDate(this.filterTerm) &&
            this.rulesIsValidDate(this.filterTerm2)
          ) {
            return filterFunction(
              this.barcos,
              this.filterField,
              this.filterTerm,
              this.filterTerm2,
              format
            );
          } else if (
            this.filterOperator !== "between" &&
            this.rulesIsValidDate(this.filterTerm)
          ) {
            return filterFunction(
              this.barcos,
              this.filterField,
              this.filterTerm,
              format
            );
          } else {
            return this.barcos;
          }
        } else if (this.filterType === "lookup") {
          return filterFunction(
            this.barcos,
            this.filterField,
            this.filterLookupValue
          );
        } else {
          return filterFunction(this.barcos, this.filterField, this.filterTerm);
        }
      } else {
        return this.barcos;
      }
    }
  },
  watch: {
    filterField(newValue) {
      const filterType = this.filterFields.find(item => item.value === newValue)
        .type;
      if (filterType) {
        this.filterType = filterType;
        this.filterOperators = this.getFilterOperators(
          this.filterDefs[filterType]
        );
        this.filterOperator = this.filterOperators[0]["value"];
        this.clearFilterTerms();
      } else {
        this.filterType = "";
        this.filterOperators = [];
        this.filterOperator = "";
        this.clearFilterTerms();
      }
    },
    filterOperator() {
      this.clearFilterTerms();
      if (this.filterType === "text") {
        this.filterTermMask = "";
        this.filterTermLabel = "Filter";
      } else if (this.filterType === "number") {
        if (this.filterField === "gph") {
          this.filterTermMask = "###.##";
          this.filterTermLabel = "###.##";
        } else if (this.filterField === "zip") {
          this.filterTermMask = "#####";
          this.filterTermLabel = "#####";
        } else {
          this.filterTermMask = "######";
          this.filterTermLabel = "######";
        }
      } else if (this.filterType === "date") {
        this.filterTermMask = "##/##/####";
        this.filterTermLabel = "MM/DD/YYYY";
        this.filterTermRules = [this.rulesIsValidDate];
      } else if (this.filterType === "lookup") {
        let lookupItems = [];
        if (this.filterField === "country") {
          lookupItems = this.paises;
          this.filterLookupLabel = "Pais";
        }
        this.filterLookupItems = lookupItems;
        this.filterLookupValue = "";
      }
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.barcos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.barcos.indexOf(item);
      confirm("Tem a certeza que quer apagar este user?") &&
        this.barcos.splice(index, 1);
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
        Object.assign(this.barcos[this.editedIndex], this.editedItem);
      } else {
        this.barcos.push(this.editedItem);

        //this.onSaveUser();
      }
      this.close();
    },
    onSair() {
      this.$router.push("/");
    },
    getFilterOperators(filterDef) {
      let oprs = [];
      if (filterDef) {
        for (let key in filterDef) {
          oprs.push({ text: filterDef[key]["display"], value: key });
        }
      }
      return oprs;
    },
    clearFilterTerms() {
      this.filterTerm = "";
      this.filterTerm2 = "";
      this.filterTermMask = "";
      this.filterTermLabel = "Filter";
      this.filterTermRules = [];
      this.filterLookupValue = "";
      this.filterLookupItems = [];
      this.filterLookupLabel = "";
    },
    rulesIsValidDate(value) {
      return moment(value, this.dateFilterFormat, true).isValid();
    },
    // ---------- Events ------------------------
    onClearAllFilters() {
      this.filterField = "name";
    },
    // ---------- field filter methods ----------
    filterByTextContains(list, fieldName, fieldValue) {
      const re = new RegExp(fieldValue, "i");
      return this.filterByRegExp(list, fieldName, fieldValue, re);
    },
    filterByTextStartsWith(list, fieldName, fieldValue) {
      const re = new RegExp("^" + fieldValue, "i");
      return this.filterByRegExp(list, fieldName, fieldValue, re);
    },
    filterByRegExp(list, fieldName, fieldValue, regExp) {
      return list.filter(item => {
        if (item[fieldName] !== undefined) {
          return regExp.test(item[fieldName]);
        } else {
          return true;
        }
      });
    },
    filterByNumberEqual(list, fieldName, fieldValue, decimalPoint) {
      decimalPoint = decimalPoint || 0;
      return list.filter(item => {
        if (item[fieldName] !== undefined) {
          return (
            Number(item[fieldName]).toFixed(decimalPoint) ===
            Number(fieldValue).toFixed(decimalPoint)
          );
        } else {
          return true;
        }
      });
    },
    filterByNumberGreater(
      list,
      fieldName,
      fieldValue,
      floatPoint,
      decimalPoint
    ) {
      decimalPoint = decimalPoint || 0;
      return list.filter(item => {
        if (item[fieldName] !== undefined) {
          return (
            Number(item[fieldName]).toFixed(decimalPoint) >
            Number(fieldValue).toFixed(decimalPoint)
          );
        } else {
          return true;
        }
      });
    },
    filterByNumberLess(list, fieldName, fieldValue, decimalPoint) {
      decimalPoint = decimalPoint || 0;
      return list.filter(item => {
        if (item[fieldName] !== undefined) {
          return (
            Number(item[fieldName]).toFixed(decimalPoint) <
            Number(fieldValue).toFixed(decimalPoint)
          );
        } else {
          return true;
        }
      });
    },
    filterByNumberBetween(
      list,
      fieldName,
      fieldValue1,
      fieldValue2,
      decimalPoint
    ) {
      decimalPoint = decimalPoint || 0;
      return list.filter(item => {
        if (item[fieldName] !== undefined) {
          return (
            Number(item[fieldName]).toFixed(decimalPoint) >=
              Number(fieldValue1).toFixed(decimalPoint) &&
            Number(item[fieldName]).toFixed(decimalPoint) <=
              Number(fieldValue2).toFixed(decimalPoint)
          );
        } else {
          return true;
        }
      });
    },
    filterByDateEqual(list, fieldName, fieldValue, format) {
      format = format || this.dateFilterFormat;
      return list.filter(item => {
        if (item[fieldName] !== undefined) {
          return moment(item[fieldName]).isSame(
            moment(fieldValue, format),
            "day"
          );
        } else {
          return true;
        }
      });
    },
    filterByDateGreater(list, fieldName, fieldValue, format) {
      format = format || this.dateFilterFormat;
      return list.filter(item => {
        if (item[fieldName] !== undefined) {
          return moment(item[fieldName]).isAfter(
            moment(fieldValue, format),
            "day"
          );
        } else {
          return true;
        }
      });
    },
    filterByDateLess(list, fieldName, fieldValue, format) {
      format = format || this.dateFilterFormat;
      return list.filter(item => {
        if (item[fieldName] !== undefined) {
          return moment(item[fieldName]).isBefore(
            moment(fieldValue, format),
            "day"
          );
        } else {
          return true;
        }
      });
    },
    filterByDateBetween(list, fieldName, fieldValue1, fieldValue2, format) {
      format = format || this.dateFilterFormat;
      return list.filter(item => {
        if (item[fieldName] !== undefined) {
          return moment(item[fieldName]).isBetween(
            moment(fieldValue1, format),
            moment(fieldValue2, format),
            "day",
            "[]"
          );
        } else {
          return true;
        }
      });
    },
    filterByLookupIs(list, fieldName, fieldValue) {
      return list.filter(item => {
        if (item[fieldName] !== undefined) {
          return item[fieldName] === fieldValue;
        } else {
          return true;
        }
      });
    },
    filterByLookupIsNot(list, fieldName, fieldValue) {
      return list.filter(item => {
        if (item[fieldName] !== undefined) {
          return item[fieldName] !== fieldValue;
        } else {
          return true;
        }
      });
    },
    created() {
      this.filterField = "name";
    }
    /* onSaveUser() {
      const userData = {
        name: this.editedItem.name,
        email: this.editedItem.email,
        password: this.editedItem.password,
        country: this.editedItem.country,
        nivel: this.editedItem.nivel
      };
      this.$store.dispatch("updateUser", userData);
      this.dialog = false;
      this.$router.push("/profile");
    } */
  }
};
</script>
