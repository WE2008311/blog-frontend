<template>
<div id="main-container" :class="{'is-large': extend}">
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
		z-index: 5;
	}

	.is-large {
		min-width: 1000px!important;
		max-width: 1200px!important;
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
		},
		props: {
			extend: {
				type: Boolean,
				default: false
			}
		}
	};
</script>