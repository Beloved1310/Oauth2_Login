import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {AuthorizeUser} from "./Component/AuthorizeUser";
import Navbar from './Component/Nav';
import profile from './Component/Profile';
import Private from './Component/PrivateRoute';



function App() {
  return (
    <div className="App">
    
       <Router>
       <Navbar />
        <div> 
        
          <Switch>
            <Route path="/oauth-callback" exact component={AuthorizeUser } />
            
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
