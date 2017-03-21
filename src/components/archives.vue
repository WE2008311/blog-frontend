<template>
<div id="archives">
	<div class="archive-container">
		<div class="archive-list" v-for="(archive, index) in archives" :key="index">
			<div class="archive">
				<h1 class="archive-date"><i class="icon-table"></i>{{archive.year}}/{{archive.month}}</h1>
				<post-list :posts="archive.posts" :cid="index" @operate="operate"></post-list>
			</div>
		</div>
	</div>
	<div class="pagination-container">
		<pagination :total="total" :limit="limit" :window-limit="windowLimit" :route="archivesRoute"></pagination>
	</div>
	<loading class="loading-pos" :show="isLoading" @close="closeLoading"></loading>
	<toast :content="toastContent" :show="showToast" @close="closeToast"></toast>
</div>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	$titleFtSize: 26px;
	$iconSize: 22px;
	#archives {
		overflow: hidden;
		position: relative;
	}

	.archive {
		margin-bottom: 20px;
	}

	.archive-container {
		min-height: 650px;
		margin-bottom: 80px;
	}

	.archive-date {
		color: $hColor;
		font-size: $titleFtSize;
		font-weight: 500;
		i {
			font-size: $iconSize;
			margin-right: 10px;
			vertical-align: baseline;
		}
	}

	.pagination-container {
		width: 100%;
		text-align: center;
		position: absolute;
		left: 0;
		bottom: 20px;
	}

	.loading-pos {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 20;
	}
</style>

<script>
	import '../style/_reset.scss';
	import nprogress from 'nprogress';
	import 'nprogress/nprogress.css';
	import pagination from './pagination';
	import postList from './post-list';
	import loading from './loading.vue';
	import toast from './toast.vue';
	import PostService from '../lib/post-service';
	/* global config */

	export default {
		data() {
			return {
				total: 1,
				limit: config.pageLimit,
				windowLimit: config.windowLimit,
				toastContent: '',
				archivesRoute: 'archives',
				archives: [],
				isLoading: false,
				showToast: false
			};
		},
		methods: {
			closeLoading() {
				this.isLoading = false;
			},
			closeToast() {
				this.showToast = false;
			},
			operate(postIdx, operIdx, id) {
				if (operIdx === 0) {
					this.$router.push({
						name: 'edit',
						params: {
							id: this.archives[id].posts[postIdx].id
						}
					});
				} else if (operIdx === 1) {
					this.isLoading = true;
					PostService.deletePost(this.archives[id].posts[postIdx].id)
						.then(msg => {
							// TODO
							this.toastContent = msg;
							this.isLoading = false;
							this.showToast = true;
							this.archives[id].posts.splice(postIdx, 1);
							if (!this.archives[id].posts.length) {
								this.archives.splice(id, 1);
							}
						})
						.catch(err => {
							this.isLoading = false;
							console.error(err);
						});
				}
			}
		},
		components: {
			pagination,
			postList,
			loading,
			toast
		},
		watch: {
			'$route' (to, from) {
				nprogress.start();
				PostService.getArchives(to.params.page || 1, config.pageLimit)
					.then(data => {
						data.archives.forEach(archive => archive.posts
							.forEach(post => (post.route = {
								name: 'posts',
								params: {
									id: post.id
								}
							}, post.operations = ['icon-pencil', 'icon-bin'])));
						this.archives = data.archives;
						this.total = data.total;
						document.title = `Archives | ${config.title}`;
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
			PostService.getArchives(to.params.page || 1, config.pageLimit)
				.then(data => {
					document.title = `Archives | ${config.title}`;
					next(vm => {
						data.archives.forEach(archive => archive.posts
							.forEach(post => (post.route = {
								name: 'posts',
								params: {
									id: post.id
								}
							}, post.operations = ['icon-pencil', 'icon-bin'])));
						vm.archives = data.archives;
						vm.total = data.total;
						nprogress.done();
					});
				})
				.catch(err => {
					console.error(err);
					nprogress.done();
					next(false);
				});
		},
		beforeRouteLeave(to, from, next) {
			if (this.isLoading) {
				next(false);
			} else {
				next();
			}
		}
	};
</script>