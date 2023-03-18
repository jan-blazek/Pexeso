<template>
  <h1>PEXESO</h1>
  <!--Popočet řádků-->
  Počet řádků:
  <select v-model="rows" name="radky">
    <option value="2">2</option>
    <option value="4" selected="">4</option>
    <option value="6">6</option>
    <option value="8">8</option>
  </select>

  <!--Popočet sloupců-->
  Počet sloupců:
  <select v-model="cols" name="sloupce">
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4" selected="">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
  </select>

  <br><br>

  <div id="hraci_plocha">
    <template v-for="index in rows" :key="index">
      <template v-for="col in cols" :key="col">
        <vue-card />
      </template>
      <br>
    </template>
  </div>

  <br>
  <table>
    <tr>
      <td>Správně:</td>
      <td>&nbsp;&nbsp;<span id="body_spravne">0</span></td>
    </tr>
    <tr>
      <td>Špatně:</td>
      <td>&nbsp;&nbsp;<span id="body_spatne">0</span></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>Úspěšnost:</td>
      <td>&nbsp;&nbsp;<span id="body_uspesnost">0.0%</span></td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import VueCard from "@/components/vue-card.vue";
import {ref} from "vue";

const rows = ref(4);
const cols = ref(4);
</script>

<style scoped>
</style>
