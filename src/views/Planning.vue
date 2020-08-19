<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Title_Planning' | localize }}</h3>
      <h4>{{  info.bill | currency }}</h4>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">{{ 'No_Category' | localize }}
      <router-link to="/categories">{{ 'Add_Category' | localize }}</router-link>
    </p>
    <section v-else>
      <div v-for="c in categories"
           :key="c.id"
      >
        <p>
          <strong>{{ c.title }}:</strong>
          {{ c.spend | currency }} из {{ c.limit | currency }}
        </p>
        <div class="progress" v-tooltip="c.tooltip" >
          <div
            class="determinate"
            :class="c.progressColor"
            :style="{width: c.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "Planning",
  metaInfo() {
    return {
      title: this.$title('Title_Planning')
    }
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const categories = await this.$store.dispatch('fetchCategories')
    const records = await this.$store.dispatch('fetchRecords')

    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id)
        .filter(r => r.type === 'outcome')
        .reduce((total, record) => {
          return total += +record.amount
        }, 0)


      const percent = 100 * spend / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60
        ? 'green' : percent < 100
          ? 'yellow' : 'red'

      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0 ? localizeFilter('Excess_By') : localizeFilter('Left') } ${Math.abs(tooltipValue)}`

      return {
        ...cat,
        progressColor,
        progressPercent,
        spend,
        tooltip
      }
    })

    this.loading = false
  }
}
</script>

<style scoped>

</style>
