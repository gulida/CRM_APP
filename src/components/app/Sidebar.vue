<template>
  <ul class="sidenav app-sidenav" :class="{open: value}">
    <router-link
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      tag="li"
      active-class="active"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "Sidebar",
  props: ['value'],
  data: () => ({
    links: [
      { title: localizeFilter('Title_Bill'), url: '/', exact: true },
      { title: localizeFilter('Title_History'), url: '/history' },
      { title: localizeFilter('Title_Planning'), url: '/planning' },
      { title: localizeFilter('Title_Record'), url: '/record' },
      { title: localizeFilter('Title_Category'), url: '/categories' }
    ]
  }),
}
</script>

<style scoped>

</style>
