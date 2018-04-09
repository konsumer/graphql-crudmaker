import pluralize from 'pluralize'

const getType = (typeName, definitions) => definitions.filter(d => d.name && d.name.value && d.name.value === typeName).pop()

// make an input-type for a given type
const getInput = (typeName, definitions) => {
  const type = getType(typeName, definitions)
  return `# an input type for ${type.name.value}
input ${type.name.value}Input {
  ${type.fields
    .filter(f => f.name.value !== 'id')
    .map(f => {
      if (f.type.type) {
        const t = getType(f.type.type.name.value, definitions)
        if (t) {
          return `${f.name.value}: ${t.name.value}Input`
        } else {
          return `${f.name.value}: ${f.type.type.name.value}`
        }
      } else {
        return `${f.name.value}: ${f.type.name.value}`
      }
    })
    .join('\n  ')
  }
}`
}

const getFilter = (typeName, definitions) => {
  const type = getType(typeName, definitions)
  return `# a filter for ${type.name.value}
input ${type.name.value}Filter {
  ${
    type.fields
      .map(f => {
        if (f.type.type) {
          const t = getType(f.type.type.name.value, definitions)
          if (t) {
            return `${f.name.value}: ${t.name.value}Filter`
          } else {
            return `${f.name.value}: ${f.type.type.name.value === 'ID' ? 'String' : f.type.type.name.value}Filter`
          }
        } else {
          return `${f.name.value}: ${f.type.name.value}Filter`
        }
      })
      .join('\n  ')
  }
}`
}

export default ({ definitions, types, type }) => `# auto-generated on ${new Date()}

# Shared: direction for a sort.
enum SortOrder {
  ASC
  DESC
}

# Shared: a filter-type for strings
input StringFilter {
  EQ: String
  GT: String
  GTE: String
  IN: [String]
  LT: String
  LTE: String
  NEQ: String
  NIN: [String]
}

# Shared: a filter-type for ints
input IntFilter {
  EQ: Int
  GT: Int
  GTE: Int
  IN: [Int]
  LT: Int
  LTE: Int
  NEQ: Int
  NIN: [Int]
}

# Shared: a filter-type for floats
input FloatFilter {
  EQ: Float
  GT: Float
  GTE: Float
  IN: [Float]
  LT: Float
  LTE: Float
  NEQ: Float
  NIN: [Float]
}

# Shared: a filter-type for booleans
input BooleanFilter {
  EQ: Boolean
  NEQ: Boolean
}

# a field from ${type.name.value}
enum ${type.name.value}Field {
  ${
    type.fields
      .map(f => f.name.value)
      .join('\n  ')
  }
}

${type.fields
  .map(f => f.type.type.name.value)
  .filter(f => types.indexOf(f) !== -1)
  .map(typeName => getFilter(typeName, definitions))
  .join('\n')
}

${getFilter(type.name.value, definitions)}

${type.fields
  .map(f => f.type.type.name.value)
  .filter(f => types.indexOf(f) !== -1)
  .map(typeName => getInput(typeName, definitions))
  .join('\n')
}

${getInput(type.name.value, definitions)}

type Query {
  # Get a single ${type.name.value}.
  get${type.name.value}(id: ID!): ${type.name.value}
  
  # Get a list of ${pluralize(type.name.value)}.
  list${pluralize(type.name.value)}(filter: ${type.name.value}Filter, sort: SortOrder = ASC, sortBy: ${type.name.value}Field): [${type.name.value}]
}

type Mutation {
  # Delete a ${type.name.value}.
  delete${type.name.value}(id: ID!): Boolean
  
  # Update an existing ${type.name.value}.
  update${type.name.value}(id: ID!, record: ${type.name.value}Input!): ${type.name.value}
  
  # Create a new ${type.name.value}.
  create${type.name.value}(record: ${type.name.value}Input!): ${type.name.value}
}

`
