import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

import { Pagination } from '../Pagination/Pagination';

let page: number;
const perPage = '10';
let mockSearchParams: string;

beforeEach(() => {
  page = 2;

  mockSearchParams = `page=${page}&perPage=${perPage}`;

  vi.mock('react-router-dom', async () => {
    const actual: object = await vi.importActual('react-router-dom');
    return {
      ...actual,
      useSearchParams: () => {
        const [params, setParams] = useState(
          new URLSearchParams(mockSearchParams)
        );

        return [
          params,
          (fn: (searchParams: URLSearchParams) => URLSearchParams) => {
            const newSearchParams = fn(params);
            setParams(newSearchParams);
            mockSearchParams = newSearchParams.toString();
          },
        ];
      },
    };
  });
});

describe('Updating URL Query Parameter on Page Change', () => {
  it('should be URL updated to reflect the change in the page when the "next page" button is clicked', () => {
    render(
      <BrowserRouter>
        <Pagination page={page} perPage={perPage} />
      </BrowserRouter>
    );

    const nextButton = screen.getByText('ᐳ');

    expect(mockSearchParams).toContain(`page=${page}`);

    fireEvent.click(nextButton);

    expect(mockSearchParams).toContain(`page=${page + 1}`);
  });

  it('should be URL updated to reflect the change in the page when the "previous page" button is clicked', () => {
    render(
      <BrowserRouter>
        <Pagination page={page} perPage={perPage} />
      </BrowserRouter>
    );

    const prevButton = screen.getByText('ᐸ');

    expect(mockSearchParams).toContain(`page=${page}`);

    fireEvent.click(prevButton);

    expect(mockSearchParams).toContain(`page=${page - 1}`);
  });
});
