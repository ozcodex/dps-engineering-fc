// import React from 'react';
// import './App.css';
// import Background from './Background.jsx'
// import Banner from './Banner.jsx'

// function App() {
//   return (
//     <div className="App">
//       <Background />
//       <header className="App-header">
//         <Banner />
//       </header>
//     </div>
//   );
// }

// export default App;


// App.js

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Background from './Background.jsx';
import Banner from './Banner.jsx'

class App extends Component {
  render() {
    return (
    <Router>
        <div>
          <h2>Welcome to Path4</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            {/* <li><Link to={'/contact'} className="nav-link">Contact</Link></li> */}
            <li><Link to={'/about'} className="nav-link">About</Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/contact' component={Contact} />
              <Route path='/about' component={About} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
