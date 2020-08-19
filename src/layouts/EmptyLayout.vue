<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>

<script>
  import messages from "@/utils/messages";
  import localizeFilter from "@/filters/localize.filter";

  export default {
    name: "EmptyLayout",
    computed: {
      error() {
        return this.$store.getters.error
      }
    },
    watch: {
      error (fbError) {
        this.$error(messages[fbError.code] || localizeFilter('Not_FB_Error'))
      }
    }
  }
</script>

<style scoped>

</style>
