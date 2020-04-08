import React, { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom';
import moose from 'Images/moose.jpg'
import RandomGreetingClient from 'Clients/RandomGreetingClient'
import ReactLoading from 'react-loading';

const App = (): React.ReactElement => {
  const [greeting, setGreeting] = useState<string|null>(null)

  console.log('Rerender')

  useEffect(() => {
    (new RandomGreetingClient).getGreeting().then(({ greeting }) => {
      setGreeting(greeting)
    })
  }, [])

  return (
    <BrowserRouter>
      <div>
        {greeting ? (
          `${greeting} user!`
        ) : (
          <ReactLoading type={'cylon'} color={'black'} height={'2%'} width={'2%'} />
        )}
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
  )}

export default App
