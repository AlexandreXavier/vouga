<template>
<div id="#app">
  <MglMap id='map-container'
  :accessToken="accessToken"
  :mapStyle="mapStyle"
  @load="onMapLoad"
  >
        <MglNavigationControl/>
        <MglMarker :coordinates="coordinates" color='red'>
            <MglPopup>
                <VCard>
                <div>Regata!</div>
                </VCard>
            </MglPopup>
        </MglMarker>

       <!--  <MglMarker :coordinates.sync="coordinates" color='red'/>
        <MglMarker :coordinates.sync='coordinates' draggable color='green'/>
        <MglMarker :coordinates.sync='coordinates' color='blue'/> -->
  </MglMap>

</div>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglNavigationControl, MglPopup, MglMarker } from "vue-mapbox";

/* const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        message: "Desmark",
        iconSize: [20, 20]
      },
      geometry: {
        type: "Point",
        coordinates: [-8.8683, 40.15]
      }
    },
    {
      type: "Feature",
      properties: {
        message: "Boia",
        iconSize: [20, 20]
      },
      geometry: {
        type: "Point",
        coordinates: [-8.8663, 40.15]
      }
    },
    {
      type: "Feature",
      properties: {
        message: "Baz",
        iconSize: [20, 20]
      },
      geometry: {
        type: "Point",
        coordinates: [-8.8683, 40.25]
      }
    }
  ]
}; */

export default {
  components: {
    MglMap,
    MglNavigationControl,
    MglMarker,
    MglPopup
  },
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoicG9ydG9jYXJvZG9zIiwiYSI6ImNqd3RxcGpxNjI2MmEzeWxlc3NwaHZxdGMifQ._c7VWyMFDHUH5HMUiBCVhA",
      mapStyle: "mapbox://styles/portocarodos/cjwv4icc90h471cmwmnpfpjbt",
      coordinates: [-9.317, 38.6745]
    };
  },
  computed: {},
  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  },
  methods: {
    setMap(map) {
      // the map object can be manipulated as directly
      // e.g. for adding events and controls
      this.map = map;
    },
    async onMapLoad(event) {
      // Here we cathing 'load' map event
      const asyncActions = event.component.actions;

      const newParams = await asyncActions.flyTo({
        center: [-9.417, 38.6945],
        zoom: 12,
        bearing: 1,
        pitch: 17
      });
      console.log(newParams);
    }
  }
};
</script>

<style scoped>
#map-container {
  position: absolute;
  top: 20;
  left: 0;
  height: 100%;
  width: 100%;
}
</style>

