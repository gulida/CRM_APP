<template>
  <div class="col s12 m6 l4">
    <div class="card teal lighten-3 bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{ 'Bill_In_Currency' | localize }}</span>

        <p class="currency-line"
           v-for="c in currencies"
           :key="c"
        >
          <span>{{ getCurrency(c) | currency(c)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeBill",
  props: ['rates'],
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR']
  }),
  computed: {
    base () {
      return this.$store.getters.info.bill / (this.rates['EUR'] * this.rates['RUB'])
    }
  },
  methods: {
    getCurrency ( currency ) {
      return Math.floor(this.base * this.rates[currency])
    }
  }
}
</script>

<style scoped>

</style>
