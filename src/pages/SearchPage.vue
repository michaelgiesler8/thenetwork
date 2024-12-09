<script setup>
import { ref, computed } from 'vue'
import { AppState } from '../AppState'
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
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8 mx-auto mb-4">
        <form @submit.prevent="search" class="d-flex gap-2">
          <input
            v-model="query"
            type="text"
            class="form-control"
            placeholder="Search profiles and posts..."
            required
          />
          <button
            class="btn btn-primary"
            type="submit"
            :disabled="isLoading"
          >
            <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
            Search
          </button>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <ul class="nav nav-tabs mb-3">
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: activeTab === 'profiles' }"
              @click.prevent="activeTab = 'profiles'"
              href="#"
            >
              Profiles ({{ filteredResults.length }})
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: activeTab === 'posts' }"
              @click.prevent="activeTab = 'posts'"
              href="#"
            >
              Posts ({{ posts.length }})
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="row">
      <div class="col-md-8">
        <div v-if="activeTab === 'profiles'">
          <div class="d-flex justify-content-end mb-3">
            <div class="form-check">
              <input
                v-model="showAlumniOnly"
                class="form-check-input"
                type="checkbox"
                id="alumniFilter"
              >
              <label class="form-check-label" for="alumniFilter">
                Show Alumni Only
              </label>
            </div>
          </div>
          <div v-if="filteredResults.length" class="profiles-grid">
            <ProfileCard
              v-for="profile in filteredResults"
              :key="profile.id"
              :profile="profile"
            />
          </div>
          <p v-else class="text-center">No profiles found.</p>
        </div>

        <div v-if="activeTab === 'posts'">
          <div v-if="posts.length">
            <PostCard
              v-for="post in posts"
              :key="post.id"
              :post="post"
            />
          </div>
          <p v-else class="text-center">No posts found.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profiles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.nav-link {
  cursor: pointer;
}

</style>
