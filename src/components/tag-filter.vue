<template>
<div class="tag-filter">
	<ul>
		<router-link class="tag" active-class="active-tag" tag="li" :to="item.route" v-for="(item, index) in tags" :key="index">{{item.name}}</router-link>
	</ul>
</div>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	$tagBgColor: #e1e1e1;
	$tagTextColor: #666;
	.tag-filter {
		overflow: hidden;
	}
	
	.tag {
		color: $tagTextColor;
		font-size: $pFontSize;
		padding: 8px 10px;
		margin: 5px;
		background: $tagBgColor;
		cursor: pointer;
		border: 1px solid $tagBgColor;
		border-radius: 5px;
		display: inline-block;
		float: left;
		transition: all 0.3s ease;
		&:hover {
			color: $globalBgColor;
			box-shadow: 0 0 5px rgba($color: $globalBgColor, $alpha: 0.5);
			transform: scale(1.1) rotate(4deg);
		}
	}

	.active-tag {
		color: #fff;
		background: #555;
		border-color: #555;
		&:hover {
			color: #fff;
			box-shadow: 0 0 5px rgba($color: $globalBgColor, $alpha: 0.5);
			transform: scale(1.1) rotate(4deg);
		}
	}
</style>


<script>
	import '../style/_reset.scss';
	export default {
		props: {
			tags: {
				type: Array
			}
		}
	};
</script>