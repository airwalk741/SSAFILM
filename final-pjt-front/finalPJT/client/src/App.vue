<template>
  
  <div id="app" class=" bg-dark text-white" >
    <header id="header" class="bg-dark">
      <nav class="navbar navbar-expand-lg navbar-light bg-dark text-white">
        <div class="container-fluid">
          <div>
            <img src="../public/movie.png" @click="goHome" class="nav-link nav-img ms-5" alt="">
          </div>
          <a class="nav-link navbar-brand text-white nav-link activ font-weight: bold mt-2 fs-2" @click="goMovie">Movie</a>
          <a class="nav-link navbar-brand text-white nav-link activ font-weight: bold mt-2 fs-2" @click="goRecommend">Recommend</a>
          <a class="nav-link navbar-brand text-white nav-link activ font-weight: bold mt-2 fs-2" @click="goRecommended">Pick</a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 ">

              <div class="d-flex">
                <div class="me-auto">
                  <li class="nav-item ">
                    
                  </li>
                </div>
                <div v-if="isLogin" class="mx-5 d-flex ">
                  <li class="nav-item">
                    <p class="text-white nav-link "><i class="fas fa-ticket-alt pe-2" ></i> {{ username }} 님 환영합니다!</p> 
                  </li>
                  <li class="nav-item mx-5">
                    <router-link to="#" @click.native="onLogout" class="text-white nav-link activ  ">Logout</router-link> 
                  </li>
                </div>
                <div v-else class="d-flex me-auto mx-5">
                    <li class="nav-item ">
                      <a 
                      data-bs-toggle="modal"
                      data-bs-target="#signupModal" 
                      class="nav-link navbar-brand text-white nav-link activ font-weight: bold mt-2 fs-2"
                      >Signup</a>
                      <Signup />

                    </li>
                    <li class="nav-item mx-5">
                      <a 
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal" 
                      class="nav-link navbar-brand text-white nav-link activ font-weight: bold mt-2 fs-2"
                      >Login</a>
                      <Login @login="onLogin" />
                    </li>
                </div>
              </div>

            </ul>
          </div>
        </div>
      </nav>
    </header>
  
     
      <!-- <Detail :downMovie="downMovie" /> -->
    <router-view  :isLogin="isLogin" ></router-view>

    <footer>
      <div>
        <p class=" d-grid gap-2  fs-5 p-3">Final project. Created by 천수승, 박상현</p>
      </div>
    
    </footer>
  </div>
  
 

</template>

<script>
import Login from "./components/Login";
import Signup from "./components/Signup";
import axios from 'axios'
import jwt_decode from 'jwt-decode'
// import Detail from "./views/Detail";

    
export default {
  name: 'App',
  components: {
    Login,
    Signup,
    // Detail,
    
  },
  data: function () {
    return {
      isLogin: false,
      username: '',
      isModalViewed: false,
      credentials: {
        username: '',
        password: '',
      },
      loginModal: false,
      downMovie: [],
      
    }
  },
  methods: {
    onLogin: function () {
      this.isLogin = true
      // this.$router.push({name: 'Movie' })
      this.username = jwt_decode(localStorage.getItem('jwt')).username
    },
    onLogout: function () {
      this.isLogin = false
      localStorage.removeItem('jwt')
      this.$router.push({ name: 'Gate' })
    },
    button: function () {
      this.isModalViewed = true
      console.log(this.isModalViewed)
    },
    showMovie: function (showMovie) {
      console.log('data', showMovie)

      this.downMovie = showMovie
    },
    goRecommend: function () {
      this.$router.push({name: 'Recommend'})
      this.$router.go()
    },
    goHome: function () {
      this.$router.push({name: 'Home'})
      this.$router.go()
    },
    goMovie: function () {
      this.$router.push({name: 'Movie'})
      
    },
    goRecommended: function () {
      this.$router.push({name: 'Recommended'})
      this.$router.go()
    },
    goTopRated: function () {
      this.$router.push({name: 'TopRated'})
      this.$router.go()
    },

   
  },
  created: function () {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      this.onLogin()
    }
    const API_URL = 'http://127.0.0.1:8000/movies'

    axios({
      method: 'GET',
      url: API_URL,
    }).then(response => {       
      this.movieList = response.data
    })
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  
}

#header {
  font-size: 2rem;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
} 

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.nav-link {
  cursor: pointer;
}

.nav-img {
  width: 100px;
}

</style>
