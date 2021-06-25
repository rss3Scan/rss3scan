<template>
  <Aplayer :music="music"/>
</template>

<script>
  import Aplayer from 'vue-aplayer'
  
  export default {
    name: "Audio",
    components: {
      Aplayer
    },
    props: {
      content: {
        type: Object
      }
    },
    data() {
      return {
        music: {
          src: this.content.address[0],
          title: this.content.name ? this.content.name : 'Untitled',
        }
      }
    },
    methods: {
    
    }
  }
</script>

<style lang="scss">
  
</style>
