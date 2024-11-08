import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/auth-context.jsx'
import { ContactProvider } from './context/contact-context.jsx'
import { ProductProvider } from './context/product-context.jsx'
import { CartProvider } from './context/cart-context.jsx'
import { CategoryProvider } from './context/category-context.jsx'
import { AdminProvider } from './context/admin-context.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ContactProvider>
      <ProductProvider>
        <CategoryProvider>
          <CartProvider>
            <AdminProvider>
              <StrictMode>
                <App />
              </StrictMode>
            </AdminProvider>
          </CartProvider>
        </CategoryProvider>
      </ProductProvider>
    </ContactProvider>
  </AuthProvider>
)
