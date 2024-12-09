<script setup>
import { ref, computed } from 'vue'
import { AppState } from 'AppState.js'
import { postsService } from '../services/PostsService.js'
import { profilesService } from '../services/ProfilesService.js'
import Pop from '../utils/Pop.js'
import PostCard from '../components/PostCard.vue'
import ProfileCard from '../components/ProfileCard.vue'

const query = ref('')
const isLoading = ref(false)
const activeTab = ref('profiles')

const searchResults = computed(() => AppState.searchResults)
const posts = computed(() => AppState.posts)
const showAlumniOnly = ref(false)

const filteredResults = computed(() => {
  if(!showAlumniOnly.value) return searchResults.value
  return searchResults.value.filter(profile => profile.graduated)
})

async function search() {
  try {
    if (!query.value.trim()) return
    isLoading.value = true

    await Promise.all([
      profilesService.searchProfiles(query.value),
      postsService.searchPosts(query.value)
    ])
  } catch (error) {
    Pop.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="container">
    <h1>Search</h1>
  </div>
</template>

<style scoped lang="scss">
</style>