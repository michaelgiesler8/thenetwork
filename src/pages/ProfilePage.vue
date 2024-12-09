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
  <div class="container-fluid">
    <div v-if="profile" class="row">
      <div class="col-12">
        <ProfileDetails :profile="profile" />
      </div>

      <div class="row mt-4">
        <div class="col-md-8">
          <PostForm v-if="account?.id === profile?.id" />
          <div v-for="post in posts" :key="post.id">
            <PostCard :post="post" />
          </div>
        </div>

        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5>Links🔗</h5>
              <div v-if="profile.github" class="d-flex align-items-center gap-2 mb-2">
                <i class="mdi mdi-github"></i>
                <a :href="profile.github" target="_blank">Github</a>
              </div>
              <div v-if="profile.linkedin" class="d-flex align-items-center gap-2 mb-2">
                <i class="mdi mdi-linkedin"></i>
                <a :href="profile.linkedin" target="_blank">LinkedIn</a>
              </div>
              <div v-if="profile.resume" class="d-flex align-items-center gap-2">
                <i class="mdi mdi-file-document"></i>
                <a :href="profile.resume" target="_blank">resume</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- FIXME add in page navigation functionality here, make sure you hit the correct endpoint for navigating to the second page of profile posts 'api/profiles/:profileId/posts?page=2' -->
</template>

<style scoped lang="scss">
</style>