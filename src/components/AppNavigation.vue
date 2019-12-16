<template>
    <span>
        <v-toolbar app color="blue" dark>
            <v-toolbar-side-icon
              class="hidden-md-and-up"
              @click="drawer = !drawer"
            ></v-toolbar-side-icon>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <v-btn flat class="hidden-sm-and-down nav-menu" to="/menu" data-cy="menuBtn">Menu</v-btn >
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <div v-if="!isLoggedIn" class="hidden-sm-and-down">
                <v-btn flat to="/sign-in" data-cy="signinBtn">SIGN IN</v-btn>
                <v-btn color="brown lighten-3" to="/join" data-cy="joinBtn">JOIN</v-btn>
             </div>
            <div v-else>
                <v-btn flat to="/listusers">User List</v-btn>
               <!-- <v-btn flat to="/about">PROFILE</v-btn>-->
                <v-btn @click="logout">Logout</v-btn >
            </div>
        </v-toolbar>
    </span>
</template>

<script>
export default {
  name: 'AppNavigation',
  created () {
    console.log(this.$store.getters.isAuth)
  },
  data () {
    return {
      appTitle: 'Umati',
      drawer: false,
      items: [
        { title: 'Menu', url: '/menu' },
        { title: 'Profile', url: '/about' },
        { title: 'Sign In', url: '/sign-in' },
        { title: 'Join', url: '/join' },
        { title: 'ListUser', url: '/listuser' }
      ]
    }
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isAuth
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout').then(() => this.$router.push({ path: '/sign-in' }))
    }
  }
}
</script>

<style scoped>
  a {
    color: white;
    text-decoration: none;
  }
</style>
