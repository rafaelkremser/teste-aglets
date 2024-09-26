import { useCart } from "../contexts/CartContext";

export function Cart() {
  const { items, removeItem } = useCart();
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Carrinho de Compras</h2>
      {items.length === 0 ? (
        <p>Carrinho vazio</p>
      ) : (
        <div>
          {items.map(item => (
            <div key={item.id}>
              <span>{item.name} - ${item.price} x {item.quantity}</span>
              <button onClick={() => removeItem(item)}>Remover</button>
            </div>
          ))}
          <h3>Total: ${total}</h3>
        </div>
      )}
    </div>
  );
}
