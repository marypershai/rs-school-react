import './Pagination.css';

export function Pagination(props) {
  const { setSearchParams, page } = props;

  function changePage(page: number) {
    setSearchParams((searchParams) => {
      searchParams.set('page', page.toString());
      return searchParams;
    });
  }

  return (
    <div className="pagination-buttons">
      <button
        className="button-left"
        onClick={() => {
          changePage(page - 1);
        }}
        disabled={page === 1}
      >
        {'<'}
      </button>
      <p>{page}</p>
      <button
        className="button-right"
        onClick={() => {
          changePage(page + 1);
        }}
      >
        {'>'}
      </button>
    </div>
  );
}
