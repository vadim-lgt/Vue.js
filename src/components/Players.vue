<template>
  <DataTable
    :value="players"
    :lazy="true"
    :loading="dataStore.loading"
    :paginator="true"
    :rows="perpage"
    :rowsPerPageOptions="[2, 5, 10]"
    :totalRecords="players_total"
    @page="onPageChange"
    responsive-layout="scroll"
    :laading="true"
    :first="offset"
  >
    <Column field="id" header="ID"/>
    <Column field="Full_name" header="Имя игрока"/>
    <Column field="role" header="Амплуа"/>
    <Column field="team_name" header="Команда"/>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useDataStore} from '@/stores/dataStore';

export default {
  name: "PlayersTable",
  components: {DataTable, Column},
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    }
  },
  computed: {
    players() {
      return this.dataStore.players;
    },
    players_total() {
      return this.dataStore.players_total;
    }
  },
  mounted() {
    console.log('players component MOUNTED!');
    this.dataStore.get_players();
    this.dataStore.get_players_total();
    console.log('players=', this.players);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_players(this.offset / this.perpage, this.perpage);
    }
  }
}
</script>
<style scoped>
</style>



