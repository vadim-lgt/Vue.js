<template>
  <div class="flex justify-center">
    <form @submit.prevent="createMatch" class="w-1/2 p-6">
      <h2 class="text-2xl mb-4 text-center" style="color: dimgrey">Добавление матча</h2>

      <div class="flex flex-col mb-4">
        <select v-model="com1_id" class="p-inputtext" required>
          <option value="" disabled selected>Выберите первую команду</option>
          <option value="1">Аргентина</option>
          <option value="2">Хорватия</option>
          <option value="3">Марокко</option>
          <option value="4">Франция</option>
        </select>
      </div>

      <div class="flex flex-col mb-4">
        <select v-model="com2_id" class="p-inputtext" required>
          <option value="" disabled selected>Выберите вторую команду</option>
          <option value="1">Аргентина</option>
          <option value="2">Хорватия</option>
          <option value="3">Марокко</option>
          <option value="4">Франция</option>
        </select>
      </div>

      <div class="mb-4 mt-4">
        <label
          for="file"
          id="file-label"
          class="block text-md font-medium text-gray-500 border border-gray-300 rounded-md p-2"
        >
          <span class="pi pi-upload mx-3"></span>Выбрать изображение
        </label>
        <input type="file" hidden id="file" name="file" v-on:change="changeCaption" required accept="image/*" />
      </div>

      <div class="flex flex-col mt-6">
        <Button type="submit" label="Создать" />
      </div>
    </form>
  </div>

  <Toast position="bottom-right" />
</template>

<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useDataStore } from "@/stores/dataStore.js";
import Toast from "primevue/toast";

export default {
  name: "CreateMatch",
  components: { InputText, Button, Toast },

  data() {
    return {
      dataStore: useDataStore(),
      com1_id: "",
      com2_id: "",
      matchImage: null,
    };
  },

  computed: {
    errorMessage() {
      return this.dataStore.errorMessage;
    },
    errorCode() {
      return this.dataStore.errorCode;
    },
  },

  methods: {
    changeCaption(event) {
      const file = event.target.files[0];

      if (file) {
        document.getElementById("file-label").innerHTML =
          '<span class="pi pi-file mx-3"></span>' + file.name;
        this.matchImage = file;
      } else {
        document.getElementById("file-label").innerHTML =
          '<span class="pi pi-upload mx-3"></span>Выбрать изображение';
        this.matchImage = null;
      }
    },

    async createMatch() {
      const formData = new FormData();

      formData.append("com1_id", this.com1_id);
      formData.append("com2_id", this.com2_id);
      formData.append("image", this.matchImage);

      await this.dataStore.create_match(formData);

      if (this.errorCode > 0)
        this.$toast.add({severity: "error", summary: "Ошибка добавления данных", detail: this.errorMessage, life: 4000});
      else
        this.$toast.add({severity: "success", summary: "Данные успешно добавлены", detail: this.errorMessage, life: 4000});
    },
  },
};
</script>

<style scoped></style>
