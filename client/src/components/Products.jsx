import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { productListAction } from "../Redux/Actions/Product";

const Products = () => {
  const dispatch = useDispatch();
  const ProductListReducer = useSelector((state) => state.ProductListReducer);
  const { loading, error, products = [] } = ProductListReducer;

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {products.map((product) => (
                <div className="p-4 lg:w-1/4 md:w-1/2" key={product._id}>
                  <div className="bg-white rounded-lg shadow-md">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                      <img
                        src={product.image}
                        alt={`Image of ${product.name}`}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="mt-4 flex justify-between px-4">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <Link to={`/products/${product._id}`}>
                            <span aria-hidden="true" className="absolute inset-0"></span>
                            {product.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Review Count: {product.numReview}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Products;
