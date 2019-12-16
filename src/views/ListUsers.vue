<template>
  <v-container>
    <v-layout align-center justify-center>
      <div id="app">
        <v-app id="inspire">
          <v-data-table
            :headers="headers"
            :items="userlist"
            :search="search"
            sort-by="calories"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>User Table</v-toolbar-title>
                <v-spacer class="ms-11"></v-spacer>
                <v-spacer class="ms-11"></v-spacer><v-spacer class="ms-11"></v-spacer><v-spacer class="ms-11"></v-spacer><v-spacer class="ms-11"></v-spacer>
                <v-text-field v-model="search" hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.id" label="Id" readonly/>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.fullname" label="Full Name"/>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.address" label="Address"/>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.mobile" label="Mobile"/>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.username" label="User Name"/>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon small class="mr-2" v-if="!item.activated" @click="approve(item)" >{{icons.mdiAccountCheck}}</v-icon>
              <v-icon small class="mr-2"  v-if="!item.activated" @click="deleteItem(item)" >{{icons.mdiDelete}}</v-icon>
              <v-icon small class="mr-2"  @click="editItem(item)">{{icons.mdiPencil}}</v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
          </v-data-table>
        </v-app>
      </div>
    </v-layout></v-container></template>

<script>
import {
  mdiDelete,
  mdiPencil,
  mdiAccountCheck,
  mdiSearchWeb
} from '@mdi/js'
export default {
  name: 'ListUsers',
  data: () => ({
    dialog: false,
    search: '',
    editedIntex: -1,
    icons: {
      mdiDelete,
      mdiPencil,
      mdiAccountCheck,
      mdiSearchWeb
    },
    editedItem: {
      id: '',
      fullname: '',
      address: '',
      mobile: '',
      username: ''
    },
    defaultItem: {
      id: '',
      fullname: '',
      address: '',
      mobile: '',
      username: ''
    },
    headers: [
      { text: 'User ID', value: 'id' },
      {
        text: 'User Full Name',
        align: 'left',
        value: 'fullname'
      },
      { text: 'Address', value: 'address' },
      { text: 'Mobile', value: 'mobile' },
      { text: 'User Name', value: 'username' },
      { text: 'Active', value: 'activated' },
      { text: 'Actions', value: 'action' }
    ]
  }),
  computed: {
    userlist () {
      return this.$store.getters.userListStore
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    console.log('List user method called')
    this.$store.dispatch('listUser').then(() => { console.log('List user method called') })
  },
  methods: {
    editItem (item) {
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const isConfirm = confirm('Are you sure you want to delete this item?')
      if (isConfirm) {
        this.$store.dispatch('deleteUser', item.id).then(() => {
          this.$store.dispatch('listUser').then(() => { console.log('List user method called') })
        }).catch(err => console.log(err))
      }
    },
    approve (item) {
      item.activated = true
      const isConfirm = confirm('Are you sure you want to approve this User?')
      if (isConfirm) {
        this.$store.dispatch('updateUser', item).then(() => {
          this.$store.dispatch('listUser').then(() => { console.log('List user method called') })
        }).catch(err => console.log(err))
      }
    },
    close () {
      this.dialog = false
      setTimeout(() => {
      }, 300)
    },
    save () {
      this.$store.dispatch('updateUser', this.editedItem).then(() => {
        console.log('in if')
        this.$store.dispatch('listUser').then(() => { console.log('List user method called') })
        this.dialog = false
      }).catch(err => console.log(err))
    }
  }
}
</script>
<style scoped>
</style>
