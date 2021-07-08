<template>

  <div v-if="authUser" @keyup.enter="submit">
    <div>
      <div class="form-floating ">
        <textarea v-model="comment_content" class="form-control bg-dark text-white" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"></textarea>
        <label for="floatingTextarea2">Comments</label>
      </div>
      
      <button class="btn btn-primary mt-3" @click="submit">작성</button>
      
    </div>
  </div>
  
</template>

<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export default {
  name: "CommentCreate",
  data: function () {
    return {
      comment_content: [],
    }
  },
  props: {
    reviewId: {
      type: Number,
      required: true,
    }
   
  },
  methods: {
    submit: function() {
      const movieId = this.$route.params.movieId
      const user = jwt_decode(localStorage.getItem('jwt'))
  
      axios ({
        method: 'POST',
        url: `http://127.0.0.1:8000/movies/${movieId}/${this.reviewId}/comments/`,
        data: {
          user: user.user_id,
          comment_content: this.comment_content,
        }
      })
      .then(()=> {
        this.$router.go()
      }).catch(() => {
        alert('로그인이 필요한 서비스입니다.')
      })
    },

  },
  computed: {
    authUser: function () {
			
			if (!localStorage.getItem('jwt')) {
				return false
			} else {
        return true
      }
		},
  }
}
</script>

<style>

</style>