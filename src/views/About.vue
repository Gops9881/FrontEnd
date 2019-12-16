<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Profile</v-toolbar-title>
          </v-toolbar>
          <v-list>
            <v-list-item>
              <v-list-item-content>Full Name</v-list-item-content>
              <v-list-item-content >{{userlist.fullname}}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content >Mobile</v-list-item-content>
              <v-list-item-content>{{userlist.mobile}}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>Address</v-list-item-content>
              <v-list-item-content>{{userlist.address}}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content >User Name</v-list-item-content>
              <v-list-item-content >{{userlist.username}}</v-list-item-content>
              </v-list-item>
          </v-list>
          <v-card-actions>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import JWT_DEC from 'jwt-decode'
export default {
  name: 'About',
  data () {
    return {
      username: ''
    }
  },
  created () {
    const payload = JWT_DEC(localStorage.getItem('token'))
    console.log(payload.user_name)
    this.$store.dispatch('getUser', payload.user_name).then(() => {
    }).catch(err => console.log(err))
  }
}
</script>
