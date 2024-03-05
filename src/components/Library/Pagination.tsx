import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { generateClasses, parseClasses } from "../../scripts/tools/utils";

interface Props {
  className?: string
  variant?: ('default')[]
  data: any[]
  setData: (data: any[], page?: number) => void
  btnCount?: number
  page?: number
  pageSize: number
}

export default function Pagination({ className = '', variant, data, setData, btnCount = 5, page = 1, pageSize }: Props) {
  const classes = generateClasses(`pagination ${className}`, variant, 'pagination');
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    handleChangePage(page);
  }, [data]);

  const paginateData = (data: any[], page: number, limit: number) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return data.slice(start, end);
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    setData(paginateData(data, page, pageSize), page);
  };

  const totalPages = Math.ceil(data.length / pageSize);
  const startPage = Math.max(currentPage - Math.floor(btnCount / 2), 1);
  const endPage = Math.min(startPage + btnCount - 1, totalPages);


  return (
    <div {...parseClasses(classes)}>
      <Button
        onClick={() => handleChangePage(currentPage === 1 ? totalPages : currentPage - 1)}
        variant={[]}
      >
        Previous
      </Button>
      {startPage > 1 && (
        <>
          <Button
            onClick={() => handleChangePage(1)}
            variant={['circle']}
            className={currentPage === 1 ? 'pagination--selected' : ''}
          >
            1
          </Button>
          <p>...</p>
        </>
      )}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(pageNum => (
        <Button
          key={pageNum}
          onClick={() => handleChangePage(pageNum)}
          variant={['circle']}
          className={currentPage === pageNum ? 'pagination--selected' : ''}
        >
          {pageNum}
        </Button>
      ))}
      {endPage < totalPages && (
        <>
          <p>...</p>
          <Button
            onClick={() => handleChangePage(totalPages)}
            variant={['circle']}
            className={currentPage === totalPages ? 'pagination--selected' : ''}
          >
            {totalPages}
          </Button>
        </>
      )}
      <Button
        onClick={() => handleChangePage(currentPage === totalPages ? 1 : currentPage + 1)}
        variant={[]}
      >
        Next
      </Button>
    </div>
  );
}
