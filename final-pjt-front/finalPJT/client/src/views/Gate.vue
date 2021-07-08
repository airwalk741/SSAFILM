<template>
<div>
  <p class="title my-5">화면을 눌러 다양한 영화를 만나보세요</p>
  <div id="carouselExampleCaptions " class="carousel slide" data-bs-ride="carousel" >
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner mx-auto" style="width:76%" @click="goMovie">
    <div class="carousel-item active " data-bs-interval="1000">
      <img src="../assets/endgame.png" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <p class="movie_title fw-bold">Avengers: Endgame</p>
        <p class="fs-4 fw-bold content"> Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth, Scarlett Johansson, Jeremy Renner, Don Cheadle, Paul Rudd, Brie Larson, Karen Gillan, Danai Gurira, Benedict Wong, Jon Favreau, Bradley Cooper, Gwyneth Paltrow, and Josh Brolin. In the film, the surviving members of the Avengers and their allies attempt to reverse the damage caused by Thanos in Infinity War.</p>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="1200">
      <img src="../assets/joker.jpeg" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <p class="movie_title fw-bold">Joker </p>
        <p class="fs-4 fw-bold content"> Set in 1981, it follows Arthur Fleck, a failed clown and stand-up comedian whose descent into insanity and nihilism inspires a violent counter-cultural revolution against the wealthy in a decaying Gotham City. Robert De Niro, Zazie Beetz, Frances Conroy, Brett Cullen, Glenn Fleshler, Bill Camp, Shea Whigham, and Marc Maron appear in supporting roles. Joker was produced by Warner Bros. Pictures, DC Films, and Joint Effort, in association with Bron Creative and Village Roadshow Pictures, and distributed by Warner Bros.</p>
      </div>
    </div>
    <div class="carousel-item" data-bs-interval="1200">
      <img src="../assets/godzilla.png" class="d-block w-100" alt="...">
      <div class="carousel-caption d-none d-md-block">
        <p class="movie_title fw-bold">Godzilla vs Kong</p>
        <p class="fs-4 fw-bold content">가슴이 웅장해진다</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  </div>
</div>



  
</template>

<script>
export default {
methods: {
  goMovie: function () {
    this.$router.push({ name: "Movie" })
    }
  }
}
</script>

<style>
  .title {
    font-size: 4rem;
    font-weight: 900;
    color: lightgray;
  }
  .content{
    color: lightgray;
  }
  .movie_title {
    font-size: 3rem;
  }
</style>