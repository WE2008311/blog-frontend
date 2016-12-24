<template>
<div id="main-container">
	<slot></slot>
	<scrollTop class="s-top"></scrollTop>
</div>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	#main-container {
		margin-left: $navBarWidth;
		padding: 50px 80px 0;
		min-width: 600px;
		max-width: 800px;
		position: relative;
	}

	.s-top {
		position: fixed;
		right: 20px;
		bottom: 40px;
	}
</style>

<script>
	import '../style/_reset.scss';
	import scrollTop from './scroll-top';
	export default {
		// data() {
		// 	return {
		// 		showScrollTop: true
		// 	};
		// },
		components: {
			scrollTop
		}
	};
</script>