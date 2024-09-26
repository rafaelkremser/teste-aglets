import { Cart } from './components/Cart'
import ProductList from './components/ProductList'
import { CartProvider } from './contexts/CartContext'

function App() {
  return (
    <CartProvider>
      <div>
        <h1>Loja</h1>
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  )
}

export default App
