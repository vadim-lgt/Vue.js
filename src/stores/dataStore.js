import { defineStore } from 'pinia';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useDataStore = defineStore('data', {
  state: () => ({
    players: [],
    players_total: null,
    matches: [],
    matches_total: null,
    errorMessage: "",
  }),
  actions: {
    // Игроки
    async get_players(page = 0, perpage = 5) {
      try {
        this.errorMessage = "";
        const response = await axios.get(`${backendUrl}/players`, {
          params: { page, perpage },
        });
        this.players = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
        } else if (error.request) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = error.message;
        }
        console.log(error);
      }
    },
    async get_players_total() {
      try {
        this.errorMessage = "";
        const response = await axios.get(`${backendUrl}/players_total`);
        this.players_total = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
        } else if (error.request) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = error.message;
        }
        console.log(error);
      }
    },

    // Матчи
    async get_matches(page = 0, perpage = 5) {
      try {
        this.errorMessage = "";
        const response = await axios.get(`${backendUrl}/matches`, {
          params: { page, perpage },
        });
        this.matches = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
        } else if (error.request) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = error.message;
        }
        console.log(error);
      }
    },
    async get_matches_total() {
      try {
        this.errorMessage = "";
        const response = await axios.get(`${backendUrl}/matches_total`);
        this.matches_total = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
        } else if (error.request) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = error.message;
        }
        console.log(error);
      }
    },
  },
});
