import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import ScrollIntoView from "./components/ScrollIntoView";


function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };
  return (
    <BrowserRouter>
    <ScrollIntoView>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>&#9776;</button>
            <Link to="/">Tiny Treasures HK</Link>
          </div>
          <div className="header-links">
            <Link to="/cart">Cart</Link>
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>
            x
          </button>
          <ul className="categories">
          <li>
              <Link to="/" onClick={closeMenu}>All</Link>
            </li>
            <li>
              <Link to="/category/Montessori" onClick={closeMenu} >Montessori</Link>
            </li>
            <li>
              <Link to="/category/Pretend Play" onClick={closeMenu}>Pretend Play</Link>
            </li>
            <li>
              <Link to="/category/Learning and Education" onClick={closeMenu}>Learning and Education</Link>
            </li>
            <li>
              <Link to="/category/Electronics" onClick={closeMenu}>Electronics</Link>
            </li>
            <li>
              <Link to="/category/Play Vehicles" onClick={closeMenu}>Play Vehicles</Link>
            </li>
            <li>
              <Link to="/category/Books" onClick={closeMenu}>Books</Link>
            </li>
            <li>
              <Link to="/category/Other" onClick={closeMenu}>Other</Link>
            </li>
            <hr/>
            <li>
              <Link to="/aboutus" onClick={closeMenu}>About Us</Link>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
            <Route path="/aboutus" exact={true} component={AboutUsScreen} />
          </div>
        </main>
        <footer className="footer">
        <ul style={{ listStyleType: "none", textAlign: 'center' }}>
          <li>
            <div>All right reserved.</div>
          </li>
          <li>
              <div style={{ textAlign: 'center', fontSize : "0.8rem" }}>
            Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
            </div>
          </li>
        </ul>
        </footer>
      </div>
      </ScrollIntoView>
    </BrowserRouter>
  );
}

export default App;
