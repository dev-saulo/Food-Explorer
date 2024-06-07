import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { CreateDish } from "../pages/AddDish";
import { EditDish } from "../pages/Edit";
import { Profile } from "../pages/Profile";
import { Details } from "../pages/Details";
import { Card } from "../pages/Card";
import { Orders } from "../pages/OrderHistory";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/AddDish" element={<CreateDish />} />
            <Route path="/edit/:id" element={<EditDish />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/card" element={<Card />} />
            <Route path="/OrderHistory" element={<Orders />} />
        </Routes>
    )
}