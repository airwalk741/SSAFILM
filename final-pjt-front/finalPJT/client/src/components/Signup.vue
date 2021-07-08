<template>
  <div class="modal text-white " id="signupModal" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true"  @keyup.enter="signup" >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable  modal-lg" >
      <div class="modal-content bg-dark circle " >
        <div class="modal-header">
          <h5 class="modal-title mx-3 my-3 fs-1 fw-bold" id="exampleModalLabel">Signup</h5>
          <button type="button" class="btn-close me-3" @click="resetInfo" data-bs-dismiss="modal" aria-label="Close"></button>
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
                aria-describedby="emailHelp"
                v-model="credentials.username"
                style="height: 60px"
                required
                
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


            <div class="mb-4">
              <div class="d-flex mb-4">
                <label for="passwordConfirmation" class="fs-4 fw-bold">password 확인</label>
              </div>
              <input 
              type="password" 
              class="form-control fs-3" 
              id="exampleInputPassword1"
              v-model="credentials.passwordConfirmation"
              style="height: 60px"
              >
            </div>
  
            <div class="d-grid gap-2">
          
            </div>
          </form>
        </div>
        <div class="modal-footer me-3">
          <button type="button" class="btn btn-danger fs-4" data-bs-dismiss="modal" @click="resetInfo">Close</button>
          <button type="button" class="btn btn-success fs-4"  data-bs-dismiss="modal" @click="signup">Submit</button>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import axios from 'axios'

const SERVER_URL = "http://127.0.0.1:8000"

export default {
  name: 'Signup',
  data: function () {
    return {
      credentials: {
        username: '',
        password: '',
        passwordConfirmation: '',
      }
    }
  },

  methods: {
    signup: function () {
      
      axios({
        method: 'post',
        url: SERVER_URL + '/accounts/signup/',
        data: this.credentials,
      }).then(() => {
        this.credentials.username = ''
        this.credentials.password = ''
        this.credentials.passwordConfirmation = ''
        this.$router.go()
        
      }).catch(err => {
        console.log(err)
        alert('다시 입력해주세요')
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
