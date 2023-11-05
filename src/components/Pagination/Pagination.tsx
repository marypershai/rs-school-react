import { SetURLSearchParams } from 'react-router-dom';

export function Pagination(props) {
  const { setSearchParams, page } = props;

  function changePage(page: number) {
    setSearchParams((searchParams) => {
      searchParams.set('page', page.toString());
      return searchParams;
    });
  }

  return (
    <div className="button-left">
      <button
        onClick={() => {
          changePage(page - 1);
        }}
        disabled={page === 1}
      >
        {'<'}
      </button>
      <p>{page}</p>
      <button
        onClick={() => {
          changePage(page + 1);
        }}
      >
        {'>'}
      </button>
    </div>
  );
}
