<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="card">
    <div class="card-body">
      <p>{{ post.body }}</p>
      <small>By: {{  post.creator.name }}</small>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>