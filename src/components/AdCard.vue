<script setup>
defineProps({
  ad: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h5>{{ ad.title }}</h5>
      <img :src="ad.tall" alt="Advertisement" class="img-fluid">
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>