<script setup>
defineProps({
  ad: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <!-- FIXME add https:// to the beginning of the linkURL here -->
  <a :href="ad.linkURL" target="_blank" class="text-decoration-none">
    <div class="card elevation-2 mb-3">
      <img :src="ad.tall" :alt="ad.title" class="ad-image">
      <div class="card-footer text-center">
        <h6 class="mb-0 text-dark">{{ ad.title }}</h6>
      </div>
    </div>
  </a>
</template>

<style scoped lang="scss">
.ad-image {
  width: 100%;
  object-fit: cover;
  aspect-ratio: 3/4;
}
</style>