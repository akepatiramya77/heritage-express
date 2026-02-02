<template>
  <div class="max-w-6xl mx-auto p-6">
    <h2 class="text-3xl font-bold mb-2">
      {{ pkg?.name }}
    </h2>

    <p class="text-gray-600 mb-6">
      Runs on {{ pkg?.running_day }} • {{ pkg?.duration }} days
    </p>

    <h3 class="text-2xl font-semibold mb-4">Route Timetable</h3>

    <table class="w-full border-collapse bg-white shadow rounded-lg overflow-hidden">
      <thead class="bg-slate-800 text-white">
        <tr>
          <th class="p-3">Day</th>
          <th class="p-3">Direction</th>
          <th class="p-3">Station</th>
          <th class="p-3">Arrival</th>
          <th class="p-3">Departure</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="r in routes"
          :key="`${r.day_no}-${r.station}`"
          class="border-b hover:bg-slate-100"
        >
          <td class="p-3">Day {{ r.day_no }}</td>
          <td class="p-3">{{ r.direction }}</td>
          <td class="p-3 font-medium">{{ r.station }}</td>
          <td class="p-3">{{ r.arrival || '—' }}</td>
          <td class="p-3">{{ r.departure || '—' }}</td>
        </tr>
      </tbody>
    </table>
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

  const pkgRes = await fetch(`http://localhost:5000/api/packages/${id}`)
  pkg.value = await pkgRes.json()

  const routeRes = await fetch(`http://localhost:5000/api/packages/${id}/routes`)
  routes.value = await routeRes.json()
})
</script>
