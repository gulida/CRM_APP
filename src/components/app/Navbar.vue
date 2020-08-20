<template>
  <nav class="navbar cyan darken-4">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click="$emit('dehaze')">
          <i class="material-icons white-text">dehaze</i>
        </a>
        <span class="content-text white-text">{{  date | date('datetime')  }}</span>
      </div>

      <ul class="right">
        <li>
          <a
            class="dropdown-trigger white-text content-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{  name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>{{ 'Title_Profile' | localize }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>{{ 'Title_Logout' | localize }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "Navbar",
    data: () => ({
      date: new Date(),
      dropdown: null,
      interval: null
    }),
    computed: {
      name() {
        return this.$store.getters.info.name
      }
    },
    methods: {
      async logout () {
        await this.$store.dispatch('logout')
        this.$router.push('/login?message=logout')
      }
    },
    mounted() {
      this.interval = setInterval(() => {
        this.date = new Date()
      }, 1000)
      this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
        constrainWidth: false
      })
    },
    beforeDestroy() {
      clearInterval(this.interval)
      if (this.dropdown && this.dropdown.destroy) {
        this.dropdown.destroy()
      }
    }
  }
</script>

<style scoped>

</style>
