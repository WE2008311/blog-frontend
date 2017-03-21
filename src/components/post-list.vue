<template>
<div class="post-list">
	<ul>
		<li v-for="(post, index) in posts">
			<router-link :to="post.route">{{post.title}}</router-link>
			<div class="operations">
				 <i :class="oper" v-for="(oper, i) in post.operations" @click="doOperate(index, i)"></i>
			</div>
		</li>
	</ul>
</div>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	$titleHeight: 50px;
	$titleColor: #555;
	$titleHoverColor: #333;
	$titleFontSize: 20px;
	$borderColor: #ccc;
	$borderHoverColor: #555;
	.post-list {
		width: 100%;
		li {
			width: 100%;
			height: $titleHeight;
			line-height: $titleHeight;
			box-sizing: border-box;
			padding: 0 10px 0 25px;
			border-bottom: 1px dashed $borderColor;
			overflow: hidden;
			position: relative;
			transition: border-color 0.3s ease;
			a {
				color: $titleColor;
				font-size: $titleFontSize;
				display: inline-block;
				max-width: 500px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				transition: color 0.3s ease;
			}
			&:hover {
				border-color: $borderHoverColor;
				a {
					color: $titleHoverColor;
				}
				&::before {
					background: $globalBgColor;
				}
			}
			&::before {
				content: "";
				width: 5px;
				height: 5px;
				display: inline-block;
				background: $borderColor;
				border-radius: 100%;
				position: absolute;
				left: 8px;
				top: 50%;
				margin-top: -2px;
				transition: background 0.3s ease;
			}
		}
	}
	
	.operations {
		float: right;
		i {
			color: $globalBgColor;
			font-size: 18px;
			cursor: pointer;
			margin-left: 5px;
			display: inline-block;
			transition: all 0.3s ease;
			&:hover {
				color: #777;
				transform: scale(1.1);
			}
		}
	}
</style>

<script>
	import '../style/_reset.scss';
	import '../style/iconfont.css';
	export default {
		methods: {
			doOperate(postIdx, operIdx) {
				this.$emit('operate', postIdx, operIdx, this.cid);
			}
		},
		props: {
			cid: {
				type: Number
			},
			posts: {
				type: Array
			}
		}
	};
</script>