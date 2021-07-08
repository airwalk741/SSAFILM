<template>
  <form >
    <div class="mb-3">
      <p class="text-start h3 tw-bold mb-3">리뷰 작성</p>
      <div class="d-flex ps-3">
        <i class="fas fa-pencil-alt pe-3"></i>
        <label for="exampleInputEmail1" class="form-label h5 text-start">Title</label>
      </div>
      <input type="text" class="form-control bg-dark text-white" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="review.review_title">
    </div>
    <div class="mb-3">
      <div class="d-flex ps-3">
        <i class="fas fa-pencil-alt pe-3"></i>
        <label for="review" class="form-label h5 text-start">Content</label>
        
      </div>
      
      <textarea type="text" class="form-control bg-dark text-white" id="review" v-model="review.review_content" 
      name="" cols="30" rows="10">
      <textarea ></textarea>
    </div>
    <div >
      <div class="d-flex ps-3">
        <i class="fas fa-pencil-alt pe-3"></i>
        <label  class="form-label h5 ">Rank ( click the box )</label>
      </div>
      
      <select class="form-select bg-dark text-white" aria-label="Default select example" v-model="review.rank">
        <option selected>평점</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      




    </div>
    <div id="emailHelp" class="form-text pb-2 ">소중한 의견 감사드립니다.</div>
    <div class="mt-4 mx-3 box2 pointer mx-auto circle" @click="submit"><div class="my-2">Submit</div></div>
  </form>
    
</template>

<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export default {
  name: "ReviewCreate",
  data: function () {
    return {
      review: {
        review_title: '',
        review_content: '',
        rank: ''
      }
    }
  },
  props: {

  },
  methods: {
    submit: function() {
      const movieId = this.$route.params.movieId

      if (localStorage.getItem('jwt')) {
        const user = jwt_decode(localStorage.getItem('jwt'))
        axios ({
          method: 'POST',
          url: `http://127.0.0.1:8000/movies/${movieId}/reviews/`,
          data: {
            user: user.user_id,
            review_title : this.review.review_title,
            review_content : this.review.review_content,
            rank : this.review.rank
            
          }
          
        })
        .then((res)=> {
          console.log(res)
          this.$router.go()
        }).catch(err => {
          console.log(err)
        })
      } else {
        alert('로그인이 필요한 서비스입니다.')
      }
  
      

    }
  }
}
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
.h5{
  font-size: 1.1rem;
}

.box2 {
	border: 1px solid white;
  width: 6rem;
  height: 2.5rem;
  padding: 0px;
  margin: 0px;
}

.circle {
  border-radius: 10px 10px 10px 10px;
}

</style>

