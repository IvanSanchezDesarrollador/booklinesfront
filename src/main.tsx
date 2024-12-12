import { createRoot } from 'react-dom/client'
import { AppRoutes } from './routes/AppRoutes.tsx'
import { NextUIProvider } from "@nextui-org/react";
import './index.css'


createRoot(document.getElementById('root')!).render(
  <NextUIProvider>
    <AppRoutes />
  </NextUIProvider>,
)
