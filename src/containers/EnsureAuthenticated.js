import { Component, PropTypes } from 'react';

class EnsureAuthenticatedContainer extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    conn: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { router, conn } = this.context;

    const loginRoute = this.props.loginRoute || '/pages/login';

    if (!conn.isAuthenticated()) {
      // redirect to login if not
      router.push(loginRoute + '?redirect=' + router.location.pathname);
    }
  }

  render() {
    if (this.context.conn.isAuthenticated()) {
      return this.props.children
    } else {
      return null
    }
  }
}

export default EnsureAuthenticatedContainer;
