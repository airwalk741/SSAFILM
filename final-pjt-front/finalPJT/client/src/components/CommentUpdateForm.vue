<template>
<div >
	<p class="text-start h4 ps-3 pb-1">댓글 수정하기</p>
	<div class="form-floating" @keyup.enter="commentUpdate">
		<textarea class="form-control bg-dark text-white" placeholder= comment.content id="floatingTextarea2" style="height: 100px" v-model="comment.comment_content"></textarea>
		
		
	</div>
		<div class="mt-3">
			<button class="btn btn-primary me-4" @click="commentUpdate">수정</button>
			<button class="btn btn-primary" @click="commentUpdateCancel(comment)">취소</button>
		</div>
	
</div>
  
</template>

<script>
import axios from "axios"
import jwt_decode from "jwt-decode"

export default {
    name: "CommentUpdateForm",
	data: function () {
		return {
			comment_content: ''
		}
	},
	props: {
		comment: {
			type: Object,
			required: true,
		},
		reviewId: {
			type: Number,
			required: true,
		}

	},
	methods: {
		commentUpdate: function () {
			const user = jwt_decode(localStorage.getItem('jwt'))
			const movieId = this.$route.params.movieId
			axios({
				method: 'PUT',
				url: `http://127.0.0.1:8000/movies/${movieId}/${this.reviewId}/comments/${this.comment.id}/`,
				data: {
					user: user.user_id,
					comment_content: this.comment.comment_content
				}
			})
			.then(() => {
				this.$router.go()
			})
		},
		commentUpdateCancel: function (comment) {
			comment.is_updated = !comment.is_updated
			this.comment.comment_content = this.comment_content
			this.$emit("Cancel")
		}
	},
	created: function() {
		this.comment_content = this.comment.comment_content
	} 

}
</script>

<style>

</style>