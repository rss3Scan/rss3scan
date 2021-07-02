<template>
  <div class="about">
    <h1>{{ $t("about.title") }}</h1>
    <div class="container left" v-html="$t('about.content')"></div>
  </div>
</template>
