import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const [cep, setCep] = useState("");
  const [freteInfo, setFreteInfo] = useState(null);
  const [loadingFrete, setLoadingFrete] = useState(false);

  const calcularFrete = async () => {
    setLoadingFrete(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        setFreteInfo({ erro: "CEP inválido" });
      } else {
        const valorFrete = 19.9;
        const prazoDias = 5;
        setFreteInfo({
          endereco: `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`,
          frete: `R$ ${valorFrete.toFixed(2)}`,
          prazo: `${prazoDias} dias úteis`,
        });
      }
    } catch (err) {
      setFreteInfo({ erro: "Erro ao consultar o CEP" });
    } finally {
      setLoadingFrete(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Carrinho</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">O carrinho está vazio.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 border rounded-lg shadow"
              >
                <img
                  src={item.selectedImage}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm">Cor: {item.selectedColor}</p>
                  <p className="text-sm">Tamanho: {item.selectedSize}</p>
                  <p className="font-bold text-blue-600">
                    R$ {item.price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item)}
                  className="text-red-500 hover:underline"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-2xl font-bold">
            Total:{" "}
            <span className="text-blue-600">R$ {totalPrice.toFixed(2)}</span>
          </div>

          <div className="mt-4 flex gap-4">
            <button
              onClick={clearCart}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              Limpar Carrinho
            </button>
          </div>

          <div className="mt-8">
            <label className="block mb-2 font-semibold">
              Calcular Frete (CEP):
            </label>
            <input
              type="text"
              value={cep}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                const formatted =
                  rawValue.slice(0, 5) +
                  (rawValue.length > 5 ? "-" + rawValue.slice(5, 8) : "");
                setCep(formatted);
              }}
              className="border p-2 rounded w-40 mr-2"
              placeholder="Digite o CEP"
            />

            <button
              onClick={calcularFrete}
              className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition ${
                loadingFrete && "opacity-50 cursor-not-allowed"
              }`}
              disabled={loadingFrete}
            >
              {loadingFrete ? "Calculando..." : "Calcular"}
            </button>

            {freteInfo && (
              <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                {freteInfo.erro ? (
                  <p className="text-red-500">{freteInfo.erro}</p>
                ) : (
                  <>
                    <p>Endereço: {freteInfo.endereco}</p>
                    <p>Frete: {freteInfo.frete}</p>
                    <p>Prazo: {freteInfo.prazo}</p>
                  </>
                )}
              </div>
            )}
          </div>
        </>
      )}

      <Link
        to="/"
        className="inline-block mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition  text-center"
      >
        Continuar comprando
      </Link>
    </div>
  );
}

export default CartPage;
