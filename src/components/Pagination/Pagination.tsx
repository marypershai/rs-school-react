import './Pagination.css';
import { useSearchParams } from 'react-router-dom';

interface PaginationProps {
  page: number;
}

export function Pagination({ page }: PaginationProps) {
  const [, setSearchParams] = useSearchParams();

  const changePage = (page: number) => {
    setSearchParams((searchParams) => {
      searchParams.set('page', page.toString());
      return searchParams;
    });
  };

  return (
    <div className="pagination-buttons">
      <button
        className="button-left"
        onClick={() => {
          changePage(page - 1);
        }}
        disabled={page === 1}
      >
        &#5176;
      </button>
      <p>{page}</p>
      <button
        className="button-right"
        onClick={() => {
          changePage(page + 1);
        }}
      >
        &#5171;
      </button>
    </div>
  );
}
