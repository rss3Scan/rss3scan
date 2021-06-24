<template>
  <section class="address-content" v-if="data">
    <div class="address-show">
      <div class="address-profile">
        <vs-avatar>
          <img :src="data.profile.avatar[0]" alt="">
        </vs-avatar>
        {{ data.profile.name }}
      </div>
      <p class="text">Address {{ data.id }}</p>
    </div>
    <hr />
    <vs-alert gradient solid>
      <template #title>
        {{ data.profile.bio }}
      </template>
      Created Date: {{ data.date_created }}<br>Updated Date: {{ data.date_updated }}<br>
      <div v-if="data.profile.tags" class="tags">
        Tags:
        <vs-button v-for="tag in data.profile.tags" :key="tag" color="rgb(59,222,200)">
          {{ tag }}
        </vs-button>
      </div>
    </vs-alert>

    <div class="items">
      <h2 class="title"> Items </h2>
    </div>
  </section>
</template>

<script>
  export default {
    name: "Address",
    data: () => ({
      loading: null,
      address: "",
      data: null
    }),
    created() {
      this.loading = this.$vs.loading()
      this.address = this.$route.params.addr
    },
    mounted() {
      this.load()
    },
    methods: {
      load() {
        if (this.address == "0x0") {
          this.data = {
            "id": "0xC8b960D09C0078c18Dcbe7eB9AB9d816BcCa8944",
            "@version": "rss3.io/version/v0.1.1",
            "date_created": "2009-05-01T00:00:00.000Z",
            "date_updated": "2021-05-08T16:56:35.529Z",

            "profile": {
              "name": "DIYgod",
              "avatar": ["dweb://diygod.jpg", "https://example.com/diygod.jpg"],
              "bio": "写代码是热爱，写到世界充满爱！",
              "tags": ["demo", "lovely", "technology"]
            },

            "items": [{
              "id": "0xC8b960D09C0078c18Dcbe7eB9AB9d816BcCa8944-item-1",
              "authors": ["0xC8b960D09C0078c18Dcbe7eB9AB9d816BcCa8944"],
              "summary": "Yes!!",
              "date_published": "2021-05-09T16:56:35.529Z",
              "date_modified": "2021-05-09T16:56:35.529Z",

              "type": "comment",
              "upstream": "0xC8b960D09C0078c18Dcbe7eB9AB9d816BcCa8944-item-0"
            }, {
              "id": "0xC8b960D09C0078c18Dcbe7eB9AB9d816BcCa8944-item-0",
              "authors": ["0xC8b960D09C0078c18Dcbe7eB9AB9d816BcCa8944"],
              "title": "Hello World",
              "summary": "Hello, this is the first item of RSS3.",
              "date_published": "2021-05-08T16:56:35.529Z",
              "date_modified": "2021-05-08T16:56:35.529Z",

              "contents": [{
                "address": ["dweb://never.html", "https://example.com/never.html"],
                "mime_type": "text/html"
              }, {
                "address": ["dweb://never.jpg"],
                "mime_type": "image/jpeg"
              }],

              "@contexts": [{
                "type": "comment",
                "list": "0xC8b960D09C0078c18Dcbe7eB9AB9d816BcCa8944-context@0@comment-0"
              }, {
                "type": "like",
                "list": "0xC8b960D09C0078c18Dcbe7eB9AB9d816BcCa8944-context@0@like-0"
              }]
            }],
            "items_next": "0xC8b960D09C0078c18Dcbe7eB9AB9d816BcCa8944-items-0",

            "links": [{
              "type": "follow",
              "list": ["0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"]
            }, {
              "type": "superfollow",
              "list": ["0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"]
            }],
            "@backlinks": [{
              "type": "follow",
              "list": "0xC8b960D09C0078c18Dcbe7eB9AB9d816BcCa8944-backlink@follow-0"
            }],

            "assets": [{
              "type": "some experience point",
              "content": "100"
            }]
          }
          this.loading.close()
          return
        }
        this.axios.get("https://hub.rss3.io/" + this.address).then((response) => {
          this.data = response.data
          this.loading.close()
        })
      }
    },
    filters: {
      textOmit(data) {
        let len = data.length;
        if (len > 40) {
          return data.slice(0, 40) + '...';
        }
        return data
      }
    }
  }
</script>

<style lang="scss">
  .address-content {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 2.5rem;

    .address-show {
      display: flex;

      flex: {
        direction: row;
        wrap: nowrap;
      }

      justify-content: space-between;
      align-items: center;

      .text {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        margin: {
          left: 2rem;
        }
      }

      .address-profile {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .vs-avatar-content {
          margin: {
            right: 10px;
          }
        }
      }
    }

    .tags {
      display: flex;
      height: auto;
      align-items: center;
    }

    .vs-alert__content {
      display: flex;
      text-align: start;
    }

    .items {
      margin: {
        top: 3rem;
      }

      padding: auto;
      display: flex;

      flex: {
        direction: row;
        wrap: wrap
      }

      .title {
        width: 100%;

        margin: {
          top: 1.5rem;
          bottom: 1rem;
        }
      }

      .vs-card {
        max-width: 100%;
      }
    }
  }
</style>
