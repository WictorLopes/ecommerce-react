import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import products from "./products";
import { CartContext } from "../context/CartContext";
import toast from 'react-hot-toast';


function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [addedToCart, setAddedToCart] = useState(false); 
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setSelectedImage(product.images[0]);
    setSelectedSize(product.sizes[0]);
  }, [product]);

  const currentImageIndex = product.images.indexOf(selectedImage);
  const selectedColor = product.colors[currentImageIndex];

  const handleAddToCart = () => {
    const productWithSelection = {
      ...product,
      selectedColor,
      selectedSize,
      selectedImage,
    };
    addToCart(productWithSelection);
    toast.success(`${product.name} adicionado ao carrinho!`, { duration: 500 });
    setAddedToCart(true);
  };

  useEffect(() => {
    if (addedToCart) {
      const timer = setTimeout(() => setAddedToCart(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [addedToCart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-2xl shadow-xl p-8">
          {/* Seção de Imagens */}
          <div className="flex-1">
            <div className="relative mb-6">
              <img
                src={selectedImage}
                alt={`Imagem principal do produto ${product.name}`}
                className="w-full max-w-md mx-auto lg:mx-0 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex gap-4 justify-center lg:justify-start">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Variante ${idx + 1} do produto ${product.name}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                    selectedImage === img
                      ? "ring-4 ring-blue-500 border-blue-500 shadow-md"
                      : "border-gray-300 hover:border-gray-400 hover:shadow-sm"
                  }`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Seção de Detalhes */}
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <span className="font-semibold">🎨 Cor:</span>
              <span className="text-blue-600 font-medium">{selectedColor}</span>
            </div>

            <div className="flex items-center gap-2 text-xl">
              <span className="font-semibold">💰 Preço:</span>
              <span className="text-blue-600 font-bold">
                R$ {product.price.toFixed(2)}
              </span>
            </div>

            <div>
              <label htmlFor="size-select" className="block font-semibold text-gray-700 mb-2">
                📏 Tamanho:
              </label>
              <select
                id="size-select"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                disabled={addedToCart} // Desabilita durante a animação
                className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
                  addedToCart
                    ? "bg-green-500 text-white cursor-not-allowed scale-105" // Estado animado
                    : "bg-green-500 hover:bg-green-600 text-white hover:shadow-lg"
                }`}
                aria-label={`Adicionar ${product.name} ao carrinho`}
              >
                {addedToCart ? "✅ Adicionado!" : "🛒 Adicionar ao Carrinho"}
              </button>

              <Link
                to="/"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg text-center"
                aria-label="Voltar para a página inicial"
              >
                ← Voltar para Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;