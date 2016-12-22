<template>
<div id="home">
	<div id="posts-prev-list">
		<div class="post-prev" v-for="post in posts">
			<h1 class="prev-title">
				<span>Test</span>
			</h1>
			<h3 class="prev-info">
				<span>Posted by <span class="prev-blue">{{post.author}}</span></span>
				<span>on <span class="prev-blue">{{post.year}}/{{post.month}}/{{post.day}}</span></span>
			</h3>
			<div class="summary" v-html="post.content"></div>
			<div class="more-bar"><router-link to="/" class="read-more">more <i class="icon-circle-right"></i></router-link></div>
		</div>
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
</style>

<script>
	import '../style/_reset.scss';
	import nprogress from 'nprogress';
	import Promise from 'bluebird';
	import trimHtml from 'trim-html';
	import 'nprogress/nprogress.css';
	import MarkdownParser from '../lib/markdown-parser';
	/* global apis */

	let parser = new MarkdownParser();

	function whileRoute(to, from, next) {
		// tmpPosts用来穿透Promise
		let pm = [],
			tmpPosts = [],
			page = to.params.id || 1,
			limit = 5;
		nprogress.start();

		return apis.getPosts.get({
			page,
			limit
		})
		.then(resp => {
			nprogress.inc(0.3);
			let posts = resp.data.posts;
			tmpPosts = posts;
			for (let i in posts) {
				pm.push(parser.parse(posts[i].content));
			}
			return Promise.all(pm);
		})
		.then(contents => {
			nprogress.inc(0.3);
			for (let k in contents) {
				tmpPosts[k].content = trimHtml(contents[k], {
					limit: 400
				}).html;
			}
			nprogress.done();
			return tmpPosts;
		});
	}

	export default {
		data() {
			return {
				total: 0,
				posts: []
			};
		},
		props: {
			config: {
				type: Object
			}
		},
		// watch的意义在于当翻页时，即/home/1到/home/2，组件被复用，
		// 没有重新实例化，也就不会触发beforeRouteEnter，也就不会发起请求，
		// 所以还需要监听路由变化来发起请求
		watch: {
			'$route' (to, from) {
				whileRoute(to, from).then(posts => {
					this.posts = posts;
				}).catch(err => {
					nprogress.done();
				});
			}
		},
		beforeRouteEnter(to, from, next) {
			whileRoute(to, from, next).then(posts => {
				next(vm => {
					vm.posts = posts;
					document.title = `Home | ${vm.config.title}`;
				});
			}).catch(err => {
				nprogress.done();
			});
		}
	};
</script>