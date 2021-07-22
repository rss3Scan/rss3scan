<template>
  <section class="items-section" v-if="item">
    <h1 class="title">{{ item.title ? item.title : $t("item.notitle") }}</h1>
    <small>{{ item.id }}</small>
    <div class="summary">
      <div class="author">
        {{ $t("item.authors") }}
        <div class="author-list">
          <vs-button
            transparent
            v-for="author in item.authors"
            :key="author.id"
            @click="
              $router.push({ name: 'Address', params: { addr: author.id } })
            "
            >{{ author.name }}</vs-button
          >
        </div>
      </div>
      <vs-alert>
        {{ item.summary ? item.summary : $t("item.nosummary") }}
      </vs-alert>
    </div>
    <div class="contents" v-if="item.contents">
      <div
        class="content"
        v-for="(content, index) in item.contents"
        :key="index"
      >
        <WebPage
          :content="content"
          v-if="
            [
              'application/pdf',
              'text/html',
              'application/xml',
              'text/plain',
              'text/xml',
              'text/csv',
              'text/css',
            ].some((ele) => {
              return content.mime_type == ele;
            })
          "
        />
        <Audio
          :content="content"
          v-else-if="
            ['audio/ogg', 'audio/mpeg'].some((ele) => {
              return content.mime_type == ele;
            })
          "
        />
        <div class="unsupport" v-else>
          <vs-alert color="danger">
            <template #title> {{ $t("item.ut_title") }} </template>
            {{ $t("item.ut_description") }}
            <br />
          </vs-alert>
        </div>
      </div>
    </div>
    <div class="foot">
      <hr />
      <Date :date="item.date_published">{{ $t("address.created") }}</Date>
      <Date :date="item.date_modified">{{ $t("address.modified") }}</Date>
    </div>
  </section>
</template>

<script>
import Date from "@/components/common/Date";
import WebPage from "@/components/item/webpage";
import Audio from "@/components/item/audio";
import { fetchItem } from "../handlers/address";

export default {
  name: "Item",
  components: {
    Date,
    WebPage,
    Audio,
  },
  data: () => ({
    item: null,
    loading: null,
    address: "",
    id: 0,
  }),
  created() {
    this.loading = this.$vs.loading();
    this.address = this.$route.params.addr;
    if (this.$route.params.item.split("-").length > 2) {
      this.id = this.$route.params.item.split("-")[2];
    } else {
      this.id = this.$route.params.item;
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      let item = await fetchItem(this.address, this.id);
      this.item = item;
      this.loading.close();
    },
  },
};
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
