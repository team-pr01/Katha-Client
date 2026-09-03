type TProductAttributes = {
  label: string;
  value: string;
};

const ProductAttributes = ({
  productAttributes,
}: {
  productAttributes: TProductAttributes[];
}) => {
  return (
    <div className="border-t border-neutral-50 pt-4 my-6 space-y-2">
        {productAttributes?.map((attr: TProductAttributes) => (
          <div key={attr.label} className="flex gap-2 text-sm">
            <span className="text-neutral-5 font-semibold" >{attr.label}:</span>
            <span className="text-neutral-10 font-medium">{attr.value}</span>
          </div>
        ))}
    </div>
  );
};

export default ProductAttributes;
