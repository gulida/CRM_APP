<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Title_Bill' | localize }}</h3>

      <button @click="refresh" class="btn waves-effect waves-light btn-small teal lighten-3">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row row-home">

      <HomeBill :rates="currency.rates" />

      <HomeCurrency
        :rates="currency.rates"
        :date="currency.date"
      />

    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill";
import HomeCurrency from "@/components/HomeCurrency";

export default {
  name: 'Home',
  metaInfo() {
    return {
      title: this.$title('Title_Bill')
    }
  },
  data: () => ({
    loading: true,
    currency: null
  }),
  methods: {
    async refresh () {
      this.loading = true
      const currencies = await this.$store.dispatch('fetchCurrency')
      this.currency = {
        rates: {
          EUR: 1,
          USD: currencies.rates.USD,
          RUB: currencies.rates.RUB
        },
        date: currencies.date
      }
      this.loading = false
    }
  },
  async mounted() {
    const currencies = await this.$store.dispatch('fetchCurrency')
    this.currency = {
      rates: {
        EUR: 1,
        USD: currencies.rates.USD,
        RUB: currencies.rates.RUB
      },
      date: currencies.date
    }
    console.log(this.currency)
    this.loading = false
  },
  components: {
    HomeBill,
    HomeCurrency
  }
}
</script>
