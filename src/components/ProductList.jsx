import { Link } from "react-router-dom";
import Spin from "../assets/icons/Spin";

export default function ProductList({ products }) {
  return (
    <div className="bg-gray-200">
      <div className="max-w-2xl mx-auto py-8 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Highline Hoddies
        </h2>

        {products.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product, index) => {
              if (index < 12)
                return <Item key={product.id} product={product} />;
            })}
          </div>
        ) : (
          <div className="h-80 flex items-center justify-center">
            <Spin />
          </div>
        )}
      </div>
    </div>
  );
}

function Item({ product }) {
  return (
    <div className="group relative">
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
        <img
          src={product.thumbnail}
          alt={product.thumbnail_id}
          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div className="w-2/3">
          <h3 className="text-sm text-gray-700">
            <Link to={`/item/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.title}
            </Link>
          </h3>
          <span className="text-sm text-gray-400">{product.id}</span>
        </div>
        <div className="w-1/3 text-right">
          <p className="text-md font-bold text-indigo-700">{`$ ${Math.trunc(
            product.price
          )}`}</p>
        </div>
      </div>
    </div>
  );
}
