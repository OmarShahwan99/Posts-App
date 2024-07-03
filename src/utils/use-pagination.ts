import { useState } from "react";

const usePagination = (pagSize: number) => {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(pagSize);

  return {
    page,
    setPage,
    perPage,
    setPerPage,
  };
};

export default usePagination;
