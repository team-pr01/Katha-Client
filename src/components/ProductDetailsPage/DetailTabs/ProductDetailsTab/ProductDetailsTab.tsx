const ProductDetailsTab = ({
  description,
  tags,
}: {
  description: string;
  tags: string[];
}) => {
  return (
    <div className="prose max-w-none font-Manrope">
      <h4 className="font-bold text-neutral-10">About the Product</h4>
      <p
        className="text-neutral-10 leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: description || "Product description not available.",
        }}
      />
      {tags && tags.length > 0 && (
        <div className="mt-4">
          <h4 className="font-bold text-neutral-10">Tags:</h4>
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
