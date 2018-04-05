import pluralize from 'pluralize'

export default ({ definitions, types, type }) => `# auto-generated on ${new Date()}

# Shared: direction for a sort.
enum SortOrder {
  ASC
  DESC
}

# Shared: a filter-type
input FilterOp {
  EQ: String
  GT: String
  GTE: String
  IN: [String]
  LT: String
  LTE: String
  NEQ: String
  NIN: [String]
}

# a field from ${type.name.value}
enum ${type.name.value}Field {
  ${
    type.fields
      .map(f => f.name.value)
      .join('\n  ')
  }
}

# a filter for ${type.name.value}
type ${type.name.value}Filter {
  ${
    type.fields
      .map(f => `${f.name.value}: [FilterOp]`)
      .join('\n  ')
  }
}

# a modification of a ${type.name.value}
input ${type.name.value}Input {
  ${
    type.fields
      .filter(f => f.name.value !== 'id')
      .map(f => f.name.value)
      .join('\n  ')
  }
}

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
  update${type.name.value}(id: ID!, record: ${type.name.value}Input!): Boolean
  
  # Create a new ${type.name.value}.
  create${type.name.value}(record: ${type.name.value}Input!): Boolean
}

`
