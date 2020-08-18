<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">There is no any category. <router-link to="/categories">Create a new category.</router-link></p>

    <form v-else class="form" @submit.prevent="submitHandler">
      <div class="input-field" >
        <select
          ref="select"
          v-model="categoryId"
        >
          <option
            v-for="c in categories"
            :key="c.id"
            :value="c.id"
          >{{  c.title }}</option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">Сумма</label>
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
        >
          Укажите сумму
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">Описание</label>
        <span
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >Напишите описание</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {minValue, required} from "vuelidate/lib/validators";
import { mapGetters } from 'vuex'

export default {
  name: "Record",
  data: () => ({
    loading: true,
    select: null,

    categories: [],
    categoryId: null,
    title: '',
    type: 'outcome',
    amount: 0,
    description: ''
  }),
  validations: {
    description: { required },
    amount: { minValue: minValue(100) }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord () {
      if (this.type === 'income') {
        return true
      }

      return this.info.bill >= this.amount
    }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

    try {
        if (this.canCreateRecord)
        {
          await this.$store.dispatch('createRecord', {
            categoryId: this.categoryId,
            type: this.type,
            amount: this.amount,
            description: this.description,
            date: new Date().toJSON()
          })

          const bill = this.type === 'income' ?
            this.info.bill + +this.amount :
            this.info.bill - +this.amount

          await this.$store.dispatch('updateInfo', {bill})

          this.amount = 0
          this.description = ''
          this.$v.$reset()
          this.$message('New record was created!')

        } else {
          this.$message(`There is not enough money on your bill: ${this.amount} - ${this.info.bill}`)
        }

    } catch (e) {}
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')

    if (this.categories.length) {
      this.categoryId = this.categories[0].id
    }

    this.loading = false

    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    })
  },
  beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>

<style scoped>

</style>
