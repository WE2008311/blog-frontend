<template>
<div class="edit">
	<form action="#" method="post">
		<div class="form-group">
			<label for="ptitle">Title:</label>
			<input type="text" id="ptitle" placeholder="eg. Hello world" autocomplete="off" v-model.trim="title">
		</div>
		<div class="form-group">
			<label for="ptags">Tags:</label>
			<input type="text" id="ptags" placeholder="eg. Sparetire" autocomplete="off" v-model.trim="postTags">
			<dropdown :list="list" class="tag-list" @onDropdownChange="dropdownChange"></dropdown>
		</div>
	</form>
</div>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	form {
		width: 500px;
	}
	
	.form-group {
		margin-bottom: 10px;
		label {
			color: $globalBgColor;
			font-size: 16px;
			display: inline-block;
			width: 10%;
		}
		input {
			color: $pColor;
			width: 18em;
			font-family: $globalFontFamily;
			font-size: $pFontSize;
			padding: 6px 10px;
			border: 1px solid #888;
			border-radius: 4px;
			outline: none;
			transition: all 0.3s ease;
			&:hover,
			&:focus {
				border-color: $pColor;
				box-shadow: 0 0 2px 2px rgba($color: $globalBgColor, $alpha: 0.1);
			}
		}
	}
	
	.tag-list {
		margin-left: 10px;
	}
</style>

<script>
	import '../style/_reset.scss';
	import '../style/iconfont.css';
	import nprogress from 'nprogress';
	import Promise from 'bluebird';
	import 'nprogress/nprogress.css';
	import PostService from '../lib/post-service';
	import dropdown from './dropdown';
	/* global config */

	export default {
		data() {
			return {
				title: '',
				tags: [], // 下拉选择的 tags
				taglist: [] // 用于提交的 tags
			};
		},
		computed: {
			list() {
				return this.tags.map(item => {
					return {
						name: item
					};
				});
			},
			postTags() {
				return this.taglist.join();
			}
		},
		methods: {
			dropdownChange([id, index, name, value]) {
				this.taglist.push(name);
			}
		},
		components: {
			dropdown
		},
		beforeRouteEnter(to, from, next) {
			let id = to.params.id;
			nprogress.start();
			if (id) {
				Promise.all([PostService.getPostById(id), PostService.getTagList()])
					.then(([post, tags]) => {
						next(vm => {
							vm.tags = tags;
							vm.title = post.title;
							vm.taglist = post.tags;
							document.title = `Edit | ${config.title}`;
							nprogress.done();
						});
					})
					.catch(err => {
						console.error(err);
						nprogress.done();
						next(false);
					});
			} else {
				PostService.getTagList()
					.then(tags => {
						next(vm => {
							vm.tags = tags;
							document.title = `Edit | ${config.title}`;
							nprogress.done();
						});
					});
			}
		}
	};
</script>