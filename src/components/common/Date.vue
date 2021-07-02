<template>
  <div class="date-component">
    <slot></slot>
    <div class="date-show">{{ year }}-{{ month }}-{{ day }}</div>
  </div>
</template>

<script>
export default {
  name: "Date",
  props: {
    date: {
      type: String,
    },
  },
  data: () => ({
    year: "####",
    month: "##",
    day: "##",
  }),
  watch: {
    date: "parse",
  },
  mounted() {
    this.parse();
  },
  methods: {
    parse() {
      let date = this.date.split("T")[0];
      this.year = date.split("-")[0];
      this.month = date.split("-")[1];
      this.day = date.split("-")[2];
    },
  },
};
</script>
<style lang="scss" scoped>
.date-component {
  display: flex;
  align-items: center;
  margin: {
    right: 15px;
  }
  .date-show {
    margin: {
      left: 10px;
    }
    display: block;
  }
}
</style>
