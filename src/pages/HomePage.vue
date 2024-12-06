<script setup>
import { onMounted } from 'vue';
import { postsService } from "../services/PostsService.js";
import { adsService } from "../services/AdsService.js";
import { AppState } from '../AppState';
import { computed } from 'vue';
import PostCard from '../components/PostCard.vue';
import AdCard from '../components/AdCard.vue';

const posts = computed(() => AppState.posts)
const ads = computed(() => AppState.ads)

onMounted(async () => {
  try {
    await postsService.getPosts()
    await adsService.getAds()
    console.log('Posts:', AppState.posts)
    console.log('Ads:', AppState.ads)
  } catch (error) {
    console.error('Error loading data:', error)
  }
})
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
        <div v-if="posts.length">
          <p>Total Posts: {{ posts.length }}</p>
          <pre>{{  posts }}</pre>
        </div>
        <p v-else>No posts found.</p>
      </div>
      <div class="col-md-4">
        <div v-if="ads.length">
          <p>Total Ads: {{ ads.length }}</p>
          <pre>{{ ads }}</pre>
        </div>
        <p v-else>No ads found.</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
