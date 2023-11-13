import { Router } from '../../router/Router';
import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import '@testing-library/jest-dom';

it('should display the 404 page with an appropriate message indicating that the requested page was not found', () => {
  render(
    <MemoryRouter initialEntries={['/not-existing-route']}>
      <Router />
    </MemoryRouter>
  );

  const notFoundElement = screen.getByText('Page is not found');

  expect(notFoundElement).toBeInTheDocument();
});
