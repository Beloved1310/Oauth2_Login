import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {AuthorizeUser} from "./Component/AuthorizeUser";
import Navbar from './Component/Nav';
import profile from './Component/Profile';
import Private from './Component/PrivateRoute';
import RequestToken from './Component/RequestToken';



function App() {
  return (
    <div className="App">
    
       <Router>
       <Navbar />
        <div> 
        
          <Switch>
            <Route path="/" exact component={AuthorizeUser } />
            <Route path="/oauth-callback" exact component={RequestToken } />
            
            <Private path="/profile">
              <profile />
            </Private>
            <Route path="/profile" component={profile} />

          </Switch>
        </div>
      </Router>
     
    </div>
  );
}

export default App;
