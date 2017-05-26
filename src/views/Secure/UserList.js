import React, { Component } from 'react';
import { flureeQL } from 'fql-react';

class UserRow extends Component {
  render() {
    const { username, active, anonymous, person } = this.props.user;
    const { nameFamily, nameGiven } = person || {};

    return (
      <tr>
        <td>{username}</td>
        <td>{nameGiven}</td>
        <td>{nameFamily}</td>
        <td>
          {anonymous ? <div className="badge badge-default">Anonymous</div> : null}
          <span className={active === false ? "badge badge-default" : "badge badge-success"}>
            {active === false ? "Inactive" : "Active"}
          </span>
        </td>
      </tr>
    );
  }
}


class UserList extends Component {
  render() {
    const users = this.props.data.get('user', []);
    const isLoading = this.props.data.status !== "loaded";

    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify"></i> User List
              </div>
              <div className="card-block">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Given Name</th>
                      <th>Family Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isLoading && users.length === 0 ? "No users" : null}
                    {isLoading ? 
                      <tr className="text-center">
                        <td colSpan="4">
                          <i className="my-3 center fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                          <span className="sr-only">Loading...</span>
                        </td>
                      </tr> : null}
                    {users.map((user) => <UserRow key={user.username} user={user} />)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const allUsersFQL = {
  vars: [],
  graph: [["user", {}, [
    "username", 
    "active", 
    "anonymous",
    {
      "person": [
        "nameGiven", 
        "nameFamily"
      ]
    }
  ]]]
}

export default flureeQL(allUsersFQL)(UserList);
