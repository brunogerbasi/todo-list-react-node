import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import logo from './logo.svg';

import Header from './Pages/Header/Header'
import Login from './Pages/Login/Login'
import Footer from './Pages/Footer/Footer'
import Register from './Pages/Register/Register';

import Tasks from './Pages/Tasks/Tasks';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <header className='App-header'>
          <Header />
        </header>

        <section>   
          <Route path='/' exact component={Login} />     
          <Route path='/register' component={Register} />     
          <Route path='/tasks' component={Tasks} />         
        </section>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
