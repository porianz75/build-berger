import React, { Component } from 'react';
import { Route,Routes } from 'react-router-dom';
// import ContactData from './containers/ContactData/ContactData';
import Orders from './containers/orders/Orders';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import hookWrapper from "./hoc/hookWrapper/hookWrapper";
class App extends Component {

    render() {

    return (
      <div style={{backgroundColor:"white"}} >
        <Layout>
              <Routes>
                  <Route path="/"  element={<BurgerBuilder/>} />
                  <Route path="/checkout/*" element={<Checkout/>} />
                  <Route path="/orders" element={<Orders/>} />
                  <Route path='*' element={<h1>this page not found/ please try again</h1>}/>
              </Routes>
        </Layout>
      </div>
    );
  }
}

export default hookWrapper(App);
