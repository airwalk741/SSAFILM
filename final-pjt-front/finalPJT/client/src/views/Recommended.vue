<template>
  <div>
    <!-- <p class="title">당신의 선택은?</p> -->
    <div class="d-grid gap-2 col-2 mx-auto">
      <button type="button" class="btn btn-danger fs-5 h1 " @click="selectedMovie(selectMovie[0])" >STOP</button>
    </div>
    <div class="container-fluid d-flex justify-content-center align-items-center" >
      <div v-for="movie in selectMovie" :key="movie.id">
        <div class="mx-3" >
          <img class="  my-3 pointer" style="height: 35rem;" :src="imgUrl()" alt="" @click="goDetail(movie)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'

export default {
  name: 'Recommended',
  data: function () {
    return {
      roulette: false,
      randomList: [],
      selectMovie: []
    }
  },

  methods: {
    recommendMovie: function () {
      this.selectMovie = _.sampleSize(this.randomList, 1)
      // console.log(this.selectMovie[0])

      if (!this.roulette) {
        setTimeout(this.recommendMovie, 700)
      }

    },

    imgUrl: function () {
      // console.log(this.selectMovie)
      return 'https://image.tmdb.org/t/p/w500/' + this.selectMovie[0].poster_path
    },

    goDetail: async function (movie) {
      this.$router.push({name: 'Detail', params: {movieId: movie.id}})
    },
    selectedMovie: function (movie) {
      this.roulette = true
      this.$router.push({name: 'Detail', params: {movieId: movie.id}})
    }

  },

  created: function () {
    this.roulette = false
    axios({
      method: 'GET',
      url: `http://127.0.0.1:8000/movies/recommend/`
    })
    .then(res => {
      this.randomList = res.data
      this.selectMovie = _.sampleSize(res.data, 1)
      this.recommendMovie()
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
.title {
    font-size: 100px;
    font-weight: 700;
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