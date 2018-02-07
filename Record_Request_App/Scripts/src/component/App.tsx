import * as React from "react";
import { mockdata } from "../res/mockdata";
import { mockuser } from "../res/mockuser";
import { Greeting } from "./Greeting";
import { DepList } from "./UserDep";

// app content refers to everything in the app below the header
export class App extends React.Component {

  state = {
    uName: mockuser.name,
    departmentid: mockuser.departments,
  };

  render() {
    return (
      <div>

        <Greeting 
          name={this.state.uName}
          departmentid={this.state.departmentid}
        />

        <h1>Select one of your available deparments:</h1>

        <DepList
          items={this.state.departmentid}
        />

      </div>
    );
    
  }
}
