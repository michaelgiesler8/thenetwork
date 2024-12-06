<script setup>
import { onMounted, ref, computed } from 'vue'
import { AppState } from '../AppState.js'
import { postsService } from '../services/PostsService.js'
import { adsService } from '../services/AdsService.js'
import PostCard from '../components/PostCard.vue'
import AdCard from '../components/AdCard.vue'
import PostForm from '../components/PostForm.vue'
import Pop from '../utils/Pop.js'

const account = computed(() => AppState.account)
const posts = computed(() => AppState.posts)
const ads = computed(() => AppState.ads)
const nextPage = computed(() => AppState.nextPage)
const previousPage = computed(() => AppState.previousPage)
const isLoading = ref(false)

async function getPosts(url = null) {
  try {
    isLoading.value = true
    await postsService.getPosts(url)
  } catch (error) {
    Pop.error(error);
  } finally {
    isLoading.value = false
  }
}

async function getAds() {
  try {
    await adsService.getAds()
  } catch (error) {
    Pop.error(error)
  }
}

onMounted(async () => {
  await getPosts()
  await getAds()
})
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
        <PostForm v-if="account" />
        <div class="posts-section">
          <PostCard v-for="post in posts" :key="post.id" :post="post" />
          
          <div class="d-flex justify-content-between align-items-center my-3">
            <button
              v-if="previousPage"
              @click="getPosts(previousPage)"
              :disabled="isLoading"
              class="btn btn-primary"
            >
              <i class="mdi mdi-arrow-left"></i>
              Newer Posts
            </button>

            <button
              v-if="nextPage"
              @click="getPosts(nextPage)"
              :disable="isLoading"
              class="btn btn-primary ms-auto"
            >
              Older Posts
              <i class="mdi mdi-arrow-right"></i>
            </button>
          </div>

          <div v-if="isLoading" class="d-flex justify-content-center my-3">
            <div class="spinner=border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="sticky-top pt-3">
          <AdCard v-for="ad in ads" :key="ad.id" :ad="ad" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.posts-section {
  margin-top: 2rem;
}

.sticky-top {
  top: 80px;
}
</style>
