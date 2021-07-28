// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set, Private } from "@redwoodjs/router";
import React from "react";
import WishdomainsLayout from "src/layouts/WishdomainsLayout";
import DomainwatchLayout from "./layouts/DomainwatchLayout/DomainwatchLayout";

const Routes = () => {
  return (
    <Router>
      <Private role="admin" unauthenticated="home">
        <Set wrap={WishdomainsLayout}>
          <Route path="/wishdomains/new" page={WishdomainNewWishdomainPage} name="newWishdomain" />
          <Route path="/wishdomains/{id}/edit" page={WishdomainEditWishdomainPage} name="editWishdomain" />
          <Route path="/wishdomains/{id}" page={WishdomainWishdomainPage} name="wishdomain" />
          <Route path="/wishdomains" page={WishdomainWishdomainsPage} name="wishdomains" />
        </Set>
      </Private>
      <Set wrap={DomainwatchLayout}>
        <Route path="/favorites" page={FavoritesPage} name="favorites" />
        <Route path="/search" page={SearchPage} name="search" />
        <Route path="/about" page={AboutPage} name="about" />
        <Route notfound page={NotFoundPage} />
      </Set>
      <Set wrap={DomainwatchLayout} hideBranding>
        <Route path="/" page={HomePage} name="home" />
      </Set>
    </Router>
  );
};

export default Routes;
