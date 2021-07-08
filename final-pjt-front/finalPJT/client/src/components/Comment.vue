<template>
	<div>
		<p class="ps-3 text-start pointer" @click="showComment">
			<i class="fas fa-sort-amount-down-alt d-flex">
				<p v-if="!CommentLength">
					댓글작성 
				</p>
				<p v-else>
					댓글 ({{ CommentLength }})
				</p>
			</i>
		</p>
		<div v-if="show_comment">
			
			<div  class="pt-1" v-for="comment in commentList" :key="comment.created_at" >
				
				<div class="ps-5 d-flex justify-content-between">
					<i class="fas fa-arrow-right d-flex">
						<div v-for="user in userList" :key="user.username">
							<p v-if="user.id === comment.user" class="ms-3">
								{{user.username}}
							</p>

						</div>
						<p class="ms-3"> : {{comment.comment_content}}</p>
					</i>
					
					<div class="d-flex justify-content-end" v-if="authUserComment(comment)">
						<p @click="commentUpdate(comment)" class="pointer">수정</p>
						<p @click="commentDelete(comment)" class="mx-3 pointer">삭제</p>
					</div>
				</div>

				
				<CommentUpdateForm v-if="comment.is_updated" :comment="comment" @Cancel="Cancel" :reviewId="reviewId" />
			</div>
				
			<hr>
			
			<CommentForm v-if="isForm"  :reviewId="reviewId"/>
		
		</div>
	</div>
</template>

<script>
import CommentUpdateForm from '@/components/CommentUpdateForm'
import CommentForm from '@/components/CommentForm'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export default {
  name: 'Comment',
	components: {
		CommentUpdateForm,
		CommentForm
	},
	data: function () {
		return {
			commentList: [],
			CommentLength: '',
			userList: [],
			isForm: true,
		}
	},
	props: {
		reviewId : {
			type: Number,
			required: true,
		},
		show_comment: {
			type: Boolean,
			required: true
		}
	},
	
	methods: {
		
		getComment: async function() {
			const movieId = this.$route.params.movieId
			axios({
				method: "GET",
				url : `http://127.0.0.1:8000/movies/${movieId}/${this.reviewId}/comments/`
			})
			.then((res) => {
				this.commentList = res.data
				this.CommentLength = 	this.commentList.length
			})

		},
		commentUpdate: function (comment) {
			comment.is_updated = !comment.is_updated
			this.isForm = !comment.is_updated
			
		},
		commentDelete: function (comment) {
			const movieId = this.$route.params.movieId
			axios({
				method: "DELETE",
				url : `http://127.0.0.1:8000/movies/${movieId}/${this.reviewId}/comments/${comment.id}/`
			})
			.then(()=> {
				this.$router.go()
			})
		},
		showComment: function () {
			this.show_comment = !this.show_comment
		},

		authUserComment: function (comment) {
				
			if (!localStorage.getItem('jwt')) {
				return false
			}

			const user = jwt_decode(localStorage.getItem('jwt'))
			if (user.user_id === comment.user) {
				return true
			} else {
				return false
			}
		},
		Cancel: function () {
			this.isForm = true
		}

	



	},
	created: function() {
		this.getComment()
		axios({
			method: 'GET',
			url : `http://127.0.0.1:8000/accounts/users/`
		})
		.then(res => {
			this.userList = res.data
			console.log(this.userList)
		})
		.catch(() => {
			alert('오류 (user들의 정보를 불러올 수 없습니다.)')
		})
		
	},
	computed: {
		
	}


}
</script>

<style>
.gray {
 color: darkgray;
}
.pointer {
	cursor: pointer;
}

</style>