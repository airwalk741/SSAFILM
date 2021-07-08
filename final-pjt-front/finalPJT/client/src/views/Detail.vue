<template>
  <div class="px-5 my-5 container " style="width=50%">
    <div class="container-fluid">
      <iframe id="player" type="text/html" width="800rem" height="450rem"
        :src="videoUrl"
        class=""
        frameborder="0">
      </iframe>
    </div>
    
    <div class="ps-5 pt-5">
      <p class="ps-5 text-start h1">
        <i class="fas fa-film pe-2">
        </i>
        {{ newMovieDetail.title }}
      </p>
    </div>
    
    <div class="ps-5">
      <img class="card-img-top mx-5 mt-5" style="width: 16rem; height: 24rem; float: left; margin: 0px;" :src="imgUrl" alt="">
    </div>
    <div class="d-flex align-items-center justify-content-center" style="height: 28rem;">
      <div class="">
        <div class="text-wrap">
          <p class="ps-5 text-start fst-italic h3 ">"{{ newMovieDetail.tagline }}"</p>
        </div>
        <br>
        <br>
        <p class="h4 text-start"> 개봉: {{ newMovieDetail.release_date }} </p>
        <p class="h4 text-start">평점 : {{ newMovieDetail.vote_average }} </p>
        <p class="h4 text-start">장르 : {{ movieGenre }} </p>
        <br>
        <p class="h4 text-start">overview:</p>
        <p class="text-start h4">{{ newMovieDetail.overview }}</p>
      </div>
    </div>
    <ReviewList />
    <ReviewCreate v-if="isLogin" />
  </div>
</template>

<script>
import axios from "axios"
import ReviewList from "@/components/ReviewList"
import ReviewCreate from "@/components/ReviewCreate"

export default {

  name: 'Detail',
  components: {
    ReviewList,
    ReviewCreate,
  },
  data: function () {
    return { 
      review_List: [],
      newMovieDetail: [],
      videoKey: '',
      isTrailer: false,
      movieGenre: '',
      isLogin: false
    }
  },
  props: {

  },
  methods: {

  },
  created: async function () {
    const movieId = this.$route.params.movieId
    this.isLogin = false
    this.newMovieDetail = await axios({
      method: 'GET',
      url: `http://127.0.0.1:8000/movies/${movieId}/`,
    })

    this.newMovieDetail = this.newMovieDetail.data.movie
    
   
    axios({
      method: 'GET',
      
      url: `https://api.themoviedb.org/3/movie/${this.newMovieDetail.movie_id}/videos`,
      params: {
        api_key: process.env.VUE_APP_TMDB_KEY
      }
    })
    .then((res) => {
      console.log(res)
      for (let i = 0; i < res.data.results.length; i++) {
        if (res.data.results[i].type === 'Trailer') {
          this.videoKey = res.data.results[i].key
          this.isTrailer = true
          break
        }
      }
      if (!this.isTrailer) {
        this.videoKey = res.data.results[0].key
      }
      this.isTrailer = false
    })
    
    axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${this.newMovieDetail.movie_id}`,
      params: {
        api_key: process.env.VUE_APP_TMDB_KEY
      }
    })
    .then(res => {
      this.newMovieDetail = res.data
      this.movieGenre = this.newMovieDetail.genres[0].name
    })

    if (localStorage.getItem('jwt')) {
      this.isLogin = true
    }

  },


  computed: {
    imgUrl: function () {
      return 'https://image.tmdb.org/t/p/w500/' + this.newMovieDetail.poster_path
    },
    videoUrl: function () {
      return 'http://www.youtube.com/embed/' + this.videoKey
    }
  }
}
// console.log(this.movieDetail)
</script>

<style>

.box {
  margin-left: 150px;
  margin-right: 150px;
}
.title{
  font-size: 4rem;
  font-weight: bolder;
}
.h1{
  font-size: 3.5rem;
  font-weight: bolder;
}
.h2{
  font-size: 2.5rem;

}
.h3{
  font-size: 1.4rem;
}
.h4{
  font-size: 1.3rem;
}



</style>