<template>
  <div class="col s12 m6 l8 margin">
    <div class="card purple lighten-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ 'Rates' | localize }}</span>
        </div>
        <table class="currencyTable">
          <thead>
          <tr>
            <th>{{ 'Currency' | localize }}</th>
            <th>{{ 'Rate' | localize }}</th>
            <th>{{ 'Date' | localize }}</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="c in currencies" :key="c" >
            <td>{{ c }}</td>
            <td>{{  rates[c].toFixed(2) }}</td>
            <td>{{  date | date }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeCurrency",
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR']
  })
}
</script>

<style scoped>

</style>
