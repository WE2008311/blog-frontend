<template>
<div id="main-container">
	<slot></slot>
</div>
</template>

<style lang="sass" scoped>
@import '../style/common';
#main-container {
	margin-left: $navBarWidth;
	padding: 100px;
}
</style>

<script>
export default {};
</script>