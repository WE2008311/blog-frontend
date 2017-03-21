<template>
<transition name="fade">
	<div class="loading" v-show="show">
		<div class="pacman">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	</div>
</transition>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	.loading {
		background: rgba($color: #000, $alpha: 0.7);
		border-radius: 10px;
		display: inline-block;
		transition: opacity 0.3s ease;
	}

	.fade-enter, .fade-leave-to {
		opacity: 0;
	}

	$manRadius: 10px;
	$ballWidth: 5px;
	$left: 22px;
	$distance: 50px;
	.pacman {
		width: 100px;
		height: 40px;
		position: relative;
		div:first-of-type {
			width: 0px;
			height: 0px;
			border-right: $manRadius solid transparent;
			border-top: $manRadius solid #fff;
			border-left: $manRadius solid #fff;
			border-bottom: $manRadius solid #fff;
			border-radius: $manRadius;
			animation: rotate_pacman_half_up 0.5s 0s infinite;
			position: absolute;
			top: 50%;
			margin-top: -$manRadius;
			left: $left;
		}
		div:nth-child(2) {
			width: 0px;
			height: 0px;
			border-right: $manRadius solid transparent;
			border-top: $manRadius solid #fff;
			border-left: $manRadius solid #fff;
			border-bottom: $manRadius solid #fff;
			border-radius: $manRadius;
			animation: rotate_pacman_half_down 0.5s 0s infinite;
			position: absolute;
			top: 50%;
			margin-top: -$manRadius;
			left: $left;
		}
		div:nth-child(3) {
			animation: pacman-balls 1s -0.66s infinite linear;
		}
		div:nth-child(4) {
			animation: pacman-balls 1s -0.33s infinite linear;
		}
		div:nth-child(5) {
			animation: pacman-balls 1s 0s infinite linear;
		}
		div:nth-child(3),
		div:nth-child(4),
		div:nth-child(5),
		div:nth-child(6) {
			background-color: #fff;
			width: $ballWidth;
			height: $ballWidth;
			border-radius: 100%;
			position: absolute;
			top: 50%;
			margin-top: -$ballWidth / 2;
			left: $distance + $left;
		}
	}

	@keyframes rotate_pacman_half_up {
		0% {
			transform: rotate(270deg);
		}
		50% {
			transform: rotate(360deg);
		}
		100% {
			transform: rotate(270deg);
		}
	}

	@keyframes rotate_pacman_half_down {
		0% {
			transform: rotate(90deg);
		}
		50% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(90deg);
		}
	}

	@keyframes pacman-balls {
		75% {
			opacity: 0.7;
		}
		100% {
			transform: translate(-$distance, 0);
		}
	}
</style>

<script>
	import '../style/_reset.scss';
	export default {
		props: {
			show: {
				default: false
			}
		}
	};
</script>