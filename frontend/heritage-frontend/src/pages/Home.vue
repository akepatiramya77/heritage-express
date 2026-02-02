<template>
  <div class="max-w-5xl mx-auto p-6">
    <h2 class="text-3xl font-bold mb-6">Explore Heritage Journeys</h2>

    <div class="grid md:grid-cols-2 gap-6">
      <div
        v-for="pkg in packages"
        :key="pkg.id"
        class="bg-white shadow-lg rounded-xl p-6 border"
      >
        <h3 class="text-xl font-semibold">{{ pkg.name }}</h3>
        <p class="text-gray-600">Runs on {{ pkg.running_day }}</p>
        <p class="text-gray-600">{{ pkg.duration }} days</p>

        <router-link
          :to="`/package/${pkg.id}`"
          class="inline-block mt-4 text-indigo-600 font-medium hover:underline"
        >
          View Journey →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const packages = ref([])

onMounted(async () => {
  const res = await fetch('http://localhost:5000/api/packages')
  packages.value = await res.json()
})
</script>
