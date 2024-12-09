<script setup>
import { computed } from 'vue'
import { AppState } from '../AppState.js'

const props = defineProps({
  profile: {
    type: Object,
    required: true
  }
})

const account = computed(() => AppState.account)
const isOwner = computed(() => account.value?.id === props.profile.id)
</script>

<template>
  <div class="profile-banner position-relative mb-3">
    <img :src="profile.coverImg" alt="" class="cover-image">

    <div class="profile-content p-3">
      <div class="d-flex align-items-end gap-3">
        <img :src="profile.picture" alt="" class="profile-picture">
        <div class="profile-info">
          <h2 class="mb-0">{{ profile.name }}</h2>
          <p class="mb-0">{{ profile.class }}</p>
          <span class="badge" :class="profile.graduated ? 'bg-success' : 'bg-primary'">
            {{  profile.graduated ? 'Alumni' : 'Student' }}
          </span>
        </div>
      </div>
    </div>
  </div>

  <div class="card mb-3">
    <div class="card-body">
      <h5>About</h5>
      <p class="mb-0">{{ profile.bio || 'No bio provided.' }}</p>
    </div>
  </div>
</template>

<style land="scss" scoped>
.profile-banner {
  background: var(--bs-dark);
  border-radius: 8px;
  overflow: hidden;
}

.cover-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.profile-content {
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
}

.profile-picture {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid white;
  object-fit: cover;
}

.profile-info {
  text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
}
</style>

