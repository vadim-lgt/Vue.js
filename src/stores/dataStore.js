import { defineStore } from 'pinia';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const useDataStore = defineStore('data', {
  state: () => ({
    players: [],
    players_total: null,
    matches: [],
    matches_total: null,
    errorCode: "",
    errorMessage: "",
  }),

  actions: {
    // Игроки
    async get_players(page = 0, perpage = 5) {
      this.errorMessage = "";
      try {
        const response = await axios.get(`${backendUrl}/players`, {
          params: { page, perpage },
        });
        this.players = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },

    async get_players_total() {
      this.errorMessage = "";
      try {
        const response = await axios.get(`${backendUrl}/players_total`);
        this.players_total = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },

    // Матчи
    async get_matches(page = 0, perpage = 5) {
      this.errorMessage = "";
      try {
        const response = await axios.get(`${backendUrl}/matches`, {
          params: { page, perpage },
        });
        this.matches = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },

    async get_matches_total() {
      this.errorMessage = "";
      try {
        const response = await axios.get(`${backendUrl}/matches_total`);
        this.matches_total = response.data;
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorMessage = error.message;
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },

    async create_match(formData) {
      this.errorMessage = "";
      this.errorCode = "";

      try {
        const response = await axios.post(`${backendUrl}/matches`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        this.errorCode = response.data.code;
        this.errorMessage = response.data.message ?? "";
      } catch (error) {
        if (error.response) {
          this.errorCode = 11;
          this.errorMessage = error.response.data.message;
          console.log(error);
        } else if (error.request) {
          this.errorCode = 12;
          this.errorMessage = error.message;
          console.log(error);
        } else {
          this.errorCode = 13;
          console.log(error);
        }
      }
    }
  },
});
