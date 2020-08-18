<template>
  <div>

    <Loader v-if="loading"/>

    <p v-else-if="!type" class="center">There is no record with this id.</p>

    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a @click.prevent class="breadcrumb">
          {{ type }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="color">
            <div class="card-content white-text">
              <p>Описание: {{ description }}</p>
              <p>Сумма: {{ amount | currency }}</p>
              <p>Категория: {{ category }}</p>

              <small>{{  date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailRecord",
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

      this.type = record.type === 'income' ? 'Доход' : 'Расход'
      this.color = record.type === 'income' ? 'green' : 'red'
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
