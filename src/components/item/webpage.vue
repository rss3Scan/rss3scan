<template>
  <iframe :src="src[0]" ref="page" class="web-page" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</template>

<script>
  export default {
    name: "WebPage",
    props: {
      src: {
        type: String
      }
    },
    data: () => ({
      
    }),
    methods: {

    }
  }
</script>

<style lang="scss">
  .web-page {
    width: 100%;
    min-height: 10rem;
    height: 90vh;
  }
</style>
