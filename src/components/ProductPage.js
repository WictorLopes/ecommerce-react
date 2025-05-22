// import { useParams, Link } from 'react-router-dom';
// import { useState, useEffect, useContext } from 'react';
// import products from '../data/products';
// import { CartContext } from '../context/CartContext';

// function ProductDetails() {
//   const { id } = useParams();
//   const product = products.find(p => p.id === parseInt(id));
//   const [selectedImage, setSelectedImage] = useState(product.images[0]);
//   const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
//   const { addToCart } = useContext(CartContext);

//   useEffect(() => {
//     setSelectedImage(product.images[0]);
//     setSelectedSize(product.sizes[0]);
//   }, [product]);

//   const selectedColor = product.colors[product.images.indexOf(selectedImage)];

//   return (
//     <div className="flex flex-col md:flex-row gap-8 p-8">
//       <div>
//         <img src={selectedImage} alt={product.name} className="w-[35vw] max-w-md h-auto object-contain mb-4" />
//         <div className="flex space-x-2">
//           {product.images.map((img, idx) => (
//             <img
//               key={idx}
//               src={img}
//               alt={`Variante ${idx + 1}`}
//               className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${
//                 selectedImage === img ? 'border-blue-500' : 'border-transparent'
//               }`}
//               onClick={() => setSelectedImage(img)}
//             />
//           ))}
//         </div>
//       </div>

//       <div className="flex flex-col gap-4">
//         <h1 className="text-2xl font-bold">{product.name}</h1>
//         <p className="text-gray-600">{product.description}</p>

//         <div>
//           <span className="font-semibold">Cor:</span> 
//           <span className="ml-2">{selectedColor}</span>
//         </div>

//         <div>
//           <span className="font-semibold">Preço:</span> 
//           <span className="ml-2 text-lg font-bold">R$ {product.price.toFixed(2)}</span>
//         </div>

//         <div>
//           <label className="font-semibold">Tamanho:</label>
//           <select
//             value={selectedSize}
//             onChange={e => setSelectedSize(e.target.value)}
//             className="ml-2 border p-1 rounded"
//           >
//             {product.sizes.map(size => (
//               <option key={size} value={size}>
//                 {size}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button
//           onClick={() => addToCart(product, selectedColor, selectedSize)}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
//         >
//           Adicionar ao Carrinho
//         </button>

//         <Link to="/" className="mt-4 text-blue-500 hover:underline">
//           ← Voltar para Home
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;
