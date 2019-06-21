module.exports = {
  mutation: `mutation CreateTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      name
      description
    }
  }
  `
};
