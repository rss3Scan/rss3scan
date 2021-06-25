<template>
  <section class="items-section" v-if="item">
    <h1 class="title"> {{ item.title|noNull("No Title") }} </h1>
    <div class="summary">
      <div class="author">
        Authors:
        <div class="author-list">
          <vs-button transparent v-for="author in item.authors" :key="author"
            @click="$router.push({'name': 'Address', params: {'addr': author}})">{{ author }}</vs-button>
        </div>
      </div>
      <vs-alert>
        {{ item.summary|noNull("Empty Summary") }}
      </vs-alert>
      
      
    </div>
    
  </section>
</template>

<script>
  export default {
    name: "Item",
    data: () => ({
      item: null,
      loading: null,
      address: "",
      id: 0
    }),
    created() {
      this.loading = this.$vs.loading();
      this.address = this.$route.params.addr;
      this.id = this.$route.params.item;
    },
    mounted() {
      this.load()
    },
    methods: {
      load() {
        this.axios.get("https://hub.rss3.io/" + this.address).then((response) => {
          this.item = response.data.items.find(item => {
            return this.parseItemId(item.id) == this.id
          });
          this.loading.close();
        }).catch((err) => {
          console.log(err)
          this.error("Address Error", "Please Check Your Input Again!")
          this.loading.close();
          this.$router.push({
            "name": "Home"
          })
        })
      },
      parseItemId(id) {
        const splited = id.split('-');
        return splited[2] !== undefined ? parseInt(splited[2]) : Infinity
      }
    },
    filters: {
      noNull(data, text) {
        if (data) return data;
        return text
      }
    }
  }
</script>

<style lang="scss">
  .items-section {
    max-width: 70rem;
    margin: 0 auto;
    padding: 2rem 2.5rem;

    .title {
      margin: {
        bottom: 1.4rem;
      }
    }

    .summary {
      max-width: 40rem;
      margin: auto;
      height: auto !important;

      .author {
        display: flex;
        align-items: center;

        .author-list {
          display: -webkit-box;
          overflow-x: auto;
        }
      }

      .vs-alert__content {
        display: flex;
        text-align: start;
        min-height: auto !important;

        .vs-alert__content__text {
          width: 100%;
          color: black;
        }
      }
    }
  }
</style>
