<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { profilesService } from '../services/ProfilesService.js';
import { AppState } from '../AppState.js';
import { computed } from 'vue';

const route = useRoute()
const profile = computed(() => AppState.activeProfile)

onMounted(async () => {
  try {
    await profilesService.getProfile('6582f5bc24ce93f904f77393')
    console.log('Profile:', AppState.activeProfile)
  } catch (error) {
    console.error('Error loading profile:', error)
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