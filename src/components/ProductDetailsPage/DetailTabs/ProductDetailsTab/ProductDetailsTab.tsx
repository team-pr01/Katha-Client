const ProductDetailsTab = ({
  description,
  material,
  tags,
}: {
  description: string;
  material: string[];
  tags: string[];
}) => {
  return (
    <div className="prose max-w-none">
      <p className="text-neutral-10 leading-relaxed">
        {description || "Product description not available."}
      </p>
      {material && material.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-neutral-10">Materials:</h4>
          <ul className="mt-2 space-y-1 text-neutral-10">
            {material.map((mat: string, idx: number) => (
              <li key={idx}>✓ {mat}</li>
            ))}
          </ul>
        </div>
      )}
      {tags && tags.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold text-neutral-10">Tags:</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="text-xs bg-neutral-20 text-neutral-45 px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsTab;
