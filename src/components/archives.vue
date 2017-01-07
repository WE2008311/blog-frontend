<template>
<div id="archives">
	<div class="archive-container">
		<div class="archive-list" v-for="archive in archives">
			<div class="archive">
				<h1 class="archive-date"><i class="icon-table"></i>2016/12</h1>
				<post-list :posts="archive.posts" @operate="operate"></post-list>
			</div>
		</div>
	</div>
	<div class="pagination-container">
		<pagination :total="total" :limit="limit" :window-limit="windowLimit" :route="archivesRoute"></pagination>
	</div>
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
</style>

<script>
	import '../style/_reset.scss';
	import nprogress from 'nprogress';
	import 'nprogress/nprogress.css';
	import pagination from './pagination';
	import postList from './post-list';
	import PostService from '../lib/post-service';
	/* global config */

	export default {
		data() {
			return {
				total: 1,
				limit: config.pageLimit,
				windowLimit: config.windowLimit,
				archivesRoute: 'archives',
				archives: []
			};
		},
		methods: {
			operate(postIdx, operIdx, id) {
				console.log(postIdx);
				console.log(operIdx);
				console.log(id);
			}
		},
		components: {
			pagination,
			postList
		},
		watch: {
			'$route' (to, from) {
				nprogress.start();
				PostService.getArchives(to.params.page || 1, config.pageLimit).then(data => {
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
				});
		}
	};
</script>