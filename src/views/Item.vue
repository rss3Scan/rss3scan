<template>
  <section class="items-section" v-if="item">
    <h1 class="title"> {{ item.title|noNull("No Title") }} </h1>
    <small>{{ item.id }}</small>
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
    <div class="contents" v-if="item.contents">
      <div class="content" v-for="(content, index) in item.contents" :key="index">
        <WebPage :content="content" v-if="['application/pdf', 'text/html', 'application/xml', 'text/plain', 'text/xml', 'text/csv', 'text/css'].some((ele) => {return content.mime_type == ele})" />
        <Audio :content="content" v-else-if="['audio/ogg', 'audio/mpeg'].some((ele) => {return content.mime_type == ele})"/>
        <div class="unsupport" v-else>
          <vs-alert color="danger">
            <template #title>
              Unsupported Type
            </template>
            This MIME type is not supported. Please contact us if this is a valid mime type.
            <br>
          </vs-alert>
        </div>
      </div>
    </div>
    <div class="foot">
      <hr>
      <Date :date="item.date_published">Published at </Date>
      <Date :date="item.date_modified">Modified at </Date>
    </div>

  </section>
</template>

<script>
  import Date from '@/components/common/Date'
  import WebPage from '@/components/item/webpage'
  import Audio from '@/components/item/audio'

  export default {
    name: "Item",
    components: {
      Date,
      WebPage,
      Audio
    },
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
    max-width: 40rem;
    //max-width: 70rem;
    margin: 0 auto;
    padding: 2rem 2.5rem;

    .title {
      margin: {
        bottom: 1.4rem;
      }
    }

    .summary {
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

      .vs-alert {
        height: auto !important;

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

    .contents {
      margin-top: 10px;

      .content {
        padding-top: 10px;

        .unsupport {
          padding: {
            top: 2.8rem;
            bottom: 3rem;
          }
        }
      }
    }

    .foot {
      margin: {
        top: 1rem;
      }
    }
  }
</style>
