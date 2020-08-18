<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>

      <Loader v-if="loading" />

      <div v-else class="row">

        <CategoryCreate @created="addNewCategory" />

        <CategoryEdit />

      </div>
    </section>
  </div>
</template>

<script>
  import CategoryCreate from "@/components/CategoryCreate";
  import CategoryEdit from "@/components/CategoryEdit";

  export default {
    name: "Categories",
    data: () => ({
      loading: true,
      categories: []
    }),
    methods: {
      addNewCategory (category) {
        this.categories.push(category)
      }
    },
    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories')
      this.loading = false
    },
    components: {
      CategoryCreate,
      CategoryEdit
    }
  }
</script>

<style scoped>

</style>
