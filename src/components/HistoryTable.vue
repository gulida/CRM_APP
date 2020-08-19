<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{ 'Amount' | localize }}</th>
      <th>{{ 'Date' | localize }}</th>
      <th>{{ 'Category' | localize }}</th>
      <th>{{ 'Type' | localize }}</th>
      <th>{{ 'Open' | localize }}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(r, idx) in records">
      <td>{{ idx + 1 }}</td>
      <td>{{ r.amount | currency }}</td>
      <td>{{ r.date | date('date') }}</td>
      <td>{{ r.categoryName }}</td>
      <td>
            <span
              class="white-text badge"
              :class="r.typeColor"
            >{{ r.typeText }}</span>
      </td>
      <td>
        <button class="btn-small btn teal lighten-3" v-tooltip="r.tooltip" @click="$router.push('/detail/' + r.id)">
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "HistoryTable",
  props: {
    records: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
