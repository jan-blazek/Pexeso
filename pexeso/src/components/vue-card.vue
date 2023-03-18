<template>
  <button :value="value">x</button>
</template>

<script setup lang="ts">
const props = defineProps({
  value: { type: Number, required: true },
});

</script>

<style scoped>
</style>
