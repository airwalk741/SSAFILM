<template>
	<div>
		<h2 class="d-flex justify-content-start ms-3 mt-5" >
			<i class="far fa-newspaper">
				Review ({{reviewCount}})
			</i>
		</h2>	
		<hr>
		
		<div v-for="review in reviewList" :key="review.created_at" class="mb-5">
			<div v-if="!review.is_updated" class="">
						<div class="d-flex">
							<div v-for="user in userList" :key="user.id">
								<div v-if="user.id === review.user" class="d-flex">
									<i class="far fa-user me-2 fs-5" ></i>
									<p v-if="user.id === review.user">{{ user.username }}</p>
								</div>
							</div>
						</div>
				<div class="d-flex justify-content-between">
					<div class="d-flex">
						<p class="text-start h4 me-4 fw-bold">{{review.review_title}}</p>
						
						<div v-if="review.rank==5">
							<i class="fas fa-star me-1 " style="color: gold" ></i>
							<i class="fas fa-star me-1 " style="color: gold" ></i>
							<i class="fas fa-star me-1 " style="color: gold" ></i>
							<i class="fas fa-star me-1 " style="color: gold" ></i>
							<i class="fas fa-star me-1 " style="color: gold" ></i>
						</div>
						<div v-else-if="review.rank==4">
							<i class="fas fa-star me-1 " style="color: gold" ></i>
							<i class="fas fa-star me-1 " style="color: gold" ></i>
							<i class="fas fa-star me-1 " style="color: gold" ></i>
							<i class="fas fa-star me-1 " style="color: gold" ></i>
							<i class="far fa-star"></i>
						</div>
						<div v-else-if="review.rank==3">
							<i class="fas fa-star me-1 " style="color: gold" ></i>
							<i class="fas fa-star me-1 " style="color: gold" ></i>
							<i class="fas fa-star me-1 " style="color: gold" ></i>
							<i class="far fa-star"></i>
							<i class="far fa-star"></i>
						</div>
						<div v-else-if="review.rank==2">
							<i class="fas fa-star me-1 " style="color: gold" ></i>
							<i class="fas fa-star me-1 " style="color: gold" ></i>
							<i class="far fa-star"></i>
							<i class="far fa-star"></i>
							<i class="far fa-star"></i>
						</div>
						<div v-else-if="review.rank==1 " >
							<i class="fas fa-star me-1 " style="color: gold" ></i>
							<i class="far fa-star"></i>
							<i class="far fa-star"></i>
							<i class="far fa-star"></i>
							<i class="far fa-star"></i>
						</div>
						<div v-else-if="review.rank==0">
							<i class="far fa-star"></i>
							<i class="far fa-star"></i>
							<i class="far fa-star"></i>
							<i class="far fa-star"></i>
							<i class="far fa-star"></i>
						</div>
						<p class="mx-3">{{review.created_at}}</p>
					</div>
					<div>
						<i 
						class="fas fa-edit mx-4 fs-5 pointer" v-if="authUser(review)"
						@click="updateForm(review)" :class="{marginTop: review.is_updated}"
						></i>
						<i 
							class="far fa-trash-alt fs-5 me-3 pointer" @click="reviewDelete(review)"
							v-if="authUser(review)"
						></i>
					
					</div>
				</div>
				<div class="mb-3 text-start border">
					<p class="ms-3 my-3">
						{{review.review_content}}
					</p>
				</div>
				
			</div>
			<ReviewUpdateForm v-if="review.is_updated" :review="review" />
			<div v-if="!review.is_updated">
				
			</div>

			<Comment :show_comment="review.show_comment" :reviewId="review.id"/>
			
		</div>
	</div>
</template>

<script>
import axios from "axios"
import Comment from './Comment.vue'
import ReviewUpdateForm from '@/components/ReviewUpdateForm.vue'
import jwt_decode from 'jwt-decode'

export default {
	components: { 
		Comment,
		ReviewUpdateForm,
   },
	name: 'ReviewList',
	data: function() {
		return {
			reviewList : [],
			reviewCount: '',
			isPressed: false,
			userList: [],
			
		}
	},
	methods: {
		reviewDelete: function(review) {
			const movieId = this.$route.params.movieId
		
			axios({
				method: 'DELETE',
				url: `http://127.0.0.1:8000/movies/${movieId}/reviews/${review.id}`,
			})
			.then(()=> {
				this.$router.go()
			})
		},
		updateForm: function (review) {
			review.is_updated = !review.is_updated
			
			return this.is_updated
		},
		commentCreate: function (review) {
			review.is_created = !review.is_created
			return console.log(review.is_created)

		},
		reviewId: function(review) {
			return `#review${review.id}`
		},

		authUser: function (review) {
			
			if (!localStorage.getItem('jwt')) {
				return false
			}

			const user = jwt_decode(localStorage.getItem('jwt'))
			if (user.user_id === review.user) {
				return true
			} else {
				return false
			}
		},

		
	},
	props: {

	},
	created: function () {
		const movieId = this.$route.params.movieId
		axios({
			
			method: 'GET',
			url: `http://127.0.0.1:8000/movies/${movieId}/reviews` 
		})
		.then(res => {
			this.reviewList = res.data
		})
		.then(() => {
			this.reviewCount = this.reviewList.length
		})
		.catch(() => {
			console.log('에러')
		})

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
	computed:{ 

		showComment: function (review) {
			review.show_comment = !review.show_comment
			return review.show_comment
		},

	}
}
</script>

<style>
.marginTop {
	margin-top: 50px;
}

.box {
	border: 1px solid white;
}

.pointer {
	cursor: pointer;
}

</style>