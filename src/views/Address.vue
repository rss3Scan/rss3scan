<template>
  <section class="address-content" v-if="data">
    <template v-if="data.profile">
      <div class="address-show">
        <div class="address-profile">
          <vs-avatar>
            <img
              v-if="avatar"
              :src="avatar"
              @error="fallbackAvatar()"
              alt="avatar"
            />
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
        v-for="item in items"
        :key="item.id"
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
              params: { item: item.number, addr: data.id },
            })
          "
        >
          <template #title>
            <h3>#{{ item.number }} {{ item.title }}</h3>
          </template>
          <template #text>
            <p>
              {{
                item.authors
                  .map((x) => {
                    return x.name;
                  })
                  .join(", ")
              }}
            </p>
            <p>
              {{ item.summary }}
            </p>
          </template>
        </vs-card>
      </vs-col>
    </vs-row>
    <vs-button
      v-show="items[items.length - 1].number >= 100"
      block
      :loading="next == 'loading'"
      @click="load(page + 1)"
      >load more</vs-button
    >
  </section>
</template>

<script>
import Date from "@/components/common/Date";
import { fetchAddress } from "../handlers/address";
export default {
  name: "Address",
  components: {
    Date,
  },
  data: () => ({
    loading: null,
    address: "",
    data: null,
    authors: {},
    items: [],
    avatar: "",
    next: false,
    page: 1,
  }),
  created() {
    this.address = this.$route.params.addr;
  },
  mounted() {
    this.load();
  },
  methods: {
    async load(page = 1) {
      this.loading = this.$vs.loading();
      let data = await fetchAddress(this.address, page);
      // need more error alert (
      if (!data || typeof data == "number") {
        this.error("Address Error", "Please Check Your Input Again!");
        this.loading.close();
        this.$router.push({
          name: "Home",
        });
      }
      this.items = [
        ...this.items,
        ...data.items.filter((ele) => {
          return !ele.upstream;
        }),
      ];
      // only page 1 load avatar
      if (page == 1) {
        this.data = data;
        if (!data.profile.avatar) {
          data.profile.avatar = [""];
        }
        this.fallbackAvatar();
      }
      this.page = page;
      this.loading.close();
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
    fallbackAvatar() {
      let avatar = this.data.profile.avatar.shift();
      this.avatar = avatar ? avatar : "";
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
