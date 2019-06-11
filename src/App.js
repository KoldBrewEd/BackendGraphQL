import React, { Component } from "react";
import "./App.css";
import Amplify, { graphqlOperation } from "aws-amplify";
import { Connect } from "aws-amplify-react";
import aws_exports from "./aws-exports";
import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";

Amplify.configure(aws_exports);

class App extends Component {
  render() {
    const ListView = ({ todos }) => (
      <div>
        <h3>All Todos</h3>
        <ul>
          {todos.map(todo => (
            <p key={todo.id}>{todo.name}</p>
          ))}
        </ul>
      </div>
    );

    return (
      <div className="App">
        <Connect
          query={graphqlOperation(queries.listTodos)}
          subscription={graphqlOperation(subscriptions.onCreateTodo)}
          onSubscriptionMsg={(prev, { onCreateTodo }) => {
            console.log("Subscription data:", onCreateTodo);
            return prev;
          }}
        >
          {({ data: { listTodos }, loading, error }) => {
            if (error) return <h3>Error</h3>;
            if (loading || !listTodos) return <h3>Loading...</h3>;
            return <ListView todos={listTodos ? listTodos.items : []} />;
          }}
        </Connect>
      </div>
    );
  }
}

export default App;
