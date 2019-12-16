<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login Form</v-toolbar-title>
          </v-toolbar>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title class="headline">Log in? </v-card-title>
              <div v-if ="isLoggedIn"> <v-card-text>User Log in is succssfull</v-card-text>
              </div>
              <div v-else>
                  <v-card-text> {{error_msg}} </v-card-text>
              </div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="close">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                name="username"
                label="User Name/Email"
                type="text"
                v-model="username"
                required
              ></v-text-field>
              <v-text-field
                name="password"
                label="Password"
                type="password"
                data-cy="signinPasswordField"
                v-model="password"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click.prevent="login"
              v-on="on"
              data-cy="signinSubmitBtn"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {

  data () {
    return {
      dialog: false,
      username: '',
      password: '',
      grant: 'password'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isAuth
    },
    error_msg: function () {
      return this.$store.getters.errorMsg
    }
  },
  methods: {
    login (event) {
      let username = this.username
      let password = this.password
      this.dialog = true
      this.$store.dispatch('login', { username, password, grant_type: 'password' })
        .then(() => {
        })
        .catch(err => {
          console.log(err)
        })
    },
    close () {
      if (this.$store.getters.isAuth) {
        this.dialog = false
        this.$router.push({ path: '/listusers' })
      } else {
        this.dialog = false
        this.username = ''
        this.password = ''
      }
    }
  }
}
</script>

<style scoped></style>
