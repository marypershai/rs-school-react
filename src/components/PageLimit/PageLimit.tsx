import React, { Component, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function PageLimit(props) {
  const [limit, setLimit] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams();

  const productId = searchParams.get('productId');

  useEffect(() => {
    setSearchParams((searchParams) => {
      searchParams.set('pageLimit', limit + '');
      return searchParams;
    });
  }, [limit]);

  return (
    <div>
      <select
        name="selectedLimit"
        defaultValue={limit}
        onChange={(event) => {
          if (productId) {
            setSearchParams((searchParams) => {
              searchParams.delete('productId');
              return searchParams;
            });
          }
          setLimit(+event.target.value);
          // props.updatePageLimitResults(limit);
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </div>
  );
}
