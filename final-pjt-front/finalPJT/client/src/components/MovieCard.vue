<template>
  <div class=" container-fluid col-sm-6 col-xl-3 col-xxl-3 d-flex justify-content-center my-4 px-4 scale pointer">
    <div class="card card-back mb-2 circle2" style=" height: 28rem; width: 100%;">
      <img class=" img-circle " @click="goDetail(movie)" style=" height: 19rem" :src="imgUrl" alt="">
      <div class="card-body">
        <div class=" d-flex justify-content-center align-items-center " style="height: 7rem">
          <span class="card-title" >{{movie.title}}</span>
        </div>
        
      </div>
      
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'MovieCard',
  data: function () {
    return {
      movieDetail: []
  }},
  props: {
    movie: {
      type: Object,
      required: true,
    }
  },
  methods: {
    goDetail: function (movie) {
     
      const API_URL = `http://127.0.0.1:8000/movies/${movie.id}`
      axios({
        methods: 'GET',
        url: API_URL,
      }).then(response => {
        
        this.movieDetail = response.data.movie
        this.$emit('showMovie', this.movieDetail)
        this.$router.push({ name:'Detail', params: {movieId: this.movie.id}}) 
      })
      
    }
  },
  computed: {
    imgUrl: function () {
      return 'https://image.tmdb.org/t/p/w500/' + this.movie.poster_path
    }
  }
}
</script>

<style>


.card-back {
  background: black;
  color: white;
}

.target { display: inline-block; width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; white-space: normal; line-height: 1.2; height: 6em;
}
.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  
}


.scale {
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  -o-transform: scale(1);
  transition: all 0.3s ease-in-out;  
}
.scale:hover {
transform: scale(1.2);
-webkit-transform: scale(1.2);
-moz-transform: scale(1.2);
-ms-transform: scale(1.2);
-o-transform: scale(1.2);
}
.img {width:325px; height:280px; overflow:hidden }

.pointer {
  cursor: pointer;
}

.circle2 {
	border-radius: 60px;
}

.img-circle {
  border-radius: 60px 60px 0px 0px;
}


</style>