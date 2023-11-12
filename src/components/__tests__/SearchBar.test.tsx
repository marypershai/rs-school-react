import { BrowserRouter } from 'react-router-dom';

import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

import { SearchValueContext } from '../../contexts/SearchContext';
import { ResultsContext } from '../../contexts/ResultsContext';

import SearchBar from '../SearchBar/SearchBar';

class LocalStorageMock {
  store: { [key: string]: string };

  constructor() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = value;
  }
}

const localStorage = new LocalStorageMock();
global.localStorage = localStorage;

const mockSetSearchTerm = vi.fn();

it('should save the entered value to local storage when the Search button is clicked', () => {
  render(
    <BrowserRouter>
      <SearchValueContext.Provider
        value={{
          searchTerm: '',
        }}
      >
        <ResultsContext.Provider
          value={{
            items: [],
          }}
        >
          <SearchBar />
        </ResultsContext.Provider>
      </SearchValueContext.Provider>
    </BrowserRouter>
  );

  const inputElement = screen.getByRole('textbox');
  const button = screen.getByText('Search');

  fireEvent.change(inputElement, { target: { value: 'test value' } });

  fireEvent.click(button);

  expect(localStorage.getItem('inputValue')).toBe('test value');
});

it('should retrieves the value from local storage upon mounting', () => {
  render(
    <BrowserRouter>
      <SearchValueContext.Provider
        value={{
          searchTerm: '',
        }}
      >
        <ResultsContext.Provider
          value={{
            items: [],
          }}
        >
          <SearchBar />
        </ResultsContext.Provider>
      </SearchValueContext.Provider>
    </BrowserRouter>
  );

  const inputElement = screen.getByRole('textbox') as HTMLInputElement;

  waitFor(() => {
    expect(inputElement.value).toBe('test value');
    expect(mockSetSearchTerm).toHaveBeenCalledWith('test value');
  });
});
