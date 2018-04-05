#!/usr/bin/env node

// look at current type-defs, and make crud with nice sort/filter for list

import path from 'path'
import { readFileSync, writeFileSync } from 'fs'
import { parse } from 'graphql'
import yargs from 'yargs'

import tServer from './templates/server'
import tGraphql from './templates/graphql'
import tMock from './templates/mock'

const getVars = (name, def) => {
  const typeDefs = readFileSync(def).toString()
  const definitions = parse(typeDefs).definitions
  const types = definitions
    .filter(d => d.kind === 'ObjectTypeDefinition')
    .map(d => d.name && d.name.value)
    .filter(d => d && d !== 'Query' && d !== 'Mutation' && d !== 'QueryStats' && d.slice(-4) !== 'List')
  if (types.indexOf(name) === -1) {
    throw new Error(`${name} is not defined in ${path.basename(def)}`)
  }
  const type = definitions
    .filter(d => d.name && d.name.value === name)
    .pop()
  return { definitions, types, type }
}

yargs
  .command('crud <TYPE_NAME> <DEFINITION_FILE>', 'Generate CRUD GraphQL', yargs => {}, argv => {
    const out = tGraphql(getVars(argv.TYPE_NAME, argv.DEFINITION_FILE))
    if (argv.out) {
      writeFileSync(argv.out, out)
    } else {
      console.log(out)
    }
  })
  .command('mock <TYPE_NAME> <DEFINITION_FILE>', 'Generate a mock CRUD GraphQL resolver', yargs => {}, argv => {})
  .command('stub <TYPE_NAME> <DEFINITION_FILE>', 'Generate a stub set of CRUD GraphQL resolvers', yargs => {}, argv => {})
  .option('out', { alias: 'o', description: 'The output file. If omitted, will be stdout.' })
  .wrap(0)
  .demandCommand()
  .help()
  .version()
  .argv
