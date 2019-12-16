<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Join Form</v-toolbar-title>
          </v-toolbar>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title class="headline">Join User </v-card-title>
              <div v-if ="isSuccess"> <v-card-text>User has Joined</v-card-text>
              </div>
              <div v-else>
                <v-card-text>Opps!! User missed it....Pleas try again </v-card-text>
              </div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="close">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field name="fullname" label="Full Name" type="text" v-model="fullname" required></v-text-field>
              <v-text-field name="mobile" label="Contact Number" type="text" v-model="mobile" required></v-text-field>
              <v-text-field name="address" label="Address" type="text" v-model="address" required></v-text-field>
              <v-text-field name="username" label="User Name" type="text" :rules="usernameRules" v-model="username"  required ></v-text-field>
              <v-text-field name="password" label="Password" type="password" required v-model="password" :rules="passwordRules" data-cy="joinPasswordField"></v-text-field>

            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" :disabled="!valid" @click="submit" data-cy="joinSubmitBtn">Join</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Join',
  data () {
    return {
      dialog: false,
      isSuccess: false,
      valid: false,
      fullname: '',
      mobile: '',
      address: '',
      username: '',
      password: '',
      usernameRules: [
        v => !!v || 'User Name is required',
        v => /.+@.+/.test(v) || 'User Name must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v =>
          v.length >= 6 ||
          'Password must be greater than 6 characters'
      ]
    }
  },
  methods: {
    submit (event) {
      if (this.$refs.form.validate()) {
        const reqData = {
          fullname: this.fullname,
          mobile: this.mobile,
          address: this.address,
          username: this.username,
          password: this.password
        }
        this.$store.dispatch('register', reqData)
          .then(() => {
            this.isSuccess = true
            this.dialog = true
          })
          .catch(err => {
            this.dialog = true
            event.target.reset()
            console.log(err)
          })
      }
    },
    close () {
      if (this.isSuccess) {
        this.dialog = false
        this.$router.push({ path: '/sign-in' })
      } else {
        this.dialog = false
      }
    }
  }
}
</script>

<style scoped></style>
