<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'Edit' | localize }}</h4>
      </div>

      <p v-if="!categories.length" class="center">{{ 'No_Category' | localize }}</p>

      <form v-else @submit.prevent="submitHandler">
        <div class="input-field" >
          <select
            ref="select"
            v-model="current"
          >
            <option
              v-for="c in categories"
              :key="c.id"
              :value="c.id"
            >{{ c.title }}</option>
          </select>
          <label>{{ 'Choose_Category' | localize }}</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{invalid: $v.title.$dirty && !$v.title.required}"
          >
          <label for="name">{{ 'Title' | localize }}</label>
          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >
            {{ 'Message_EnterTitle' | localize }}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
          >
          <label for="limit">{{ 'Limit' | localize }}</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            {{ 'Message_MinimalValue' | localize }} 100
          </span>
        </div>

        <button class="btn waves-effect waves-light teal lighten-3" type="submit">
          {{ 'Update' | localize }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {minValue, required} from "vuelidate/lib/validators";
import localizeFilter from "@/filters/localize.filter";

export default {
  name: "CategoryEdit",
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    loading: true,
    select: null,
    current: null,

    title: '',
    limit: 1
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(100) }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)

        this.$v.$reset()
        this.$message(localizeFilter('Category_Updated'))
        this.$emit('updated', categoryData)

      } catch (e) {}
    }
  },
  watch: {
    current(value){
      const { title, limit } = this.categories.find(c => c.id === value)
      this.title = title
      this.limit = limit
    }
  },
  created() {
    const { id, title, limit } = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted() {
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
