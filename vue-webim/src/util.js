export default {
	parent() {
		let parent = this.$parent;
		console.log(parent)
		// while(!parent.config) {
		// 	parent = parent.$parent;
		// }

		return parent;
	},
}