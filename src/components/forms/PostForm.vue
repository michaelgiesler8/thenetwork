<script setup>
import { ref } from 'vue'
import { postsService } from '../../services/PostsService.js'
import Pop from '../../utils/Pop.js'

const editable = ref({})

async function createPost() {
  try {
    await postsService.createPost(editable.value)
    editable.value = {}
  } catch (error) {
    Pop.error(error)
  }
}
</script>

<template>
  <form @submit.prevent="createPost">
    <div class="card mb-3">
      <div class="card-body">
        <textarea
          v-model="editable.body"
          required
          class="form-control"
          rows="3"
          placeholder="What's on your mind?"
        ></textarea>
        <input
          v-model="editable.imgUrl"
          class="form-control mt-2"
          type="url"
          placeholder="Image Url (optional)"
        >
        <div class="d-flex = justify-content-end mt-2">
          <button class="btn btn-primary" type="submit">
            Post
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss">
</style>