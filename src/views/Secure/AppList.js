import React, { Component } from 'react';
import { flureeQL } from 'fql-react';

class AppRow extends Component {
  render() {
    const { organization, application, doc, version, url } = this.props.app;

    return (
      <tr>
        <td>{organization}.{application}</td>
        <td className="text-center"><span className="badge badge-default">{version}</span></td>
        <td>{doc}</td>
        <td>{url}</td>
      </tr>
    );
  }
}


class AppList extends Component {
  render() {
    const apps = this.props.data.get('app', []);
    const isLoading = this.props.data.status !== "loaded";

    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify"></i> App List
              </div>
              <div className="card-block">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Application</th>
                      <th className="text-center">Version</th>
                      <th>Doc</th>
                      <th>Url</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isLoading && apps.length === 0 ? "No apps" : null}
                    {isLoading ?
                      <tr className="text-center">
                        <td colSpan="4">
                          <i className="my-3 center fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
                          <span className="sr-only">Loading...</span>
                        </td>
                      </tr> : null}
                    {apps.map((app) => <AppRow key={app.flake} app={app} />)}
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

const allAppsFQL = {
  vars: [],
  graph: [["app", {}, [
    "flake",
    "organization",
    "application",
    "version",
    "doc",
    "url"
  ]]]
}

export default flureeQL(allAppsFQL)(AppList);
