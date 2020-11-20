import React from 'react';
import {Route, BrowserRouter, Redirect} from 'react-router-dom';
import Login from "./pages/login/Login";
import Chat from "./pages/chat/Chat";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <div className="App-content">
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path='/login' component={Login}></Route>
            <Route path='/chat' component={Chat}></Route>
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;
