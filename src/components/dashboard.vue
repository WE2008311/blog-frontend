<template>
<div id="dashboard">
	<ul>
		<router-link :to="item.route" tag="li" class="item" v-for="item in items">
			<div class="icon-wrapper">
				<i :class="item.icon"></i>
			</div>
			<div class="desc">{{item.desc}}</div>
		</router-link>
	</ul>
</div>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	$itemWidth: 120px;
	$itemHeight: 140px;
	$iconWrapperWidth: 50px;
	$iconWidth: 26px;
	$wrapperPadding: 10px;
	ul {
		width: 100%;
		overflow: hidden;
	}
	
	.item {
		width: $itemWidth;
		height: $itemHeight;
		margin: 5px 10px 20px;
		float: left;
		cursor: pointer;
		border: 2px solid rgba($color: $pColor, $alpha: 0.5);
		border-radius: 5px;
		box-shadow: 0 0 2px rgba($color: $pColor, $alpha: 0.3);
		position: relative;
		transition: box-shadow 0.3s ease;
		.desc {
			color: #777;
			font-size: 20px;
			text-align: center;
			width: 100%;
			box-sizing: border-box;
			padding: 0 $wrapperPadding 12px;
			position: absolute;
			bottom: 0;
		}
		.icon-wrapper {
			width: $iconWrapperWidth;
			height: $iconWrapperWidth;
			border: 2px solid rgba($color: $globalBgColor, $alpha: 0.6);
			border-radius: 100%;
			position: absolute;
			top: 15px;
			left: $wrapperPadding;
		}
		i {
			color: rgba($color: $pColor, $alpha: 0.8);
			font-size: $iconWidth;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		&:hover {
			box-shadow: 0 0 5px rgba($color: $globalBgColor, $alpha: 0.5);
		}
	}
</style>

<script>
	import '../style/_reset.scss';
	import '../style/iconfont.css';
	import nprogress from 'nprogress';
	import 'nprogress/nprogress.css';
	/* global config */

	export default {
		props: {
			items: Array
		},
		beforeRouteEnter(to, from, next) {
			nprogress.start();
			document.title = `Dashboard | ${config.title}`;
			next(vm => nprogress.done());
		}
	};
</script>