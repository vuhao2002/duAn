import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

function PopularProducts({ products }) {
  const popularProducts = getTopSoldOutProducts(products, 6);
  return (
    <div className="w-[20rem] bg-white p-4 rounded-sm border border-gray-200">
      <strong className="text-gray-700 font-medium">Popular Products</strong>
      <div className="mt-4 flex flex-col gap-3">
        {popularProducts.map((product) => (
          <Link
            key={product._id}
            to={`/admin/product/${product._id}`}
            className="flex items-start hover:no-underline"
          >
            <div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
              <img
                className="w-full h-full object-cover rounded-sm"
                src={product.images[0].url}
                alt={product.name}
              />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm text-gray-800 overflow-hidden line-clamp-1">
                {product.name}
              </p>
              <span
                className={classNames(
                  product.product_stock === 0
                    ? "text-red-500"
                    : product.product_stock > 50
                    ? "text-green-500"
                    : "text-orange-500",
                  "text-xs font-medium"
                )}
              >
                {product.product_stock === 0
                  ? "Out of Stock"
                  : product.stock + " in Stock"}
              </span>
            </div>
            <div className="text-xs text-gray-400 pl-1.5">
              {product.discountPrice}đ
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularProducts;

const getTopSoldOutProducts = (products, count) => {
  return products.sort((a, b) => b.sold_out - a.sold_out).slice(0, count);
};
