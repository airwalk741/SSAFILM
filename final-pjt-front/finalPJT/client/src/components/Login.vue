<template>
    
    <div class="modal text-white" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" @keyup.enter="login">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
      <div class="modal-content bg-dark circle">
        <div class="modal-header">
          <h5 class="modal-title mx-3 my-3 fs-1 fw-bold" id="exampleModalLabel">Login</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="resetInfo"></button>
        </div>
        <div class="modal-body">
          <form class="border p-3">
            
          
            <div class="mb-4">
              <div class="d-flex mb-4">
                <label for="username" class="col-form-label fs-4 fw-bold">Username</label>
              </div>
              <input 
                type="text" 
                class="form-control fs-3" 
                id="username" 
                style="height: 60px"
                v-model="credentials.username"
              >
              
            </div>
            <div class="mb-4">
              <div class="d-flex mb-4">
                <label for="password" class="col-form-label fs-4 fw-bold">Password</label>
              </div>
              <input 
              type="password" 
              class="form-control fs-3" 
              id="password"
              v-model="credentials.password"
              style="height: 60px"
              >
            </div>
      
            <div class="d-grid gap-2">
          
            </div>
          </form>
        </div>
        <div class="modal-footer me-3">
          <button type="button" class="btn btn-danger fs-4" data-bs-dismiss="modal" @click="resetInfo">Close</button>
          <button type="button" class="btn btn-success fs-4" data-bs-dismiss="modal" @click="login">Submit</button>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
import jwt_decode from "jwt-decode"

const SERVER_URL = "http://127.0.0.1:8000"

export default {
  name: 'Login',
  data: function () {
    return {
      credentials: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    login: function () {
      axios({
        method: 'post',
        url: SERVER_URL + '/accounts/api-token-auth/',
        data: this.credentials
      }).then(res => {
        
        localStorage.setItem('jwt', res.data.token)
        console.log(jwt_decode(res.data.token))
        this.$emit('login')
        this.credentials.username = ''
        this.credentials.password = ''
        this.$router.go()
      }).catch(() => {
        alert('회원정보를 다시 확인하세요')
        this.credentials.password = ''
      })
    },
    resetInfo: function () {
      this.credentials.username = ''
      this.credentials.password = ''
      this.credentials.passwordConfirmation = ''
    }
  },
  
}
</script>

<style>

.circle {
  border-radius: 10px; 
}

</style>
