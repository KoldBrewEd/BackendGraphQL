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

5. Add IAM and additional authorization mode
6. In Lambda add an environment variable called "AppSyncURL" with the API endpoint URL as value (https://github.com/aws-amplify/amplify-cli/issues/1620)
