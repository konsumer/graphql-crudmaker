// auto-generated on Mon Apr 09 2018 15:38:39 GMT-0700 (PDT)
export default {
  Query: {
    getUser: (obj, { id }, ctx) => {
      console.log('getUser', JSON.stringify({id}))
    },
    listUsers: (obj, { filter, sort, sortBy }, ctx) => {
      console.log('listUsers', JSON.stringify({filter, sort, sortBy}))
    }
  },
  Mutation: {
    deleteUser: (obj, { id }, ctx) => {
      console.log('deleteUser', JSON.stringify({id}))
    },
    updateUser: (obj, { id, record }, ctx) => {
      console.log('updateUser', JSON.stringify({id, record}))
    },
    createUser: (obj, { record }, ctx) => {
      console.log('createUser', JSON.stringify({record}))
    }
  }
}
