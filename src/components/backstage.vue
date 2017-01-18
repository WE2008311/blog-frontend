<template>
<div id="app">
	<transition name="nav-show">
		<nav-bar v-show="showNav" :logo="logo" :title="title" :sub-title="subTitle" :nav-list="navList"></nav-bar>
	</transition>
	<main-container :class="{'rm-margin': resizeMain}">
		<transition name="main" mode="out-in">
			<router-view></router-view>
		</transition>
	</main-container>
</div>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	.nav-show-enter-active,
	.nav-show-leave-active {
		transition: transform 0.3s ease;
	}
	
	.nav-show-enter,
	.nav-show-leave-active {
		transform: translateX(-$navBarWidth);
	}
	
	.rm-margin {
		margin-left: 0!important;
	}

	.main-enter-active, .main-leave-active {
		transition: all 0.3s ease;
	}
	
	.main-enter {
		opacity: 0;
		transform: translateX(150px);
	}

	.main-leave-active {
		opacity: 0;
		transform: translateX(-150px);
	}


</style>

<script>
	import '../style/_reset.scss';
	// 如果用@import会导致body选择器带属性选择器，而vue是不会把body添加scoped属性的，所以选不到body
	import '../style/_main.scss';
	import navBar from './nav-bar';
	import mainContainer from './main-container';
	import config from '../config/app.backstage';

	window.config  = config;
	config.showNav = true;
	config.resizeMain = false;
	export default {
		data() {
			return config;
		},
		mounted() {
			let ctx = this;
			$(window).on('resize', (event) => {
				ctx.resizeMain = !(ctx.showNav = $(window).width() > 800);
			});
		},
		components: {
			mainContainer,
			navBar
		}
	};
</script>