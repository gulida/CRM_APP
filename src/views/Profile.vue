<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Title_Profile' | localize }}</h3>
    </div>

    <form @submit.prevent="submitHandler" class="form">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="description">{{ 'Name' | localize }}</label>
        <span
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >{{ 'Message_EnterName' | localize }}</span>
      </div>

      <!-- Switch -->
      <div class="switch">
        <label>
          {{ 'English' | localize }}
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          {{ 'Russian' | localize }}
        </label>
      </div>

      <button class="btn waves-effect waves-light teal lighten-3" type="submit">
        {{ 'Update' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import localizeFilter from "@/filters/localize.filter";

  export default {
    name: "Profile",
    metaInfo() {
      return {
        title: this.$title('Title_Profile')
      }
    },
    data: () => ({
      name: '',
      isRuLocale: true
    }),
    validations: {
      name: { required }
    },
    computed: {
      ...mapGetters(['info']),
    },
    methods: {
      ...mapActions(['updateInfo']),

      async submitHandler () {
        if (this.$v.$invalid) {
          this.$v.$touch()
          return
        }

        try {
          await this.updateInfo({
            name: this.name,
            locale: this.isRuLocale ? 'ru-RU' : 'en-US'
          })
        } catch (e) {}
      }
    },
    mounted() {
      this.name = this.info.name
      this.isRuLocale = this.info.locale === 'ru-RU' ? true : false

      setTimeout(() => {
        M.updateTextFields()
      })
    }
  }
</script>

<style scoped>
  .switch {
    margin-bottom: 2rem;
  }
</style>
