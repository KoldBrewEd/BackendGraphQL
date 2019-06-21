![Overview](backendGraphQL-small.gif)

1. amplify init
2. amplify add api (Todos)
3. amplify add function (Create and Update permissions to API)
4. Modify the schema on the console:

```
type Todo @aws_api_key @aws_iam {
	id: ID!
	name: String!
	description: String
}

type Mutation @aws_api_key @aws_iam {
	createTodo(input: CreateTodoInput!): Todo
	updateTodo(input: UpdateTodoInput!): Todo
	deleteTodo(input: DeleteTodoInput!): Todo
}
```

5. Lambda Function Code: amplify/backend/function/backendgraphql52d39904/src/index.js
6. Add IAM as additional authorization mode
7. amplify serve
8. Open http://localhost:3000 on a browser, invoke Lambda from the console and receive the new Todo on the frontend
