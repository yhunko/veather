<template>
  <div v-if="data" class="d-flex justify-center full-report">
    <v-card class="card" :dark="data.weather[0].icon.endsWith('n')">
      <v-img
        height="256"
        src="https://source.unsplash.com/random/1600x900?city,landscape"
        lazy-src
      />

      <div class="pa-3 pa-md-6">
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="d-flex align-center gap-1 headline">
              <v-icon>
                mdi-city
              </v-icon>
              <span>
                {{ data.name }},
                {{ data.sys.country }}
              </span>
            </v-list-item-title>
            <v-list-item-subtitle>
              {{
                date.formatDistanceToNow(date.fromUnixTime(data.dt), {
                  addSuffix: true
                })
              }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon>
            <v-btn @click="refresh()" color="primary" icon>
              <v-icon>
                mdi-refresh
              </v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>

        <v-divider class="mb-3 mt-1" />

        <v-card-text>
          <v-row align="center" justify="space-around" class="gap-3">
            <div class="d-flex align-center gap-1">
              <v-img
                :src="
                  `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                "
                width="64"
              />
              <span class="display-3">
                {{ Number(data.main.temp).toFixed(1) }}&deg;C
              </span>
            </div>
            <div class="d-flex flex-column">
              <span>{{ data.weather[0].main }}</span>
              <span>
                {{ Number(data.main.temp_min).toFixed(1) }}&deg;C /
                {{ Number(data.main.temp_max).toFixed(1) }}&deg;C
              </span>
              <span>
                Feels like {{ Number(data.main.feels_like).toFixed(1) }}&deg;C
              </span>
            </div>
          </v-row>
        </v-card-text>

        <v-divider class="my-4" />

        <v-row align="center" justify="space-around" class="gap-2">
          <v-col class="d-flex flex-column align-center">
            <v-icon>mdi-weather-windy</v-icon>
            <span>{{ data.wind.speed }} km/h</span>
          </v-col>

          <v-col class="d-flex flex-column align-center">
            <v-icon>mdi-weather-cloudy</v-icon>
            <span>{{ data.clouds.all }}%</span>
          </v-col>

          <v-col class="d-flex flex-column align-center">
            <v-icon>mdi-water-percent</v-icon>
            <span>{{ data.main.humidity }}%</span>
          </v-col>
        </v-row>

        <v-divider class="my-4" />

        <v-row
          v-if="forecast"
          align="center"
          justify="space-around"
          class="gap-2"
        >
          <v-col
            v-for="(item, index) in forecast"
            class="d-flex flex-column align-center"
            :key="index"
          >
            <span>
              {{ date.format(date.fromUnixTime(item.dt), "d LLL") }}
            </span>
            <span>
              {{ date.format(date.fromUnixTime(item.dt), "hh:mm") }}
            </span>
            <v-img
              :src="
                `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
              "
              width="32"
            />
            <span> {{ item.main.temp }}&deg;C </span>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import axios from "@/modules/axios";
import { format, fromUnixTime, formatDistanceToNow } from "date-fns";

export default Vue.extend({
  name: "FullReport",
  data() {
    return {
      data: null,
      forecast: null,
      // geo: null,
      date: {
        format,
        fromUnixTime,
        formatDistanceToNow
      }
    };
  },
  async created() {
    await this.refresh();
    await this.getForecast();
  },
  methods: {
    async refresh() {
      const { status, data } = await axios.get(
        `/weather/?id=${this.$route.params.id}&units=metric`
      );
      if (status === 200) {
        this.data = data;
      }
    },
    async getForecast() {
      const { status, data } = await axios.get(
        `/forecast?id=${this.$route.params.id}`,
        {
          params: {
            units: "metric",
            cnt: 5
          }
        }
      );
      if (status === 200) {
        this.forecast = data.list;
      }
    }
  }
});
</script>

<style lang="scss">
.full-report .card {
  @media only screen and (min-width: 992px) {
    width: 60vw;
  }
}
</style>
