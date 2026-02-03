<template>
  <div>
    <!-- Package Header -->
    <div class="mb-12">
      <h1 class="text-4xl font-extrabold mb-2">
        {{ pkg?.name }}
      </h1>
      <p class="text-gray-600 dark:text-gray-300">
        Runs on {{ pkg?.running_day }} • {{ pkg?.duration }} days
      </p>
    </div>

    <!-- Timeline -->
    <div class="relative border-l-4 border-indigo-600 pl-6 sm:pl-8 space-y-10">
      <div
        v-for="(stop, index) in routes"
        :key="index"
        class="relative animate-[fadeInUp_0.4s_ease-out_both]"
        :style="{ animationDelay: `${index * 80}ms` }"
      >
        <!-- Dot -->
        <div
          class="absolute -left-[14px] top-1
                 w-6 h-6 rounded-full
                 bg-indigo-600
                 border-4 border-white dark:border-gray-900"
        ></div>

        <!-- Card -->
        <div
          class="bg-white dark:bg-gray-800
                 p-6 rounded-xl shadow-lg
                 hover:shadow-2xl transition"
        >
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-xl font-bold">
              {{ stop.station }}
            </h3>

            <span
              class="px-3 py-1 text-xs rounded-full font-semibold"
              :class="stop.direction === 'DOWN'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'"
            >
              {{ stop.direction }}
            </span>
          </div>

          <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Day {{ stop.day_no }}
          </p>

          <div class="flex gap-6 text-sm">
            <p>
              ⏱ Arrival:
              <span class="font-semibold">
                {{ stop.arrival || '—' }}
              </span>
            </p>
            <p>
              🚆 Departure:
              <span class="font-semibold">
                {{ stop.departure || '—' }}
              </span>
            </p>
          </div>
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

  // Package details
  const pkgRes = await fetch(`http://localhost:5000/api/packages/${id}`)
  pkg.value = await pkgRes.json()

  // Route details
  const routeRes = await fetch(
    `http://localhost:5000/api/packages/${id}/routes`
  )

  const allRoutes = await routeRes.json()

  // DOWN first, then UP
  routes.value = [
    ...allRoutes.filter(r => r.direction === 'DOWN'),
    ...allRoutes.filter(r => r.direction === 'UP'),
  ]
})
</script>
