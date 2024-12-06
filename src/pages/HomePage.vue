<script setup>
import { onMounted } from 'vue';
import { postsService } from "../services/PostsService.js";
import { adsService } from "../services/AdsService.js";
import { AppState } from '../AppState.js';
import { computed } from 'vue';
import Pop from '../utils/Pop.js'
import PostCard from '../components/PostCard.vue';
import AdCard from '../components/AdCard.vue';

const posts = computed(() => AppState.posts)
const ads = computed(() => AppState.ads)

async function loadPosts() {
  try {
    await postsService.getPosts()
  } catch (error) {
    Pop.error(error);
  }
}

async function loadAds() {
  try {
    await adsService.getAds(2)
  } catch (error) {
    Pop.error(error)
  }
}

onMounted(async () => {
  await loadPosts()
  await loadAds()
})
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
        <div class="posts-container">
          <PostCard
            v-for="post in posts"
            :key="post.id"
            :post="post"
          />
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="ads-container">
          <AdCard
            v-for="ad in ads"
            :key="ad.id"
            :ad="ad"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.posts-container {
  display: flex;
  flex-direction: column;
  gap: 1rem
}

.ads-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 1rem;
}
</style>
