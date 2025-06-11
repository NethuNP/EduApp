type CategoryProps = {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

const Category: React.FC<CategoryProps> = ({ selectedCategory, onSelectCategory }) => {
  const categories = ["Certificate", "Diploma", "Degree"];

  return (
    <div className="flex justify-start items-start mb-6">
      <div className="flex rounded-full bg-[#e6f7f7] p-1 shadow-inner">
        {categories.map((label) => (
          <button
            key={label}
            onClick={() => onSelectCategory(label)}
            className={`px-4 py-2 text-xs md:text-sm lg:text-base rounded-full transition-all font-medium ${
              selectedCategory === label
                ? "bg-[#309898] text-white shadow cursor-pointer"
                : "text-[#309898] hover:bg-[#dff5f5] cursor-pointer"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
