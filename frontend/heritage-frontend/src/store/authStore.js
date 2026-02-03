import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
    name: localStorage.getItem('name')
  }),

  getters: {
    isLoggedIn: (s) => !!s.token,
    isAdmin: (s) => s.role === 'admin'
  },

  actions: {
    login(data) {
      this.token = data.token
      this.role = data.role
      this.name = data.name

      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.role)
      localStorage.setItem('name', data.name)
    },

    logout() {
      localStorage.clear()
      this.token = null
      this.role = null
      this.name = null
    }
  }
})
