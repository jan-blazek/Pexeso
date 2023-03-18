<template>
  <button
      @click="turnCard"
      :style="{ backgroundColor: cardColor }"
  >
    {{isShown ? value : "x"}}
  </button>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";

const props = defineProps({
  value: { type: Number, required: true },
});
const emit = defineEmits(["turn"]);

const isShown = ref(false);
const isFound = ref(false);

const cardColor = computed(() => {
  const shownCardColor = "#f97196";
  const hiddenCardColor = "#008CBA";
  const foundCardColor = '#4CAF50'

  if (isFound.value) {
    return foundCardColor;
  } else if (isShown.value) {
    return shownCardColor;
  } else {
    return hiddenCardColor;
  }
});

function turnCard() {
  emit("turn", props.value, isShown, isFound);
}
</script>

<style scoped>
</style>
