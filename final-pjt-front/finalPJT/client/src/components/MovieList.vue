<template>
<div class="d-flex justify-content-around ms-5 bg-dark px-5">
  <div class="row mt-5 mx-2">
    <MovieCard v-for="movie in movieList" :key="movie.pk" :movie="movie" @showMovie="showMovie" />
  </div>
</div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'MovieList',
  components:{
    MovieCard,
  },
  props:{
    movieList: {
      type: Array,
      required: true,
    }
  },
  methods: {
    showMovie: function (showMovie) {
      this.$emit('showMovie', showMovie)
    }
  }
}
</script>

<style>
.container {
  width: 100%;
  
}
</style>