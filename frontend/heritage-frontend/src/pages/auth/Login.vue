<template>
  <div class="flex justify-center items-center min-h-[80vh]">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">
        {{ isRegister ? 'Register' : 'Login' }}
      </h2>

      <input v-if="isRegister" v-model="name" placeholder="Name" class="input" />

      <input v-model="email" placeholder="Email" class="input mt-3" />
      <input v-model="password" type="password" placeholder="Password" class="input mt-3" />

      <select v-model="role" class="input mt-3">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button @click="submit" class="btn mt-5 w-full">
        {{ isRegister ? 'Register' : 'Login' }}
      </button>

      <p class="text-center mt-4 text-sm">
        <span @click="isRegister = !isRegister" class="cursor-pointer text-indigo-600">
          {{ isRegister ? 'Already have an account? Login' : 'New user? Register' }}
        </span>
      </p>

      <p v-if="error" class="text-red-500 mt-3 text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/authStore'

const router = useRouter()
const auth = useAuthStore()

const isRegister = ref(false)
const name = ref('')
const email = ref('')
const password = ref('')
const role = ref('user')
const error = ref(null)

const submit = async () => {
  error.value = null

  const url = isRegister.value
    ? 'http://localhost:5000/api/auth/register'
    : 'http://localhost:5000/api/auth/login'

  const body = isRegister.value
    ? { name: name.value, email: email.value, password: password.value, role: role.value }
    : { email: email.value, password: password.value }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  const data = await res.json()

  if (!res.ok) {
    error.value = data.message
    return
  }

  if (!isRegister.value) {
    auth.login(data)
    await new Promise(r => setTimeout(r, 50))
    router.push(data.role === 'admin' ? '/admin' : '/')
  } else {
    isRegister.value = false
  }
  if (isRegister.value) {
    isRegister.value = false
    name.value = ''
    email.value = ''
    password.value = ''
    role.value = 'user'
  }
}
</script>

<style scoped>
.input {
  @apply w-full p-3 rounded border dark:bg-gray-700 dark:border-gray-600;
}
.btn {
  @apply bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700;
}
</style>
