import { Weather } from "@/@types/weatherData";
import { WeatherStore } from "@/@types/store";

function saveToLocalStorage(state: WeatherStore) {
  window.localStorage.setItem("weatherData", JSON.stringify(state.data));
}

export function add(state: WeatherStore, payload: Weather) {
  state.data.push(payload);
  saveToLocalStorage(state);
}

export function refresh(state: WeatherStore, payload: Weather) {
  const item = state.data.find(value => value.id === payload.id);
  Object.assign(item, payload);
  saveToLocalStorage(state);
}

export function remove(state: WeatherStore, payload: number) {
  state.data.splice(payload, 1);
  saveToLocalStorage(state);
}

export { saveToLocalStorage };

export function loadFromLocalStorage(state: WeatherStore) {
  const savedData = window.localStorage.getItem("weatherData");
  if (savedData) {
    state.data = JSON.parse(savedData);
  }
}
