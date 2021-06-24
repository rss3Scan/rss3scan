<template>
  <section class="search-section">
    <slot></slot>
    <div justify="center" class="search">
      <vs-input type="search" v-model="keyword" placeholder="Search by Address">
        <template #icon>
          <i class='bx bx-search-alt'></i>
        </template>
      </vs-input>
      <vs-button icon relief @click="search()">
        <i class='bx bxs-paper-plane'></i>
      </vs-button>
    </div>
  </section>
</template>

<script>
  export default {
    name: "Search",
    data: () => ({
      keyword: ""
    }),
    methods: {
      search() {
        this.$router.push({ name: 'Address', params: { addr: this.keyword }})
      }
    }
  }
</script>

<style lang="scss">
  .search-section {
    padding: {
      top: 7rem;
      bottom: 7rem;
    }

    .search {
      display: flex;

      flex: {
        direction: row;
      }

      justify: {
        content: center;
        items: center;
      }

      input {
        max-width: 100%;
        width: 32rem;
      }

      .vs-input-parent {
        max-width: 80vw;
      }
    }
  }
</style>
