<template>
  <form>
    <h2>수정</h2>
    <div class="mb-3">
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
      name="" cols="30" rows="10" >
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
    <div class="d-flex justify-content-center">
      <div class="mt-4 mx-3 box pointer" @click="updateReview"><div class="my-1">수정</div></div>
      <div class="mt-4 mx-3 box pointer" @click="reviewUpdateCancel"><div class="my-1">취소</div></div>
    </div>

  </form>
</template>

<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export default {

  name: "ReviewUpdateForm",
  data: function () {
    return {



      review_title: '',
      review_content: '',
      rank: '',
    }
  },
  props: {
    review: {
        type: Object,
        required: true
    }
  },
  methods: {
    updateReview: function () {
      const movieId = this.$route.params.movieId
      const user = jwt_decode(localStorage.getItem('jwt'))
      
      axios({
        method: 'PUT',
        url: `http://127.0.0.1:8000/movies/${movieId}/reviews/${this.review.id}/`,
        data: {
          user: user.user_id,
          review_title : this.review.review_title,
          review_content : this.review.review_content,
          rank : this.review.rank
        }
      }).then(() => {
        this.$router.go()
      })
    },
    reviewUpdateCancel: function () {
      this.review.is_updated = !this.review.is_updated
      this.review.review_title = this.review_title
      this.review.review_content = this.review_content
      this.review.rank = this.rank
    }
  },
  created: function() {
    this.review_title = this.review.review_title
    this.review_content = this.review.review_content
    this.rank = this.review.rank


  }

}
</script>

<style>
.box {
	border: 1px solid white;
  width: 4rem;
  height: 2rem;
  padding: 0px;
  margin: 0px;
}
.pointer {
  cursor: pointer;
}
</style>