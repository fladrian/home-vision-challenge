import { useProducts } from '../api/get-products';
import { useProductsStore } from '../stores/use-products-store';
import { cn } from '../../../utils/cn';

export const ProductList = () => {
  const { data: products, isLoading, error } = useProducts();
  const { selectedProductId, setSelectedProductId } = useProductsStore();

  if (isLoading) return <div className="p-8 text-center">Loading products...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error loading products: {(error as Error).message}</div>;

  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products?.map((product) => (
        <div
          key={product.id}
          className={cn(
            'group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl dark:bg-zinc-900',
            selectedProductId === product.id && 'ring-2 ring-purple-500 ring-offset-2'
          )}
          onClick={() => setSelectedProductId(product.id)}
        >
          <div className="aspect-square overflow-hidden bg-white p-4">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col p-4">
            <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-purple-600">
              {product.category}
            </span>
            <h3 className="mb-2 line-clamp-1 text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {product.title}
            </h3>
            <p className="mb-4 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
              {product.description}
            </p>
            <div className="mt-auto flex items-center justify-between">
              <span className="text-xl font-black text-zinc-900 dark:text-zinc-100">
                ${product.price}
              </span>
              <button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
