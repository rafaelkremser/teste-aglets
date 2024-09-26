import { useCart } from '../contexts/CartContext';

const products = [
  { id: 1, name: 'Produto 1', price: 10 },
  { id: 2, name: 'Produto 2', price: 15 },
  { id: 3, name: 'Produto 3', price: 20 },
];

function ProductList() {
  const { addItem } = useCart();

  return (
    <div>
      <h2>Produtos</h2>
      {products.map(product => (
        <div key={product.id}>
          <span>{product.name} - ${product.price}</span>
          <button onClick={() => addItem(product)}>Adicionar ao Carrinho</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
