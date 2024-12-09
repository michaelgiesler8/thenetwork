<script setup>
import { router } from '../router'

const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
})

function goToProfile() {
  router.push({ name: 'Profile', params: { id: props.profile.id }})
}
</script>

<template>
  <div class="card h-100 selectable" @click="goToProfile">
    <div class="card-body">
      <div class="d-flex align-items-center gap-2">
        <img :src="profile.picture" alt="Profile Picture" class="profile-picture">
        <div>
          <h5 class="mb-0">{{ profile.name }}</h5>
          <p class="mb-0 text-muted">{{ profile.class }}</p>
          <span
            class="badge"
            :class="profile.graduated ? 'bg-success' : 'bg-primary'"
          >
            {{ profile.graduated ? 'Alumni' : 'Student' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile-picture {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.card {
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
}
</style>