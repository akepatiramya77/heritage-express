<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold">Route Timetable</h2>

    <!-- Add Route -->
    <div class="grid md:grid-cols-6 gap-3">
      <input v-model="form.day_no" type="number" placeholder="Day" class="input" />
      <select v-model="form.direction" class="input">
        <option>UP</option>
        <option>DOWN</option>
      </select>
      <input v-model="form.station" placeholder="Station" class="input" />
      <input v-model="form.arrival" type="time" class="input" />
      <input v-model="form.departure" type="time" class="input" />

      <button @click="addRoute" class="bg-indigo-600 text-white rounded px-4">
        Add
      </button>
    </div>

    <!-- Existing Routes -->
    <table class="w-full mt-6">
      <thead>
        <tr class="border-b">
          <th>Day</th>
          <th>Dir</th>
          <th>Station</th>
          <th>Arrival</th>
          <th>Departure</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="r in routes" :key="r.id" class="border-b">
          <td>{{ r.day_no }}</td>
          <td>{{ r.direction }}</td>
          <td>{{ r.station }}</td>
          <td>{{ r.arrival || '—' }}</td>
          <td>{{ r.departure || '—' }}</td>
          <td>
            <button
              @click="deleteRoute(r.id)"
              class="text-red-600"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const routes = ref([])

const form = ref({
  day_no: '',
  direction: 'DOWN',
  station: '',
  arrival: '',
  departure: ''
})

const fetchRoutes = async () => {
  const res = await fetch(
    `http://localhost:5000/api/packages/${route.params.id}/routes`
  )
  routes.value = await res.json()
}

const addRoute = async () => {
  await fetch(
    `http://localhost:5000/api/packages/admin/packages/${route.params.id}/routes`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    }
  )

  form.value = {
    day_no: '',
    direction: 'DOWN',
    station: '',
    arrival: '',
    departure: ''
  }

  fetchRoutes()
}

const deleteRoute = async (id) => {
  await fetch(
    `http://localhost:5000/api/packages/admin/routes/${id}`,
    { method: 'DELETE' }
  )
  fetchRoutes()
}

onMounted(fetchRoutes)
</script>

<style scoped>
.input {
  @apply border rounded px-2 py-1 dark:bg-gray-700;
}
</style>
