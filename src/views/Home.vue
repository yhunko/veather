<template>
  <div class="home">
    <v-text-field
      v-model="cityToAdd"
      @click:append-outer="addCity"
      label="Type the city name to add"
      prepend-icon="mdi-city"
      append-outer-icon="mdi-magnify"
      class="mx-3 mx-md-16"
    />

    <div
      v-if="this.$store.state.weather.data.length"
      class="cards-container mx-3 mx-md-6"
    >
      <v-card
        v-for="({
          id,
          name,
          weather,
          dt,
          wind: { speed: windSpeed },
          clouds: { all: clouds },
          main: { temp },
          sys: { country }
        },
        index) in this.$store.state.weather.data"
        :key="index"
        :dark="weather[0].icon.endsWith('n')"
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="d-flex align-center headline">
              <v-icon class="mr-2">
                mdi-map-marker
              </v-icon>
              {{ name }}, {{ country }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ weather[0].main }}, updated
              {{
                date.formatDistanceToNow(date.fromUnixTime(dt), {
                  addSuffix: true
                })
              }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon @click="refreshWeatherData(id)" color="primary">
              mdi-refresh
            </v-icon>
          </v-list-item-icon>
        </v-list-item>

        <v-card-text>
          <v-row align="center">
            <v-col class="display-3">
              {{ Number(temp).toFixed(1) }}&deg;C
            </v-col>
            <v-col align-self="center">
              <v-img
                :src="
                  `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
                "
                width="100"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-weather-windy</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle> {{ windSpeed }} km/h </v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-cloud</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>{{ clouds }}%</v-list-item-subtitle>
        </v-list-item>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="primary" :to="`/full/${id}`" text>
            Full Report
          </v-btn>

          <v-spacer />

          <v-btn @click="removeCity(index)" color="error" icon>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import axios from "@/modules/axios";
import { fromUnixTime, formatDistanceToNow } from "date-fns";

import { Weather } from "@/@types/weatherData";

export default Vue.extend({
  name: "Home",
  data() {
    return {
      cityToAdd: "",
      date: {
        fromUnixTime,
        formatDistanceToNow
      }
    };
  },
  created() {
    this.$store.commit("weather/loadFromLocalStorage");
  },
  methods: {
    async addCity() {
      if (this.cityToAdd) {
        const { status, data } = await axios.get(
          `/weather?q=${this.cityToAdd}&units=metric`
        );
        if (
          status === 200 &&
          !this.$store.state.weather.data.find(
            (cityData: Weather) => cityData.id === data.id
          )
        ) {
          console.log(data);
          this.$store.commit("weather/add", data);
        }
        this.cityToAdd = "";
      }
    },
    async refreshWeatherData(id: Weather["id"]) {
      const { status, data } = await axios.get(
        `/weather?id=${id}&units=metric`
      );
      if (status === 200) {
        this.$store.commit("weather/refresh", data);
      }
    },
    removeCity(index: number) {
      this.$store.commit("weather/remove", index);
    }
  }
});
</script>

<style lang="scss">
.cards-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
