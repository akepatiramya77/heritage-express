<template>
  <div class="p-8">
    <h1 class="text-4xl font-bold mb-6">
      Admin Dashboard
    </h1>

    <div class="grid md:grid-cols-3 gap-6">
      <div class="card">Manage Packages</div>
      <div class="card">Train Routes</div>
      <div class="card">Class Fares</div>
    </div>
  </div>
</template>

<style scoped>
.card {
  @apply bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center font-semibold cursor-pointer hover:scale-105 transition;
}
</style>
