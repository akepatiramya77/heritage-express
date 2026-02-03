<template>
  <div class="max-w-md mx-auto mt-24 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
    <h1 class="text-2xl font-bold mb-6 text-center">Register</h1>

    <input v-model="name" placeholder="Name" class="input" />
    <input v-model="email" placeholder="Email" class="input mt-3" />
    <input v-model="password" type="password" placeholder="Password" class="input mt-3" />

    <select v-model="role" class="input mt-3">
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>

    <button @click="registerUser" class="btn mt-6 w-full">
      Register
    </button>

    <p class="text-sm mt-4 text-center">
      Already have an account?
      <router-link to="/login" class="text-indigo-600">Login</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const role = ref('user')

const registerUser = async () => {
  const res = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value,
      role: role.value
    })
  })

  if (!res.ok) {
    alert('Registration failed')
    return
  }

  alert('Registration successful')
  router.push('/login')
}
</script>

<style scoped>
.input {
  @apply border rounded px-3 py-2 w-full dark:bg-gray-700;
}
.btn {
  @apply bg-indigo-600 text-white py-2 rounded;
}
</style>
