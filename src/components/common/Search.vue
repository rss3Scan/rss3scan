<template>
  <section class="search-section">
    <slot></slot>
    <div justify="center" class="search">
      <vs-input
        type="search"
        success
        v-model="keyword"
        @keyup.enter="search()"
        placeholder="Search by Address"
      >
        <template #icon>
          <i class="bx bx-search-alt"></i>
        </template>
      </vs-input>
      <vs-button icon relief @click="search()">
        <i class="bx bxs-paper-plane"></i>
      </vs-button>
    </div>
  </section>
</template>

<script>
export default {
  name: "Search",
  data: () => ({
    keyword: "",
  }),
  methods: {
    parse(id) {
      const splited = id.split("-");
      return {
        persona: splited[0],
        type: splited[1] || "index",
        index: splited[2] !== undefined ? parseInt(splited[2]) : 0,
      };
    },
    search() {
      let id = this.parse(this.keyword);
      if (/^0x[0-9a-fA-F]{40}$/.test(id.persona)) {
        if (id.type == "index") {
          this.$router.push({
            name: "Address",
            params: {
              addr: id.persona,
            },
          });
          return;
        } else if (id.type == "item") {
          this.$router.push({
            name: "Item",
            params: {
              addr: id.persona,
              item: id.index,
            },
          });
          return;
        }
        this.error("Unrecognized Type", "Please Check Your Input.");
      }
      this.error("Invalid Address", "Please Check Your Input.");
    },
    error(title, text) {
      this.$vs.notification({
        progress: "auto",
        color: "danger",
        position: "top-center",
        title: title,
        text: text,
      });
    },
  },
};
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
