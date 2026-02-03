<template>
  <div>
    <h1 class="text-4xl font-bold mb-2">{{ pkg?.name }}</h1>
    <p class="text-gray-500 mb-8">
      Runs on {{ pkg?.running_day }} • {{ pkg?.duration }} days
    </p>

    <div class="relative border-l-4 border-indigo-600 pl-8 space-y-8">
      <div v-for="r in routes" :key="r.id" class="relative">
        <span class="absolute -left-4 top-1 w-6 h-6 bg-indigo-600 rounded-full"></span>

        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 class="font-bold text-lg">{{ r.station }}</h3>
          <p class="text-sm text-gray-500">
            Day {{ r.day_no }} • {{ r.direction }}
          </p>
          <p class="text-sm">
            Arrival: {{ r.arrival || '—' }} | Departure: {{ r.departure || '—' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pkg = ref(null)
const routes = ref([])

onMounted(async () => {
  const id = route.params.id
  pkg.value = await fetch(`http://localhost:5000/api/packages/${id}`).then(r=>r.json())
  routes.value = await fetch(`http://localhost:5000/api/packages/${id}/routes`).then(r=>r.json())
})
</script>
