<template>
<transition name="scroll-top">
	<div class="scroll-top" v-show="show" @click="gotoTop">
		<div class="scroll-wrapper">
			<i class="icon-arrow-up"></i>
		</div>
	</div>
</transition>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	@import '../style/main';
	$containerWidth: 40px;
	$border: 2px solid $globalBgColor;
	.scroll-top {
		display: inline-block;
	}
	
	.scroll-wrapper {
		color: $globalBgColor;
		background: $bodyBgColor;
		width: $containerWidth;
		height: $containerWidth;
		border: $border;
		border-radius: 100%;
		cursor: pointer;
		font-size: 22px;
		box-shadow: 0 3px 7px 3px rgba($color: $globalBgColor, $alpha: 0.2);
		display: inline-block;
		float: left;
		position: relative;
		transition: all 0.3s ease;
		i {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		&:hover {
			color: $globalFtColor;
			background: #777;
			border-color: #777;
			box-shadow: 0 3px 15px 3px rgba($color: $globalBgColor, $alpha: 0.2);
		}
	}
	
	.scroll-top-enter-active,
	.scroll-top-leave-active {
		transition: transform 0.3s ease;
	}
	
	.scroll-top-enter-active,
	.scroll-top-leave {
		transform: scale(1);
	}
	
	.scroll-top-enter,
	.scroll-top-leave-active {
		transform: scale(0);
	}
</style>

<script>
	import '../style/iconfont.css';
	import '../style/_reset.scss';
	let scroll = (interVal, speed) => () => {
		let position = $(window)
			.scrollTop();
		$(window)
			.scrollTop(position - interVal);
		if (position > 0) {
			interVal = position / 10;
			setTimeout(scroll(interVal, speed), speed);
		}
	};
	export default {
		data() {
			return {
				show: false
			};
		},
		beforeMount() {
			let ctx = this;
			$(() => {
				$(window).on('scroll', () => {
					let position = $(window).scrollTop();
					if (position > 200 && !ctx.show) {
						ctx.show = true;
					} else if (position < 200 && ctx.show) {
						ctx.show = false;
					}
				});
			});
		},
		methods: {
			gotoTop() {
				let interVal = $(window).scrollTop() / 10;
				setTimeout(scroll(interVal, 17), 0);
			}
		}
	};
</script>