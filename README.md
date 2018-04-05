# graphql-crudmaker

## IN PROGRESS

I'm still working on it, come back soon!


Simple, database-agnostic CRUD graphql schema & resolver generation.

Imagine a situation where you want to generate basic & readable CRUD operations, complete with list functions (and filter/sort) for some database that isn't widely supported, or doesn't have a database-adapter for another popular library like graphcool or whatever. This is the tool for you. It will generate basic CRUD SDL, and you can add it to your own stuff, as you wish.

I wrote a blog-post about a workflow using this tool [here](NOLINK).

## installation

```
npm i -g graphql-crudmaker
```

## usage

```
graphql-crudmaker <command>

Commands:
  graphql-crudmaker crud <TYPE_NAME> <DEFINITION_FILE>  Generate CRUD GraphQL
  graphql-crudmaker mock <TYPE_NAME> <DEFINITION_FILE>  Generate a mock CRUD GraphQL resolver
  graphql-crudmaker stub <TYPE_NAME> <DEFINITION_FILE>  Generate a stub set of CRUD GraphQL resolvers

Options:
  --out, -o  The output file. If omitted, will be stdout.
  --help     Show help  [boolean]
  --version  Show version number  [boolean]
```

## resolvers

Since this is totally hands-off about how you store/resolve your data, you'll need to implement your own resolvers, but you can use `mock` or `stub` to get you started. In `example/`, I included a database-engine that uses [levelup](https://github.com/Level/levelup), [sublevel](https://github.com/stagas/sublevel), & [jsonqueryEngine](https://github.com/eugeneware/jsonquery-engine) & a generic CRUD resolver library you can re-use, if you like.