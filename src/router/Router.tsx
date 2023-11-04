import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import DetailsPage from '../pages/DetailsPage/DetailsPage';

const pages = {
  mainPage: {
    path: '/',
    element: <HomePage />,
  },
  detailedPage: {
    path: '',
    element: <DetailsPage />,
  },
};

export const Router = () => {
  return (
    <Routes>
      <Route path={pages.mainPage.path} element={pages.mainPage.element}>
        <Route
          path={pages.detailedPage.path}
          element={pages.detailedPage.element}
        />
      </Route>
    </Routes>
  );
};
