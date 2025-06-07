import React from "react";

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="md:px-4 md:py-1 px-2 py-1 text-sm font-semibold text-[#309898] cursor-pointer rounded-xl bg-[#e0f2f1] disabled:opacity-50"
      >
        Previous
      </button>
      <span className="text-sm font-medium text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="md:px-4 md:py-1 px-2 py-1 text-sm font-semibold text-[#309898] cursor-pointer  rounded-xl bg-[#e0f2f1] disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
