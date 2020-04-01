import React from 'react'
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';
import moose from 'Images/moose.jpg'

const App = (): React.ReactElement => (
  <BrowserRouter>
    <div>
      Howdy user!
    </div>
    <div><Link to="/">Home</Link></div>
    <div><Link to="/about">About</Link></div>
    <div><Link to="/moose">Moose</Link></div>
    <Route path="/" exact={true}>
      <p>This is the index page</p>
    </Route>
    <Route path="/about" exact={true}>
      <p>This is the about page</p>
    </Route>
    <Route path="/moose" exact={true}>
      <p>This is the moose page</p>
      <img src={moose} alt="moose" />
    </Route>
  </BrowserRouter>
)

export default App
