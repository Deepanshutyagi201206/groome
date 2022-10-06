import React from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from '../pages/login'
import Home from '../pages/home';
import Mapview from '../pages/mapview';
import SalonsBySearch from '../pages/salonsbysearch';
import Salon from '../pages/salon';
import MyProfile from '../pages/myprofile';
import Cart from '../pages/cart';
import ViewProfile from '../pages/viewprofile';
import BookingsOrders from "../pages/bookingorder";
import Favourites from '../pages/favourites';
import Wallet from '../pages/wallet';
import OrderDetails from '../pages/orderdetails';
import OffersDeals from '../pages/offersdeals';
import Faqs from '../pages/faqs';
import Salons from '../pages/salonsbyfooter';
import SalonsByCategory from '../pages/salonsbycategory';
import DynamicPages from '../pages/dynamicpages';
import Privateroutes from './privateroutes';

function Router() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Home />} />
          <Route path="/mapview" element={<Mapview />} />
          <Route
            path="/searchsalons/:type/:name"
            element={<SalonsBySearch />}
          />
          <Route path="/salon/:salonNameId" element={<Salon />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/offersdeals" element={<OffersDeals />} />
          <Route path="/viewprofile" element={<ViewProfile />} />

          <Route path="/faqs" element={<Faqs />} />
          <Route path="/salons/:params" element={<Salons />} />

          <Route path="/salonsbycategory/:params" element={<SalonsByCategory />} />
          <Route path="/:title" element={<DynamicPages />} />

          <Route path="/cart" element={<Cart />} />

          <Route element={<Privateroutes />}>
            
            <Route path="/bookingsorders" element={<BookingsOrders />} />
            <Route path="/orderdetails/:orderId" element={<OrderDetails />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/wallet" element={<Wallet />} />
            

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router