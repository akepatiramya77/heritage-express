<template>
  <div class="space-y-10">

    <h1 class="text-3xl font-bold">Pricing Editor</h1>

    <!-- CLASS FARES -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h2 class="text-xl font-semibold mb-4">Class Fares</h2>

      <div class="flex gap-4 mb-4">
        <input v-model="fare.class_name" placeholder="Class" class="input" />
        <input v-model="fare.price" type="number" placeholder="Price" class="input" />
        <button @click="addFare" class="btn">Add</button>
      </div>

      <ul>
        <li v-for="f in fares" :key="f.id" class="flex justify-between py-1">
          {{ f.class_name }} – ₹{{ f.price }}
          <button @click="deleteFare(f.id)" class="text-red-600">✕</button>
        </li>
      </ul>
    </div>

    <!-- ADD ONS -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h2 class="text-xl font-semibold mb-4">Add-Ons</h2>

      <div class="flex gap-4 mb-4">
        <input v-model="addon.name" placeholder="Addon" class="input" />
        <input v-model="addon.price" type="number" placeholder="Price" class="input" />
        <button @click="addAddon" class="btn">Add</button>
      </div>

      <ul>
        <li v-for="a in addons" :key="a.id" class="flex justify-between py-1">
          {{ a.name }} – ₹{{ a.price }}
          <button @click="deleteAddon(a.id)" class="text-red-600">✕</button>
        </li>
      </ul>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

const fares = ref([])
const addons = ref([])

const fare = ref({ class_name: '', price: '' })
const addon = ref({ name: '', price: '' })

const load = async () => {
  fares.value = await fetch(
    `http://localhost:5000/api/admin/packages/${id}/fares`
  ).then(r => r.json())

  addons.value = await fetch(
    `http://localhost:5000/api/admin/packages/${id}/addons`
  ).then(r => r.json())
}

const addFare = async () => {
  await fetch(
    `http://localhost:5000/api/admin/packages/${id}/fares`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fare.value)
    }
  )
  fare.value = { class_name: '', price: '' }
  load()
}

const deleteFare = async (id) => {
  await fetch(`http://localhost:5000/api/admin/fares/${id}`, { method: 'DELETE' })
  load()
}

const addAddon = async () => {
  await fetch(
    `http://localhost:5000/api/admin/packages/${id}/addons`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addon.value)
    }
  )
  addon.value = { name: '', price: '' }
  load()
}

const deleteAddon = async (id) => {
  await fetch(`http://localhost:5000/api/admin/addons/${id}`, { method: 'DELETE' })
  load()
}

onMounted(load)
</script>

<style scoped>
.input {
  @apply border rounded px-3 py-2 dark:bg-gray-700;
}
.btn {
  @apply bg-indigo-600 text-white px-4 rounded;
}
</style>
