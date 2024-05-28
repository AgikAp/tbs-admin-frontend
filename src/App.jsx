import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/home";
import GamePage from "./pages/game";
import GameDetailPage from "./pages/gamedetail";
import ItemPage from "./pages/item";
import BannerPage from "./pages/banner";
import PaymentPage from "./pages/payment";

export default function App() {
  return (
    <>
      <div className="min-h-lvh bg-dark-0" data-theme='dark'>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path='/game' element={<GamePage />} />
              <Route path='/game/create' element={<GameDetailPage isCreate={true} />} />
              <Route path='/game/:id' element={<GameDetailPage isCreate={false} />} />
              <Route path="/item" element={<ItemPage />} />
              <Route path="/banner" element={<BannerPage />} />
              <Route path="/payment" element={<PaymentPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}