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

  const isCepValid = cep.replace(/\D/g, "").length === 8;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
            🛒 Carrinho de Compras
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">O carrinho está vazio.</p>
              <Link
                to="/"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Continuar Comprando
              </Link>
            </div>
          ) : (
            <>
              {/* Itens do Carrinho */}
              <div className="space-y-6 mb-8">
                {cart.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row items-center gap-6 p-6 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 bg-gray-50"
                  >
                    <img
                      src={item.selectedImage}
                      alt={`Imagem do produto ${item.name}`}
                      className="w-24 h-24 object-cover rounded-lg shadow-sm"
                    />
                    <div className="flex-1 text-center sm:text-left">
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        {item.name}
                      </h2>
                      <p className="text-sm text-gray-600 mb-1">
                        🎨 Cor: {item.selectedColor}
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        📏 Tamanho: {item.selectedSize}
                      </p>
                      <p className="text-blue-600 font-bold text-lg">
                        R$ {item.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                      aria-label={`Remover ${item.name} do carrinho`}
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>

              {/* Seção de Frete */}
              <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  🚚 Calcular Frete
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="flex-1">
                    <label htmlFor="cep-input" className="block text-sm font-medium text-gray-700 mb-1">
                      CEP:
                    </label>
                    <input
                      id="cep-input"
                      type="text"
                      value={cep}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, "");
                        const formatted =
                          rawValue.slice(0, 5) +
                          (rawValue.length > 5 ? "-" + rawValue.slice(5, 8) : "");
                        setCep(formatted);
                      }}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Digite o CEP (ex: 12345-678)"
                      maxLength={9}
                    />
                  </div>
                  <button
                    onClick={calcularFrete}
                    disabled={!isCepValid || loadingFrete}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md ${
                      isCepValid && !loadingFrete
                        ? "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    aria-label="Calcular frete com base no CEP"
                  >
                    {loadingFrete ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Calculando...
                      </span>
                    ) : (
                      "Calcular"
                    )}
                  </button>
                </div>
                {freteInfo && (
                  <div className="mt-4 p-4 border rounded-lg bg-white">
                    {freteInfo.erro ? (
                      <p className="text-red-500 font-medium">{freteInfo.erro}</p>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-gray-700">
                          📍 <strong>Endereço:</strong> {freteInfo.endereco}
                        </p>
                        <p className="text-gray-700">
                          💰 <strong>Frete:</strong> {freteInfo.frete}
                        </p>
                        <p className="text-gray-700">
                          ⏱️ <strong>Prazo:</strong> {freteInfo.prazo}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Resumo e Ações */}
              <div className="border-t pt-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                  <div className="text-2xl font-bold text-gray-900">
                    Total: <span className="text-blue-600">R$ {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={clearCart}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                      aria-label="Limpar todos os itens do carrinho"
                    >
                      Limpar Carrinho
                    </button>
                    <Link
                      to="/"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg text-center"
                      aria-label="Continuar comprando na página inicial"
                    >
                      Continuar Comprando
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
