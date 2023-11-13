import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import '@testing-library/jest-dom';

import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

it('should display the Loading Spinner', () => {
  render(<LoadingSpinner />);
  const loadingSpinnerContainer = screen.getByTestId('loading-spinner');
  expect(loadingSpinnerContainer).toBeInTheDocument();
});
