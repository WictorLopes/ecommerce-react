import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import products from "./products";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
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
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 max-w-5xl mx-auto p-8">
      <div>
        <img
          src={selectedImage}
          alt={product.name}
          className="w-full md:w-[400px] rounded-xl shadow-lg mb-4"
        />
        <div className="flex gap-3">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Variante ${idx + 1}`}
              className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                selectedImage === img
                  ? "ring-2 ring-blue-500"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-600">{product.description}</p>

        <div className="text-sm text-gray-700">
          <span className="font-semibold">Cor:</span> {selectedColor}
        </div>

        <div className="text-lg">
          <span className="font-semibold">Preço:</span>{" "}
          <span className="text-blue-600 font-bold">
            R$ {product.price.toFixed(2)}
          </span>
        </div>

        <div>
          <label className="font-semibold">Tamanho:</label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="ml-2 border p-1 rounded"
          >
            {product.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition mt-4"
        >
          Adicionar ao Carrinho
        </button>

        <Link
          to="/"
          className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition  text-center"
        >
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}

export default ProductDetails;
