<template>
<div class="pagination">
	<ul>
		<li @click="prev">«</li>
		<router-link v-for="page in currentWindow" tag="li" :to="{name: route, params: {page}}" active-class="cur-page" exact>{{page}}</router-link>
		<li @click="next">»</li>
	</ul>
</div>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	$itemWidth: 35px;
	$itemHeight: 30px;
	$itemHoverBgColor: #ddd;
	$border: 1px solid rgba($color: #555, $alpha: 0.5);
	.pagination {
		display: inline-block;
		ul {
			color: $globalBgColor;
			border: $border;
			border-radius: 5px;
			overflow: hidden;
		}
		li {
			font-size: $pFontSize;
			text-align: center;
			width: $itemWidth;
			height: $itemHeight;
			line-height: $itemHeight;
			cursor: pointer;
			border-right: $border;
			float: left;
			display: inline-block;
			transition: background 0.3s ease;
			&:last-of-type {
				border: none;
			}
			&:hover {
				background: $itemHoverBgColor;
			}
		}
		.cur-page {
			color: $globalFtColor;
			background: $globalBgColor;
			&:hover {
				background: $globalBgColor;
			}
		}
	}
</style>

<script>
	import util from '../lib/util';
	import '../style/_reset.scss';
	export default {
		data() {
			return {
				currentPage: 1
			};
		},
		methods: {
			prev() {
				if (this.currentPage <= 1) {
					return;
				}
				this.$router.push({
					name: this.route,
					params: {
						page: this.currentPage - 1
					}
				});
			},
			next() {
				if (this.currentPage >= this.totalPage) {
					return;
				}
				this.$router.push({
					name: this.route,
					params: {
						page: this.currentPage + 1
					}
				});
			}
		},
		beforeMount() {
			this.currentPage = parseInt(this.$route.params.page, 10);
			if (this.currentPage < 1 || this.currentPage > this.totalPage || isNaN(this.currentPage)) {
				this.$router.replace({
					name: this.route,
					params: {
						page: 1
					}
				});
			}
		},
		watch: {
			'$route' (to, from) {
				this.currentPage = parseInt(to.params.page, 10);
				if (this.currentPage < 1 || this.currentPage > this.totalPage || isNaN(this.currentPage)) {
					this.$router.replace({
						name: this.route,
						params: {
							page: 1
						}
					});
				}
			}
		},
		computed: {
			totalPage() {
				return Math.ceil(this.total / this.limit);
			},
			currentWindow() {
				let start = 0;
				if (this.totalPage) {
					start = this.currentPage % this.windowLimit ? Math.floor(this.currentPage /
							this.windowLimit) * this.windowLimit + 1 : this.currentPage - this.windowLimit +
						1;
					if (start + this.windowLimit > this.totalPage) {
						return util.range(start, this.totalPage - start + 1);
					} else if (start + this.windowLimit === this.totalPage) {
						return util.range(start, this.totalPage - start);
					} else {
						return util.range(start, this.windowLimit);
					}
				} else {
					return [];
				}
			}
		},
		props: {
			// 总项数
			total: {
				type: Number,
				required: true
			},
			// 每页项数
			limit: {
				type: Number,
				required: true
			},
			// 最多显示多少页
			windowLimit: {
				type: Number,
				required: true
			},
			// 基础路
			route: {
				required: true
			}
		}
	};
</script>