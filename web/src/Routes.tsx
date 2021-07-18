// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'
import WishdomainsLayout from 'src/layouts/WishdomainsLayout';
import DomainwatchLayout from "./layouts/DomainwatchLayout/DomainwatchLayout";

const Routes = () => {
  return (
    <Router>
      <Set wrap={WishdomainsLayout}>
        <Route path="/wishdomains/new" page={WishdomainNewWishdomainPage} name="newWishdomain" />
        <Route path="/wishdomains/{id}/edit" page={WishdomainEditWishdomainPage} name="editWishdomain" />
        <Route path="/wishdomains/{id}" page={WishdomainWishdomainPage} name="wishdomain" />
        <Route path="/wishdomains" page={WishdomainWishdomainsPage} name="wishdomains" />
      </Set>
      <Set wrap={DomainwatchLayout}>
        <Route path="/about" page={AboutPage} name="about" />
      </Set>
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  );
};

export default Routes;
