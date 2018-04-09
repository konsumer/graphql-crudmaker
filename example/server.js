import path from 'path'
import chalk from 'chalk'
import { makeExecutableSchema } from 'graphql-tools'
import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress } from 'apollo-server-express'
import { formatError } from 'apollo-errors'
import expressPlayground from 'graphql-playground-middleware-express'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas'
import resolvers from './resolvers.js'

process.env.PORT = process.env.PORT || '3000'
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const schemaDir = path.join(__dirname, 'schema')
const typeDefs = mergeTypes(fileLoader(path.join(schemaDir, '**/*.graphql')), { all: true })
const schema = makeExecutableSchema({typeDefs, resolvers})

const app = express()

app.use('/graphql', bodyParser.json(), graphqlExpress((req, res) => {
  const context = { req }
  return { schema, context, formatError, tracing: process.env.NODE_ENV === 'development' }
}))

if (process.env.NODE_ENV === 'development') {
  app.get('/playground', expressPlayground({ endpoint: '/graphql' }))
}

// handle errors
app.use(function (err, req, res, next) {
  let e = formatError(err)
  if (!e.errors) {
    e = {errors: [{message: e.message, name: e.name}]}
  }
  res.json(e)
})

app.listen(process.env.PORT, () => {
  console.log(
    '😋  Server running at %s',
    chalk.keyword('blue').underline(`http://localhost:${process.env.PORT}${process.env.NODE_ENV === 'development' ? '/playground' : '/graphql'}`)
  )
})
