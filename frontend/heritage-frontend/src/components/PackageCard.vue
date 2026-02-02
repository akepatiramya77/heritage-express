<template>
  <div class="bg-white rounded-xl shadow-lg p-6 hover:scale-105 transition">
    <h2 class="text-xl font-bold mb-2">{{ pkg.name }}</h2>
    <p>Runs on: {{ pkg.running_day }}</p>
    <p>Duration: {{ pkg.duration }} days</p>

    <router-link
      :to="`/package/${pkg.id}`"
      class="mt-4 block text-center bg-black text-white py-2 rounded hover:bg-gray-800"
    >
      View Details
    </router-link>
  </div>
</template>

<script setup>
defineProps({ pkg: Object })
</script>
