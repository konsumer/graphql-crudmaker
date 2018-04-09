export default ({ definitions, types, type }) => `// auto-generated on ${new Date()}
export default {
  Query: {
    get${type.name.value}: (obj, { id }, ctx) => {
      console.log('get${type.name.value}', JSON.stringify({id}))
    },
    list${type.name.value}s: (obj, { filter, sort, sortBy }, ctx) => {
      console.log('list${type.name.value}s', JSON.stringify({filter, sort, sortBy}))
    }
  },
  Mutation: {
    delete${type.name.value}: (obj, { id }, ctx) => {
      console.log('delete${type.name.value}', JSON.stringify({id}))
    },
    update${type.name.value}: (obj, { id, record }, ctx) => {
      console.log('update${type.name.value}', JSON.stringify({id, record}))
    },
    create${type.name.value}: (obj, { record }, ctx) => {
      console.log('create${type.name.value}', JSON.stringify({record}))
    }
  }
}
`
