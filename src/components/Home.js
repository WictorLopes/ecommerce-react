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
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-10 text-center">Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/produto/${product.id}`}
            className="bg-white rounded-xl shadow hover:shadow-xl transition p-6 flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain mb-4 transform hover:scale-105 transition"
            />
            <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
            <p className="text-blue-600 font-bold text-lg">
              R$ {product.price.toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
