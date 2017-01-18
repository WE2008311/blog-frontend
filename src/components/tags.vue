<template>
<div id="tags">
	<div class="tags-bar">
		<h1 class="tags-title">Tags</h1>
		<tag-filter :tags="tags"></tag-filter>
	</div>
	<div class="posts">
		<div class="posts-header">
			<h1 class="tag-name">{{curTag || `${posts.length} posts`}}</h1>
			<div class="search-bar">
				<input type="text" name="search" size="20" placeholder="搜索标题中的关键字" autocomplete="off" v-model.trim="query">
				<i class="icon-search"></i>
			</div>
		</div>
		<post-list :posts="posts"></post-list>
	</div>
</div>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	$titleFtSize: 28px;
	$titlePadding: 10px;
	$titleMargin: 15px;
	.tags-bar {
		margin-bottom: 20px;
	}
	
	.tags-title {
		color: $hColor;
		font-size: $titleFtSize;
		font-weight: 500;
		padding-bottom: $titlePadding;
		margin-bottom: $titleMargin;
		border-bottom: 2px solid rgba($color: #000, $alpha: 0.2);
	}
	
	.posts-header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
		padding-bottom: $titlePadding;
		border-bottom: 2px solid rgba($color: #000, $alpha: 0.2);
	}
	
	.tag-name {
		color: $hColor;
		font-size: $titleFtSize;
		font-weight: 500;
	}
	
	.search-bar {
		position: relative;
		input {
			width: 9em;
			font-family: $globalFontFamily;
			font-size: $pFontSize;
			padding: 6px 2.5em 6px 10px;
			border: 1px solid $pColor;
			border-radius: 4px;
			outline: none;
			transition: all 0.3s ease;
			&:hover {
				width: 16em;
				box-shadow: 0 0 2px 2px rgba($color: $globalBgColor, $alpha: 0.1);
			}
		}
		.icon-search {
			font-size: $pFontSize * 1.3;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			right: 0.4em;
		}
	}
</style>

<script>
	import '../style/_reset.scss';
	import '../style/iconfont.css';
	import nprogress from 'nprogress';
	import 'nprogress/nprogress.css';
	import PostService from '../lib/post-service';
	import tagFilter from './tag-filter';
	import postList from './post-list';
	/* global config */

	export default {
		data() {
			return {
				curTag: '', // 当前选中的 tag
				tagsData: [], // 原始数据，
				query: '' // 搜索条件
			};
		},
		computed: {
			tags() {
				return this.tagsData.map(item => ({
					name: item.name,
					route: {
						name: 'tag',
						params: {
							tag: item.name
						}
					}
				}));
			},
			posts() {
				if (this.query) {
					return this.tagsData
					.reduce((a, b) => a.
						concat(b.posts.map(post => (post.route = {
							name: 'posts',
							params: {
								id: post.id
							}
						}) && post)), [])
						.filter(post => post.title.indexOf(this.query) != -1);
				} else if (!this.curTag) {
					return this.tagsData.reduce((a, b) => a.concat(b.posts.map(post => (post.route = {
						name: 'posts',
						params: {
							id: post.id
						}
					}) && post)), []);
				} else {
					let curTagObj = this.tagsData.filter(a => a.name === this.curTag)[0];
					return curTagObj ? curTagObj.posts.map(post => (post.route = {
						name: 'posts',
						params: {
							id: post.id
						}
					}) && post) : [];
				}
			}
		},
		watch: {
			'$route' (to, from) {
				this.curTag = to.params.tag;
				// 路由变化的时候清空查询条件
				this.query = '';
			}
		},
		components: {
			tagFilter,
			postList
		},
		beforeRouteEnter(to, from, next) {
			// 从 tags 跳到 tag 的时候不做请求，防止重复请求
			if (from.name === 'tags' && to.name === 'tag') {
				next();
				return;
			}
			nprogress.start();
			let tag = to.params.tag;
			PostService.getTags()
				.then(data => {
					document.title = `Tags | ${config.title}`;
					next(vm => {
						vm.tagsData = data.tags;
						vm.curTag = tag;
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