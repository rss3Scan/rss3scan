<template>
  <section class="address-content" v-if="data">
    <template v-if="data.profile">
      <div class="address-show">
        <div class="address-profile">
          <vs-avatar v-for="avatar in data.profile.avatar" :key="avatar">
            <img v-if="avatar" :src="avatar" alt="avatar" />
          </vs-avatar>
          {{ data.profile.name }}
        </div>
        <p class="text text-overflow">
          {{ $t("address.address") }} {{ data.id }}
        </p>
      </div>
      <hr />

      <vs-alert gradient solid>
        <template #title>
          {{ data.profile.bio }}
        </template>
        <div style="display: flex; align-items: center; flex-wrap: wrap">
          <Date :date="data.date_created">{{ $t("address.created") }}</Date>
          <Date :date="data.date_updated">{{ $t("address.modified") }}</Date>
        </div>
        <br />
        <div v-if="data.profile.tags" class="tags">
          {{ $t("address.tags") }}
          <div class="tags-list">
            <vs-button
              v-for="tag in data.profile.tags"
              :key="tag"
              color="rgb(59,222,200)"
            >
              {{ tag }}
            </vs-button>
          </div>
        </div>
      </vs-alert>
    </template>
    <h2 class="title">{{ $t("address.items") }}</h2>
    <vs-row>
      <vs-col
        class="card"
        v-for="(item, index) in data.items.filter((ele) => {
          return !ele.upstream;
        })"
        :key="index"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        lg="4"
        sm="6"
        xs="10"
      >
        <vs-card
          @click="
            $router.push({
              name: 'Item',
              params: { item: parseItemId(item.id), addr: data.id },
            })
          "
        >
          <template #title>
            <h3>#{{ item.id | parseItemId }} {{ item.title }}</h3>
          </template>
          <template #text>
            <p>
              {{ item.authors | authorName(data) }}
            </p>
            <p>
              {{ item.summary | textOmit(124) }}
            </p>
          </template>
        </vs-card>
      </vs-col>
    </vs-row>
  </section>
</template>

<script>
import Date from "@/components/common/Date";

export default {
  name: "Address",
  components: {
    Date,
  },
  data: () => ({
    loading: null,
    address: "",
    data: null,
  }),
  created() {
    this.loading = this.$vs.loading();
    this.address = this.$route.params.addr;
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.axios
        .get("https://hub.rss3.io/" + this.address)
        .then((response) => {
          let data = response.data;
          if (!data.profile.avatar) {
            data.profile.avatar = [""];
          }
          this.data = data;
          this.loading.close();
        })
        .catch((err) => {
          console.log(err);
          // need i18n
          this.error("Address Error", "Please Check Your Input Again!");
          this.loading.close();
          this.$router.push({
            name: "Home",
          });
        });
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
    parseItemId(id) {
      const splited = id.split("-");
      return splited[2] !== undefined ? parseInt(splited[2]) : Infinity;
    },
  },
  computed: {},
  filters: {
    parseItemId(id) {
      const splited = id.split("-");
      return splited[2] !== undefined ? parseInt(splited[2]) : Infinity;
    },
    textOmit(data, length) {
      let len = data.length;
      if (len > length) {
        return data.slice(0, length) + "...";
      }
      return data;
    },
    authorName(authorList, data) {
      if (data.profile) {
        authorList = authorList.map((ele) => {
          if (ele == data.id) return data.profile.name;
          return ele;
        });
      }
      return authorList.join(",");
    },
  },
};
</script>

<style lang="scss" scoped>
.space {
  width: 10px;
  height: 1px;
  display: inline-block;
}

.text-overflow {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.address-content {
  max-width: 70rem;
  margin: 0 auto;
  padding: 2rem 2.5rem;

  .address-show {
    display: flex;

    flex: {
      direction: row;
      wrap: nowrap;
    }

    margin: 10px;

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

  .vs-alert {
    .tags {
      display: flex;
      height: auto;
      align-items: center;
      width: 100%;

      .tags-list {
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
      }
    }

    margin: {
      top: 10px;
    }

    height: auto !important;
  }
}

.card {
  padding-bottom: 10px;
  margin: auto;
}
</style>
