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
	<editor :title="title" :content="content"></editor>
	<footer>
		<button class="submit" @click="submit"><i class="icon-spinner" v-show="isLoading"></i>Submit</button>
	</footer>
	<toast :content="toastContent" :show="showToast" @close="closeToast"></toast>
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

	footer {
		$bgColor: #999;
		margin-top: 30px;
		margin-bottom: 50px;
		text-align: center;
		.submit {
			color: #fff;
			cursor: pointer;
			text-align: center;
			font-size: 14px;
			background: $bgColor;
			width: 100px;
			height: 32px;
			border: none;
			outline: none;
			border-radius: 8px;
			box-shadow: 0 0 3px rgba($color: #333, $alpha: 0.5);
			transition: background 0.3s ease;
			position: relative;
			&:hover {
				background: rgba($color: $bgColor, $alpha: 0.9);
			}
			i {
				font-size: 12px;
				position: absolute;
				top: 50%;
				left: 10px;
				transform: translateY(-50%);
				animation: spin 1.5s linear infinite;
			}
		}
	}

	@keyframes spin {
		0% {
			transform: translateY(-50%) rotate(0deg);
		}
		100% {
			transform: translateY(-50%) rotate(359deg);
		}
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
	import editor from './editor';
	import toast from './toast.vue';
	/* global config */

	export default {
		data() {
			return {
				title: '',
				content: '',
				toastContent: '',
				tags: [], // 下拉选择的 tags
				taglist: [], // 用于提交的 tags
				isLoading: false,
				showToast: false
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
			},
			closeToast() {
				this.showToast = false;
			},
			submit() {
				// 防止重复提交
				if (this.isLoading) {
					return;
				}
				this.isLoading = true;
				// TODO 这里的代码有点蠢，重复太多，考虑改下
				if (this.$route.name === 'new') {
					PostService.createPost({
						title: this.title,
						tags: this.taglist,
						content: this.content
					})
					.then(msg => {
						this.isLoading = false;
						this.toastContent = msg;
						this.showToast = true;
					})
					.catch(err => {
						this.isLoading = false;
						console.error(err);
					});
				} else if (this.$route.name === 'edit') {
					// TODO 考虑id可能是数字要做类型转换
					PostService.modifyPost({
						id: this.$route.params.id,
						title: this.title,
						tags: this.taglist,
						content: this.content
					})
					.then(msg => {
						this.isLoading = false;
						this.toastContent = msg;
						this.showToast = true;
					})
					.catch(err => {
						this.isLoading = false;
						console.error(err);
					});
				} else {
					throw new Error('Invalid Route');
				}
			}
		},
		components: {
			dropdown,
			editor,
			toast
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
							vm.content = post.rawContent;
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
					})
					.catch(err => {
						console.error(err);
						nprogress.done();
						next(false);
					});
			}
		},
		beforeRouteLeave(to, from, next) {
			// 如果正在提交还未响应，不允许跳转
			if (this.isLoading) {
				next(false);
			} else {
				next();
			}
		}
	};
</script>