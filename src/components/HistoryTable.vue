<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Сумма</th>
      <th>Дата</th>
      <th>Категория</th>
      <th>Тип</th>
      <th>Открыть</th>
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
              :class="`${r.type === 'income' ? 'green' : 'red'}`"
            >{{ `${r.type === 'income' ? 'Доход' : 'Расход'}` }}</span>
      </td>
      <td>
        <button class="btn-small btn" @click="$router.push('/detail/' + r.id)">
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
