<script setup>
import { onMounted, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
import { profilesService } from '../services/ProfilesService.js'
import { postsService } from '../services/PostsService.js'
import Pop from '../utils/Pop.js'
import ProfileDetails from '../components/ProfileDetails.vue'
import PostCard from '../components/PostCard.vue'
import PostForm from '../components/forms/PostForm.vue'

const route = useRoute()
const profile = computed(() => AppState.activeProfile)
const posts = computed (() => AppState.posts)
const account = computed(() => AppState.account)

async function getProfileDetails() {
  try {
    const profileId = route.params.id
    await profilesService.getProfile(profileId)
    await postsService.getPostsByProfile(profileId)
  } catch (error) {
    Pop.error(error)
  }
}

watchEffect(() => {
  if (route.params.id) {
    getProfileDetails()
  }
})

</script>

<template>
  <div class="container">
    <div v-if="profile">
      <p>Profile loaded:</p>
      <pre>{{  profile }}</pre>
    </div>
    <p v-else>No profile loaded.</p>
  </div>
</template>

<style scoped lang="scss">
</style>