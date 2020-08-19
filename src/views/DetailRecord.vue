<template>
  <div>

    <Loader v-if="loading"/>

    <p v-else-if="!type" class="center">{{ 'No_Record_With_Id' | localize }}</p>

    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">{{ 'Title_History' | localize }}</router-link>
        <a @click.prevent class="breadcrumb">
          {{ type }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="color">
            <div class="card-content white-text">
              <p>{{ 'Description' | localize }}: {{ description }}</p>
              <p>{{ 'Amount' | localize }}: {{ amount | currency }}</p>
              <p>{{ 'Category' | localize }}: {{ category }}</p>

              <small>{{  date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import localizeFilter from "@/filters/localize.filter";

  export default {
    name: "DetailRecord",
    metaInfo() {
      return {
        title: this.$title('Title_Detail')
      }
    },
    data: () => ({
      loading: true,

      type: '',
      color: '',
      description: '',
      amount: 0,
      category: '',
      date: new Date()
    }),
    async mounted() {
      const idx = this.$route.params.id
      const record = await this.$store.dispatch('fetchRecordById', idx)
      const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)

      this.type = record.type === 'income' ? localizeFilter('Income') : localizeFilter('Outcome')
      this.color = record.type === 'income' ? 'green lighten-2' : 'purple lighten-3'
      this.description = record.description
      this.amount = record.amount
      this.category = category.title
      this.date = record.date

      this.loading = false
    }

  }
</script>

<style scoped>

</style>
