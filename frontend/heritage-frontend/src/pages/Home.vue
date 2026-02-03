<template>
  <section>
    <h2 class="text-4xl font-extrabold mb-10 text-center">
      Explore Heritage Journeys
    </h2>

    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="pkg in packages"
        :key="pkg.id"
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6
               hover:scale-[1.02] hover:shadow-2xl transition-all duration-300"
      >
        <h3 class="text-2xl font-bold mb-2">
          {{ pkg.name }}
        </h3>

        <div class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
          <p>📅 Runs on <span class="font-semibold">{{ pkg.running_day }}</span></p>
          <p>⏳ {{ pkg.duration }} days</p>
        </div>

        <router-link
          :to="`/package/${pkg.id}`"
          class="inline-block mt-6 px-5 py-2 rounded-full
                 bg-indigo-600 text-white font-semibold
                 hover:bg-indigo-700 transition"
        >
          View Journey →
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const packages = ref([])

onMounted(async () => {
  const res = await fetch('http://localhost:5000/api/packages')
  packages.value = await res.json()
})
</script>
