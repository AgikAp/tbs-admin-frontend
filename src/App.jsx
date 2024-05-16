import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/home";
import GamePage from "./pages/game";
import GameDetailPage from "./pages/gamedetail";

export default function App() {
  return (
    <>
      <div className="min-h-lvh bg-dark-0" data-theme='dark'>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path='/game' element={<GamePage />} />
              <Route path='/game/:id' element={<GameDetailPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}