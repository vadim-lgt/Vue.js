<template>
  <DataTable
    :value="matches"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords="matches_total"
    @page="onPageChange"
    responsive-layout="scroll"
    :first="offset"
  >
    <Column field="id" header="ID"/>
    <Column field="team1_name" header="Команда 1"/>
    <Column field="team2_name" header="Команда 2"/>
    <!--    <Column field="com1_id" header="1 команда"/>-->
    <!--    <Column field="com2_id" header="2 команда"/>-->
    <!--    ЭТО БЕЗ ОТОБОРАЖЕНИЯ НАИМЕНОВАНИЙ КОМАНД, ТОЛЬКО ПО ID-->
    <Column header="Фото">
      <template #body="slotProps">
        <img v-if="slotProps.data.picture_url"
             :src="slotProps.data.picture_url"
             alt="Изображение матча"
             class="max-h-32 max-w-32 object-contain rounded bg-gray-100" />
        <span v-else>Нет изображения</span>
      </template>
    </Column>
    <template #footer v-if="authStore.isAuthenticated">
      <div class="text-end">
        <Button
          type="button"
          icon="pi pi-plus"
          label="Добавить матч"
          @click="$router.push('/createMatch')"
        />
      </div>
    </template>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import {useDataStore} from '@/stores/dataStore';
import { useAuthStore } from '@/stores/authStore.js'


export default {
  name: "MatchesTable",
  components: {Button, DataTable, Column},
  data() {
    return {
      dataStore: useDataStore(),
      authStore: useAuthStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed: {
    matches() {
      return this.dataStore.matches;
    },
    matches_total() {
      return this.dataStore.matches_total;
    }
  },
  mounted() {
    console.log('matches component MOUNTED!');
    this.dataStore.get_matches();
    this.dataStore.get_matches_total();
    console.log('Categories=', this.matches);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_matches(this.offset / this.perpage, this.perpage);
    }
  }
}
</script>

<style scoped>
</style>
