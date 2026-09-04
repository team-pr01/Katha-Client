import { useState } from "react";
import ProductDetailsTab from "./ProductDetailsTab/ProductDetailsTab";
import ReviewsTab from "./ReviewsTab/ReviewsTab";

type TDetailTabsProps = {
  totalReviews: number;
  description: string;
  tags: string[];
};

type TTab = {
  id: "details" | "reviews";
  label: string;
  component: React.ReactNode;
};

const DetailTabs = ({
  totalReviews,
  description,
  tags,
}: TDetailTabsProps) => {
  const [activeTab, setActiveTab] = useState<"details" | "reviews">("details");

  const tabs: TTab[] = [
    {
      id: "details",
      label: "Product Details",
      component: (
        <ProductDetailsTab
          description={description}
          tags={tags}
        />
      ),
    },
    {
      id: "reviews",
      label: `Reviews (${totalReviews})`,
      component: <ReviewsTab />,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 md:p-8 mt-6">
      <div className="flex border-b border-neutral-50 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium transition-all relative ${
              activeTab === tab.id
                ? "text-primary-10"
                : "text-neutral-45 hover:text-neutral-10"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-10" />
            )}
          </button>
        ))}
      </div>

      {/* Rendering active tab content */}
      {tabs.find((tab) => tab.id === activeTab)?.component}
    </div>
  );
};

export default DetailTabs;
