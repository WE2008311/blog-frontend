<template>
<div id="cube-container" @click="goto">
	<div id="cube">
		<div :id="'side-' + index" class="side" v-for="(item, index) in sides">{{item}}</div>
	</div>
</div>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	$logoLength: 90px;
	$logoPsctOrigin: $logoLength / 2;
	$logoPsctLength: 500px;
	$logoAnimationDur: 3s;
	$sideBorderWidth: 2px;
	$sideBorderColor: rgba($color: #000, $alpha: 0.5);
	$sideLength: 40px;
	$sideMgLength: $sideLength+$sideBorderWidth * 2;
	$sideTransitionDur: 2s;
	$sideContentColor: $logoFtColor;
	$sideContentHoverColor: $logoFtTransColor;
	$sideContentSize: 16px;
	$sideColorMap: (
		'side-0': rgba(202, 199, 43, 0.5),
		'side-1': rgba(235, 158, 38, 0.5),
		'side-2': rgba(207, 68, 30, 0.5),
		'side-3': rgba(116, 6, 61, 0.5),
		'side-4': rgba(28, 16, 85, 0.5),
		'side-5': rgba(12, 66, 102, 0.5));
	#cube-container {
		width: $logoLength;
		height: $logoLength;
		display: inline-block;
		perspective: $logoPsctLength;
		perspective-origin: $logoPsctOrigin $logoPsctOrigin;
		position: relative;
		animation: scaleCube 0.4s ease;
	}

	@keyframes scaleCube {
		0% {
			transform: scale(0);
		}
		75% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}
	
	#cube {
		width: $sideMgLength;
		height: $sideMgLength;
		margin: auto;
		cursor: pointer;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		transform-origin: 0 0;
		transform-style: preserve-3d;
		animation: cube $logoAnimationDur linear infinite;
		&:hover {
			@each $key, $value in $sideColorMap {
				##{$key} {
					color: $sideContentHoverColor;
					background: $value;
				}
			}
		}
	}
	
	@keyframes cube {
		to {
			transform: rotate3d(1, 1, 1, 359deg);
		}
	}
	
	.side {
		color: $sideContentColor;
		width: $sideLength;
		height: $sideLength;
		line-height: $sideLength;
		text-align: center;
		font-size: $sideContentSize;
		border: $sideBorderWidth solid $sideBorderColor;
		user-select: none;
		position: absolute;
		top: 0;
		left: 0;
		transition: all $sideTransitionDur ease;
	}
	
	#side-0 {
		transform-origin: 0 0;
		transform: rotateX(90deg);
	}
	
	#side-1 {
		/* 底部旋转1px修正 */
		transform-origin: 0 $sideMgLength - 1px;
		transform: rotateX(-90deg);
	}
	
	#side-2 {
		transform-origin: 0 0;
		transform: rotateY(-90deg);
	}
	
	#side-3 {
		/* 右边旋转1px修正 */
		transform-origin: $sideMgLength - 1px 0;
		transform: rotateY(90deg);
	}
	
	#side-4 {
		/* 向外平移1px修正 */
		transform: translateZ($sideMgLength - 1px);
	}
</style>

<script>
	import '../style/_reset.scss';
	export default {
		methods: {
			goto() {
				/* eslint: disabled */
				this.url && (window.location.href = this.url);
			}
		},
		props: {
			url: {
				type: String
			},
			sides: {
				type: Array,
				default: ['', '', '', '', '', '']
			}
		}
	};
</script>