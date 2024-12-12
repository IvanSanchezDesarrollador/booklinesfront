import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StoreLayout } from "../app/store/layout/StoreLayout";
import ProtectedRoute from "../utils/ProtectedRoute";
import { AdminLayout } from "../app/admin/layout/AdminLayout";
import { HomePage } from "../app/store/home/pages/HomePage";
import { DashboardPage } from "../app/admin/dashboard/pages/DashboardPage";
import { useUIStore } from "../store/ui/ui-store";
import { useEffect, useState } from "react";
import BookPages from "../app/admin/books/pages/BookPages";
import { BookDetailPage } from "../app/store/home/pages/BookDetailPage";

export const AppRoutes = () => {

  const userAutenticado = useUIStore((state) => state.userAutenticado);
  const [isAuthenticated , setIsAuthenticated] =  useState<boolean>(false);

  const verf =  true;

  useEffect(() => {
    if (userAutenticado) {
      setIsAuthenticated(true);
    }else{
      setIsAuthenticated(false)
    }
  }, [userAutenticado]);



  return (
    <>
      <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<StoreLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<HomePage />} />
          <Route path="/books-detail/:id" element={<BookDetailPage/>} />
        </Route>

        {/* Rutas del dashboard protegidas */}
        <Route
          element={
            <ProtectedRoute isAuthenticated={verf}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage></DashboardPage>} />
          <Route path="/books-admin" element={<BookPages></BookPages>} />

          {/* Agrega más rutas del dashboard aquí */}
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
};
