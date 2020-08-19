<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Title_Category' | localize }}</h3>
    </div>
    <section>

      <Loader v-if="loading" />

      <div v-else class="row">

        <CategoryCreate @created="addNewCategory" />

        <CategoryEdit
          :categories="categories"
          @updated="updateCategories"
          :key="categories.length + updateIndex"
        />

      </div>
    </section>
  </div>
</template>

<script>
  import CategoryCreate from "@/components/CategoryCreate";
  import CategoryEdit from "@/components/CategoryEdit";

  export default {
    name: "Categories",
    metaInfo() {
      return {
        title: this.$title('Title_Category')
      }
    },
    data: () => ({
      loading: true,
      categories: [],
      updateIndex: 0
    }),
    methods: {
      addNewCategory (category) {
        this.categories.push(category)
      },
      updateCategories (categoryData) {
        const idx = this.categories.findIndex(c => c.id === categoryData.id)
        this.categories[idx].title = categoryData.title
        this.categories[idx].limit = categoryData.limit
        this.updateIndex++
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
