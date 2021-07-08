<template>
  <div>
      <p class="h1">영화를 골라보세요<i class="fas fa-check ps-4"></i></p>
      <hr>
    <div class="container-fluid d-flex justify-content-center align-items-center" >
      <div v-for="movie in randomList" :key="movie.id" class="">
        <div class="" >
          <img class=" my-5 pointer" style="width:75%" :src="imgUrl(movie)" alt="" @click="goDetail(movie)">
        </div>
      </div>
    </div>
    <button class="btn btn-danger h4" @click="replay">5개 다시 받기</button>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'

export default {
  name: 'Recommend',
  data: function () {
    return {
      roulette: false,
      randomList: []
    }
  },

  methods: {
    recommendMovie: function () {
      
    },
    imgUrl: function (movie) {
      return 'https://image.tmdb.org/t/p/w500/' + movie.poster_path
    },
    goDetail: function (movie) {
      this.$router.push({name: 'Detail', params: {movieId: movie.id}})
    },
    replay: function () {
      this.$router.go()
    }
  },

  created: function () {
   
    axios({
      method: 'GET',
      url: `http://127.0.0.1:8000/movies/recommend/`
    })
    .then(res => {
      this.randomList = _.sampleSize(res.data, 5)
    })
  },

  computed: {

  }
}
</script>

<style>

.pointer {
  cursor: pointer;
}

.h1{
  font-size: 3.5rem;
  font-weight: bolder;
}
.h2{
  font-size: 2.5rem;

}
.h3{
  font-size: 2rem;
}
.h4{
  font-size: 1.3rem;
}
</style>