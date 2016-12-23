<template>
<div id="main-container">
	<slot></slot>
</div>
</template>

<style lang="sass" scoped>
	@import '../style/common';
	#main-container {
		margin-left: $navBarWidth;
		padding: 50px 80px 0;
		min-width: 600px;
		max-width: 800px;
	}
</style>

<script>
	import '../style/_reset.scss';
	export default {};
</script>