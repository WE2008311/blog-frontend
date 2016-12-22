<template>
<div id="avatar-container">
	<div id="avatar" @click="goto">
		<img src="../assets/avatar.jpg">
	</div>
</div>
</template>

<style lang="sass" scoped>
	$logoLength: 90px;
	$avatarLength: 70px;
	#avatar-container {
		width: $logoLength;
		height: $logoLength;
		display: inline-block;
		position: relative;
	}
	
	#avatar {
		width: $avatarLength;
		height: $avatarLength;
		border-radius: 100%;
		margin: auto;
		cursor: pointer;
		overflow: hidden;
		box-shadow: 0 0 8px #fff;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		animation: scaleAvatar 0.4s ease;
		transition: transform 0.3s ease;
		img {
			width: $avatarLength;
			height: $avatarLength;
		}
		&:hover {
			transform: rotate(375deg);
		}
	}
	@keyframes scaleAvatar {
		0% {
			transform: scale(0);
		}
		70% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
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
			}
		}
	};
</script>