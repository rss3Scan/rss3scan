<template>
	<div class="center">
		<vs-navbar center-collapsed not-line v-model="index">
			<template #left>
				<img src="@/assets/RSS3_Scan.svg" style="
              height: 7vh;
          " alt="" />
			</template>
			<vs-navbar-item :active="index == '/'" id="/">
				Home
			</vs-navbar-item>
			<vs-navbar-item :active="index == '/address'" id="/address">
				Address
			</vs-navbar-item>
			<vs-navbar-item :active="index == '/resources'" id="/resources">
				Resources
			</vs-navbar-item>
			<vs-navbar-item :active="index == '/about'" id="/about">
				About
			</vs-navbar-item>
			<template #right>
				<!-- <vs-button flat></vs-button> | -->
				<vs-button gradient @click="$refs.login.$emit('show')">Sign In</vs-button>
			</template>
		</vs-navbar>
    <LoginForm ref="login" />
	</div>
</template>
<script>
  import LoginForm from '@/components/LoginForm'
  
	export default {
		name: "Header",
    components:{
      LoginForm
    },
		data: () => ({
			index: '/'
		}),
		watch: {
			"index": "routerChange",
			"$router": "indexChange"
		},
		methods: {
			routerChange(path) {
				if (path != this.$router.path)
					this.$router.push(path);
			},
			indexChange() {
				this.index = this.$router.path;
			}
		},
		created() {
			if (this.$router.path)
				this.index = this.$router.path;
		}
	};
</script>
