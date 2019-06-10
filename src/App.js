import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Amplify, { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";

import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";

class App extends Component {
  render() {
    const ListView = ({ todos }) => (
      <div>
        <h3>All Todos</h3>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.name} ({todo.id})
            </li>
          ))}
        </ul>
      </div>
    );

    return (
      <Connect
        query={graphqlOperation(queries.listTodos)}
        subscription={graphqlOperation(subscriptions.onCreateTodo)}
        onSubscriptionMsg={(prev, { onCreateTodo }) => {
          console.log(onCreateTodo);
          return prev;
        }}
      >
        {({ data: { listTodos }, loading, error }) => {
          if (error) return <h3>Error</h3>;
          if (loading || !listTodos) return <h3>Loading...</h3>;
          return <ListView todos={listTodos ? listTodos.items : []} />;
        }}
      </Connect>
    );
  }
}

export default App;
