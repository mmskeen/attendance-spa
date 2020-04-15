import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { AuthProvider } from "react-use-auth";
import Navbar from './Navbar';
import Main from './Main';
import Footer from './Footer';

const App = (props) => {


  // const { isAuthenticated, login, logout, user } = {
  //   isAuthenticated: true,
  //   user: {
  //     email: "mmskeen@gmail.com",
  //     _id: "5db88ff9e8f87b150d29d0df"
  //   }
  // }




  return (
    <AuthProvider
      navigate={props.history.push}
      auth0_domain={process.env.REACT_APP_AUTH0_DOMAIN}
      auth0_client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}>
      <div className="App">
        {/* <Navbar /> */}
        <Main />
        {/* <Main isAuthenticated={isAuthenticated}
        login={login}
        logout={logout}
        loginUser={user}
      /> */}
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default withRouter(App);


// class App extends Component {
//   state = {
//     response: '',
//     post: '',
//     responseToPost: '',
//   };

//   componentDidMount() {
//     this.callApi()
//       .then(res => this.setState({ response: res.express }))
//       .catch(err => console.log(err));
//   }

//   callApi = async () => {
//     const response = await fetch('/api/hello');
//     const body = await response.json();
//     if (response.status !== 200) throw Error(body.message);

//     return body;
//   };

//   handleSubmit = async e => {
//     e.preventDefault();
//     const response = await fetch('/api/world', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ post: this.state.post }),
//     });
//     const body = await response.text();

//     this.setState({ responseToPost: body });
//   };

// render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//         <p>{this.state.response}</p>
//         <form onSubmit={this.handleSubmit}>
//           <p>
//             <strong>Post to Server:</strong>
//           </p>
//           <input
//             type="text"
//             value={this.state.post}
//             onChange={e => this.setState({ post: e.target.value })}
//           />
//           <button type="submit">Submit</button>
//         </form>
//         <p>{this.state.responseToPost}</p>
//       </div>
//     );
//   }
// }

// export default App;