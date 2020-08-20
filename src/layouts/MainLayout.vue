<template>
  <div>
    <Loader v-if="loading" />

    <div v-else class="app-main-layout">

      <Navbar v-model="isOpen" @dehaze="isOpen = !isOpen" />

      <Sidebar v-model="isOpen" :key="locale"/>

      <main class="app-content" :class="{full: !isOpen}">
        <div class="app-page">
          <router-view/>
        </div>
      </main>

      <div class="fixed-action-btn" :key="locale + '1'" >
        <router-link class="btn-floating btn-large teal lighten-3" to="/record" v-tooltip="CreateNewRecord">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from "@/components/app/Navbar";
  import Sidebar from "@/components/app/Sidebar";
  import messages from "@/utils/messages";
  import localizeFilter from "@/filters/localize.filter";

  export default {
    name: "MainLayout",
    data: () => ({
      isOpen: true,
      loading: true,
      CreateNewRecord: ''
    }),
    computed: {
      error() {
        return this.$store.getters.error
      },
      locale() {
        this.CreateNewRecord = localizeFilter('Add_Record')
        return this.$store.getters.info.locale
      }
    },
    watch: {
      error (fbError) {
        this.$error(messages[fbError.code] || localizeFilter('Not_FB_Error'))
      }
    },
    async mounted() {
      if (!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchInfo')
      }

      this.loading = false
    },
    components: {
      Navbar,
      Sidebar
    }
  }
</script>

<style scoped>

</style>
