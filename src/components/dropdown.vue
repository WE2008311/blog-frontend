<template>
    <div class="dropdown">
      <button class="dropbtn" :style="{width: width+'px'}" @click.prevent>{{cname || (list[0] && list[0].name)}}</button>
      <ul class="dropdown-content" :class="{hide: hideDropdown}">
        <li class="dropdown-item" v-for="(item, index) in list" @click="onItemClick(index)">{{item.name}}</li>
      </ul>
    </div>
</template>
<style lang="sass" scoped>
	@import '../style/common';
	$dropBtnColor: #fff;
	$dropBtnBgColor: #999;
	$dropBtnBgHoverColor: #aaa;
	$listBgColor: #f9f9f9;
	$itemFontColor: #444;
	$itemBgHoverColor: #e8e8e8;

	.dropdown {
		position: relative;
		display: inline-block;
		&:hover>.dropdown-content {
			display: block;
		}
	}
	
	.dropbtn {
		color: $dropBtnColor;
		font-size: 14px;
		cursor: pointer;
		padding: 5px 25px 5px 10px;
		background: $dropBtnBgColor;
		outline: none;
		border: 1px solid $dropBtnBgColor;
		border-radius: 3px;
		position: relative;
		transition: all 0.3s ease;
		&::after {
			content: "";
			display: inline-block;
			width: 0;
			height: 0;
			font-size: 0;
			border-top: 6px solid $dropBtnColor;
			border-left: 7px solid transparent;
			border-right: 7px solid transparent;
			position: absolute;
			right: 6px;
			top: 15%;
			bottom: 0;
			margin: auto;
		}
		&:hover {
			background: $dropBtnBgHoverColor;
			border: 1px solid $dropBtnBgHoverColor;
			box-shadow: 0 2px 5px rgba($color: #000, $alpha: 0.2);
		}
	}
	
	.dropdown-content {
		min-width: 100%;
		list-style-type: none;
		padding: 0;
		margin: 0;
		display: none;
		position: absolute;
		top: 100%;
		left: 0;
		background: $listBgColor;
		box-shadow: 0 8px 16px 0 rgba($color: #000, $alpha: 0.2);
		transition: all 0.3s ease;
		.dropdown-item {
			color: $itemFontColor;
			text-align: left;
			font-size: 14px;
			padding: 5px 10px;
			margin: 0;
			cursor: pointer;
			transition: all 0.3 ease;
			&:hover {
				background: $itemBgHoverColor;
			}
		}
	}
	
	.hide {
		display: none!important;
	}
</style>
<script>
	import '../style/_reset.scss';
	export default {
		data() {
			return {
				cname: this.name,
				hideDropdown: false,
			};
		},
		methods: {
			onItemClick(index) {
				this.hideDropdown = true;
				setTimeout(() => this.hideDropdown = false, 0);
				const item = this.list[index];
				this.cname = item.name;
				this.$emit('onDropdownChange', [this.id, index, item.name, item.value]);
			},
		},
		props: {
			id: {
				type: Number,
			},
			width: {
				type: Number,
			},
			name: {
				type: String,
			},
			list: {
				type: Array,
				required: true,
			},
		},
	};
</script>