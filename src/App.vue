<template>
  <h1>PEXESO</h1>
  Počet řádků:
  <select v-model.number="rows" name="radky">
    <option value="2">2</option>
    <option value="4" selected="">4</option>
    <option value="6">6</option>
    <option value="8">8</option>
  </select>

  Počet sloupců:
  <select v-model.number="cols" name="sloupce">
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4" selected="">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
    <option value="7">7</option>
  </select>

  <br><br>

  <div>
    <template v-if="values.length > 0">
      <template v-for="row in rows" :key="row">
        <vue-card
            v-for="col in cols"
            :key="col"
            :value="values[(row - 1) * cols + (col - 1)]"
            @turn="turnCard"
        />
        <br>
      </template>
    </template>
  </div>

  <br>
  <table>
    <tr>
      <td>Správně:</td>
      <td>&nbsp;&nbsp;<span id="body_spravne">{{correct}}</span></td>
    </tr>
    <tr>
      <td>Špatně:</td>
      <td>&nbsp;&nbsp;<span id="body_spatne">{{wrong}}</span></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>Úspěšnost:</td>
      <td>&nbsp;&nbsp;<span id="body_uspesnost">{{successRate}}%</span></td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import VueCard from "@/components/vue-card.vue";
import {computed, onMounted, ref, watch} from "vue";
import type { Ref } from 'vue'

const rows = ref(4);
const cols = ref(4);

let values: Ref<number[]> = ref([]);

const correct = ref(0);
const wrong = ref(0);

onMounted(() => {
  generateCardValues();
})
watch(rows, () => {
  correct.value = 0;
  wrong.value = 0;
  generateCardValues();
})
watch(cols, () => {
  correct.value = 0;
  wrong.value = 0;
  generateCardValues();
})

const successRate = computed(() => {
  if (correct.value === 0 && wrong.value === 0) {
    return 0;
  }
  return Math.round((correct.value / (correct.value + wrong.value)) * 100);
})

function generateCardValues() {
  values.value = [];
  const maxCardValue = (cols.value * rows.value) / 2
  for (let x = 0; x < maxCardValue; x++) {
    values.value.push(x);
    values.value.push(x);
  }
  values.value.sort(randomSort);
}
function randomSort() {
  return 0.5 - Math.random();
}

let isTimeout = false;
let previousValue = -1;
let previousIsShown: Ref<boolean> = ref(false);
let previousIsFound: Ref<boolean> = ref(false);
function turnCard(value: number, isShown: Ref<boolean>, isFound: Ref<boolean>) {
  if (isTimeout || isFound.value) return;
  isShown.value = true;

  if (previousValue === -1) {
    previousValue = value;
    previousIsShown.value = isShown;
    previousIsFound.value = isFound;
    return;
  }

  if (value === previousValue) {
    correct.value++;

    previousIsFound.value = true;
    isFound.value = true;
  } else {
    wrong.value++;

    isTimeout = true;
    setTimeout(() => {
      previousIsShown.value = false;
      isShown.value = false;
      isTimeout = false;
    }, 1000);
  }

  previousValue = -1;
}
</script>

<style scoped>
</style>
