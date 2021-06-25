<template>
  <div class="date-component">
    <vs-button border color="rgb(59,222,200)" :active="true">
      <slot></slot>
    </vs-button>
    <div class="date-show">
      <vs-button border color="rgb(59,222,200)" :active="true">
        {{ year }}
      </vs-button>
      <vs-button border color="rgb(59,222,200)" :active="true">
        {{ month }}
      </vs-button>
      <vs-button border color="rgb(59,222,200)" :active="true">
        {{ day }}
      </vs-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Date",
    props: {
      date: {
        type: String
      }
    },
    data: () => ({
      year: "####",
      month: "##",
      day: "##"
    }),
    watch: {
      "date": "parse"
    },
    mounted() {
      this.parse()
    },
    methods: {
      parse() {
        let date = this.date.split("T")[0]
        this.year = date.split("-")[0]
        this.month = date.split("-")[1]
        this.day = date.split("-")[2]
      }
    }
  }
</script>

<style lang="scss">
  .date-component {
    display: flex;
    align-items: center;

    .date-show {
      display: -webkit-box;
    }
  }
</style>
