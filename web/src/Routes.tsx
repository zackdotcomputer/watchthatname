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
import DomainwatchLayout from "./layouts/DomainwatchLayout/DomainwatchLayout";

const Routes = () => {
  return (
    <Router>
      <Set wrap={DomainwatchLayout}>
        <Private unauthenticated="/">
          <Route path="/favorites" page={FavoritesPage} name="favorites" />
        </Private>
        <Route path="/domain/{domain}" page={DomainDetailsPage} name="domainDetails" />
        <Route path="/search" page={SearchPage} name="search" />
        <Route path="/search/{query}" page={SearchPage} name="searchQuery" />
        <Route path="/about" page={AboutPage} name="about" />
      </Set>
      <Set wrap={DomainwatchLayout} hideBranding>
        <Route path="/" page={HomePage} name="home" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  );
};

export default Routes;
