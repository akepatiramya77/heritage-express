<template>
  <div class="space-y-10">

    <h1 class="text-3xl font-bold">Admin Dashboard</h1>

    <!-- ADD / UPDATE FORM -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h2 class="text-xl font-semibold mb-4">
        {{ editingId ? 'Update Package' : 'Add Package' }}
      </h2>

      <div class="grid md:grid-cols-4 gap-4">
        <input v-model="form.name" placeholder="Package Name" class="input" />
        <input v-model="form.running_day" placeholder="Running Day" class="input" />
        <input v-model="form.duration" type="number" placeholder="Duration" class="input" />

        <button
          @click="submitPackage"
          class="bg-indigo-600 text-white rounded px-4 py-2"
        >
          {{ editingId ? 'Update' : 'Add' }}
        </button>
      </div>
    </div>

    <!-- EXISTING PACKAGES -->
    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h2 class="text-xl font-semibold mb-4">Existing Packages</h2>

      <table class="w-full">
        <thead>
          <tr class="text-left border-b">
            <th>Name</th>
            <th>Day</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="pkg in packages" :key="pkg.id" class="border-b">
            <td>{{ pkg.name }}</td>
            <td>{{ pkg.running_day }}</td>
            <td>{{ pkg.duration }} days</td>
            <td class="space-x-4">
              <button
                @click="editPackage(pkg)"
                class="text-blue-600"
              >
                Edit
              </button>

              <button
                @click="deletePackage(pkg.id)"
                class="text-red-600"
              >
                Delete
              </button>

              <!-- ✅ ROUTES LINK (FIXED) -->
              <router-link
                :to="`/admin/package/${pkg.id}/routes`"
                class="text-indigo-600"
              >
                Routes
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const packages = ref([])
const editingId = ref(null)

const form = ref({
  name: '',
  running_day: '',
  duration: ''
})

const fetchPackages = async () => {
  const res = await fetch('http://localhost:5000/api/packages')
  packages.value = await res.json()
}

const submitPackage = async () => {
  if (editingId.value) {
    await fetch(
      `http://localhost:5000/api/packages/admin/packages/${editingId.value}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value)
      }
    )
  } else {
    await fetch(
      'http://localhost:5000/api/packages/admin/packages',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value)
      }
    )
  }

  resetForm()
  fetchPackages()
}

const editPackage = (pkg) => {
  editingId.value = pkg.id
  form.value = { ...pkg }
}

const deletePackage = async (id) => {
  await fetch(
    `http://localhost:5000/api/packages/admin/packages/${id}`,
    { method: 'DELETE' }
  )
  fetchPackages()
}

const resetForm = () => {
  editingId.value = null
  form.value = { name: '', running_day: '', duration: '' }
}

onMounted(fetchPackages)
</script>

<style scoped>
.input {
  @apply border rounded px-3 py-2 w-full dark:bg-gray-700;
}
</style>
