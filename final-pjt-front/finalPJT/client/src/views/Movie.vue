<template>
  <div class="Movie" @scroll="handleScroll">
    <p class="title mt-5">Popular Movies</p>
    <MovieList :movieList="movieList" @showMovie="showMovie"/>
    
  </div>
  
</template>

<script>
import axios from 'axios'
import MovieList from '@/components/MovieList.vue'


export default {
    name: 'Movie',
    components: {
      MovieList,
    },
    data: function() {
      return {
        movieList: [],
        pageNum: 2,
      }
    },
    methods: {
      getPopular: function () {
        const API_URL = 'http://127.0.0.1:8000/movies'

        axios({
          method: 'GET',
          url: API_URL,
        }).then(response => {       
          this.movieList = response.data
        })
      },
      showMovie: function (showMovie) {
        this.$emit('showMovie', showMovie)
      },

      handleScroll () {
        const API_URL = 'http://127.0.0.1:8000/movies'

        const {scrollTop, clientHeight, scrollHeight} = document.documentElement
        console.log(scrollTop, clientHeight, scrollHeight)
        // 장고로 요청
        if (scrollTop + clientHeight >= scrollHeight) {
          axios({
            method: 'GET',
            url: API_URL + `/?page=${this.pageNum}`,
         
          }).then(response => {
            // console.log(response)
            // for문 통해서 받아온 데이터 하나씩 담기
            for(let i = 0; i < 10; i++) {
              this.movieList.push(response.data[i])
            }
            this.pageNum += 1
          })
        }
      },


    },
    // 스크롤 내리면 handleScroll 나온다
    created: function () {
      this.getPopular()
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll);
    },
}
</script>

<style>
  .title {
    font-size: 5rem;
    font-weight: 900;
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