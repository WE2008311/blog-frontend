<template>
<div id="app">
	<cube :sides="sides" url="http://www.baidu.com"></cube>
</div>
</template>

<style lang="sass" scoped>
#app {
	padding: 300px;
}
</style>

<script>
import cube from './cube';
export default {
	data() {
		return {
			sides: ['苟', '利', '国', '家', '生', '死']
		};
	},
	components: {
		cube
	}
};
</script>