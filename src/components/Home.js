import React from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Tênis Esportivo",
    price: 159.99,
    image: "/produtos/tenis/tenisHome.png",
  },
  {
    id: 2,
    name: "Camisas Formula 1",
    price: 89.99,
    image: "/produtos/camisasf1/redbull.webp",
  },
  {
    id: 3,
    name: "Boné Casual",
    price: 39.99,
    image: "/produtos/bones/boneAzul.webp",
  },
  {
    id: 4,
    name: "Bicicleta",
    price: 299.99,
    image: "/produtos/bicicletas/biciPreta.webp",
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Loja do Wictor
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubra nossa seleção de itens esportivos e casuais, com preços imperdíveis.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/produto/${product.id}`}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col items-center p-6 border border-gray-200 hover:border-blue-300"
            >
              <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={`Imagem do produto ${product.name}`}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center group-hover:text-blue-600 transition-colors">
                {product.name}
              </h2>
              <p className="text-blue-600 font-bold text-2xl mb-4">
                R$ {product.price.toFixed(2)}
              </p>

              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Ver Detalhes
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
