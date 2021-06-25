<template>
  <div>
    {{ name }}
    <iframe :src="src" ref="page" class="web-page" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
  </div>
</template>

<script>
  export default {
    name: "WebPage",
    props: {
      content: {
        type: Object
      }
    },
    data() {
      return {
        src: this.content.address[0],
        name: this.content.name
      }
    },
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
