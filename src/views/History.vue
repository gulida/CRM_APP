<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Title_History' | localize }}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">{{ 'No_Records' | localize }}
      <router-link to="/record">{{ 'Add_Record' | localize }}</router-link></p>

    <section v-else>

      <HistoryTable :records="items" />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Back' | localize "
        :next-text="'Forward' | localize "
        :container-class="'pagination'"
        :page-class="'waves-effect'">
      </Paginate>

    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable";
import paginateMixin from '../mixins/paginate.mixin'
import { Doughnut } from 'vue-chartjs'
import localizeFilter from "@/filters/localize.filter";

  export default {
    name: "History",
    metaInfo() {
      return {
        title: this.$title('Title_History')
      }
    },
    mixins: [paginateMixin],
    extends: Doughnut,
    data: () => ({
      loading: true,
      records: [],
      rgba: []
    }),
    methods: {
      setup (categories) {
        this.setupPaginate(this.records.map(record => {
          return  {
            ...record,
            tooltip: localizeFilter('OpenInDetail'),
            categoryName: categories.find(c => c.id === record.categoryId).title,
            typeColor: record.type === 'income' ? 'green lighten-2' : 'purple lighten-3',
            typeText: record.type === 'income' ? localizeFilter('Income') : localizeFilter('Outcome')
          }
        }))
      }
    },
    async mounted() {
      this.records = await this.$store.dispatch('fetchRecords')
      const categories = await this.$store.dispatch('fetchCategories')

      this.setup(categories)

      this.rgba = categories.map( c => {
        const randomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min )
        const randomByte = () => randomNumber(0, 255)
        const randomPercent = () => (randomNumber(50, 100) * 0.01).toFixed(2)
        const randomCssRgba = () => `rgba(${[randomByte(), randomByte(), randomByte(), randomPercent()].join(',')})`
        return randomCssRgba()
      })


      this.renderChart({
        labels: categories.map(c => c.title),
        datasets: [{
          label: 'Outcomes by category',
          data: categories.map(cat => {
            return this.records.reduce((total, record) => {
              if (record.categoryId === cat.id && record.type === 'outcome') {
                total += +record.amount
              }
              return total
            }, 0)
          }),
          backgroundColor: this.rgba,
          borderColor: this.rgba,
          borderWidth: 1
        }]
      })

      this.loading = false
    },
    components: {
      HistoryTable
    }
  }
</script>

<style scoped>

</style>
