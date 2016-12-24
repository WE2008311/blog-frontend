<template>
<div id="home">
	<div id="posts-prev-list">
		<div class="post-prev" v-for="post in posts">
			<h1 class="prev-title">
				<router-link tag="span" :to="{name: postsRoute, params: {id: post.id}}">{{post.title}}</router-link>
			</h1>
			<h3 class="prev-info">
				<span>Posted by <span class="prev-blue">{{post.author}}</span></span>
				<span>on <span class="prev-blue">{{post.year}}/{{post.month}}/{{post.day}}</span></span>
			</h3>
			<div class="summary" v-html="post.content"></div>
			<div class="more-bar"><router-link :to="{name: postsRoute, params: {id: post.id}}" class="read-more">more <i class="icon-circle-right"></i></router-link></div>
		</div>
	</div>
	<div class="pagination-bar">
		<pagination :total="total" :limit="limit" :window-limit="windowLimit" :current-page="currentPage" :route="homeRoute"></pagination>
	</div>
</div>
</template>

<style lang="sass">
	// 这里有坑，不能用scoped，否则sass编译出来的summary下的h1等会带有属性选择器
	// 而又因为summary下的标签是动态渲染出来的，所以vue-loader在编译时是不存在的，无法添加相关属性
	// 导致属性选择器选不到
	@import '../style/common';
	$titleFtSize: 28px;
	$infoFtSize: 14px;
	#home {
		overflow: hidden;
		position: relative;
		min-height: 650px;
	}
	
	#posts-prev-list {
		margin-bottom: 80px;
	}
	
	.post-prev {
		padding-bottom: 10px;
		margin: 25px 0;
		border-bottom: 1px solid rgba($color: #000, $alpha: 0.1);
	}
	
	.prev-title {
		color: $hColor;
		text-align: center;
		font-weight: 500;
		font-size: $titleFtSize;
		margin-bottom: 5px;
		span {
			$underlineWidth: 2px;
			display: inline-block;
			cursor: pointer;
			position: relative;
			&::after {
				content: "";
				height: $underlineWidth;
				border-radius: $underlineWidth;
				display: inline-block;
				background: $hColor;
				position: absolute;
				bottom: 0;
				left: 51%;
				right: 51%;
				transition: all 0.3s ease;
			}
			&:hover {
				&::after {
					left: 0;
					right: 0;
				}
			}
		}
	}
	
	.prev-info {
		color: $pColor;
		text-align: center;
		font-size: $infoFtSize;
		font-weight: 400;
	}
	
	.prev-blue {
		color: $infoBlue;
		cursor: pointer;
		&:hover {
			color: $infoHoverBlue;
		}
	}
	
	.summary {
		color: $pColor;
		font-size: $pFontSize;
		margin: 15px 0;
		h1 {
			font-size: 22px;
			font-weight: 500;
		}
		h2,
		h3,
		h4,
		h5,
		h6 {
			font-size: 18px;
			font-weight: 500;
		}
		h1,
		h2,
		h3,
		h4,
		h5,
		h6,
		p,
		pre,
		table,
		ul,
		ol {
			margin: 10px 0;
		}
	}
	
	.more-bar {
		text-align: right;
	}
	
	.read-more {
		color: #777;
		font-size: 12px;
		margin-right: 20px;
		i {
			font-size: 10px;
			vertical-align: middle;
		}
		&:hover {
			color: $pColor;
			border-bottom: 1px solid rgba($color: $pColor, $alpha: 0.5);
		}
	}

	.pagination-bar {
		width: 100%;
		text-align: center;
		position: absolute;
		left: 0;
		bottom: 20px;
	}
</style>

<script>
	import '../style/_reset.scss';
	import nprogress from 'nprogress';
	import 'nprogress/nprogress.css';
	import pagination from './pagination';
	import PostService from '../lib/post-service';
	/* global config */

	export default {
		data() {
			return {
				total: 501,
				limit: 5,
				windowLimit: 10,
				currentPage: 11,
				homeRoute: 'home',
				postsRoute: 'posts',
				posts: []
			};
		},
		components: {
			pagination
		},
		// watch的意义在于当翻页时，即/home/1到/home/2，组件被复用，
		// 没有重新实例化，也就不会触发beforeRouteEnter，也就不会发起请求，
		// 所以还需要监听路由变化来发起请求
		watch: {
			'$route' (to, from) {
				nprogress.start();
				PostService.getPosts(to.params.page || 1, 5)
				.then(data => {
					this.total = data.total;
					this.posts = data.posts;
					nprogress.done();
				})
				.catch(err => {
					console.error(err);
					nprogress.done();
				});
			}
		},
		beforeRouteEnter(to, from, next) {
			nprogress.start();
			PostService.getPosts(to.params.page || 1, 5)
			.then(data => {
				next(vm => {
					vm.total = data.total;
					vm.posts = data.posts;
					document.title = `Home | ${config.title}`;
					nprogress.done();
				});
			})
			.catch(err => {
				console.error(err);
				nprogress.done();
				next(false);
			});
		}
	};
</script>