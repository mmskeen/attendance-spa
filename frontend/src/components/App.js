import React from 'react';
import { withRouter } from "react-router-dom";
import { AuthProvider } from "react-use-auth";
import Main from './Main';

const App = (props) => {

  return (
    <AuthProvider
      navigate={props.history.push}
      auth0_domain={process.env.REACT_APP_AUTH0_DOMAIN}
      auth0_client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}>
      <div className="App">
        <Main />
      </div>
    </AuthProvider>
  );
}

export default withRouter(App);
