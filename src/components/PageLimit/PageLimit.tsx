import React, { Component, useContext, useEffect, useState } from 'react';

export default function PageLimit() {
  const [limit, setLimit] = useState(10);

  return (
    <div>
      <select
        name="selectedLimit"
        defaultValue={limit}
        onChange={(event) => setLimit(+event.target.value)}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="50">50</option>
      </select>
    </div>
  );
}
