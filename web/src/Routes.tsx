// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from "@redwoodjs/router";
import DomainwatchLayout from "./layouts/DomainwatchLayout/DomainwatchLayout";

const Routes = () => {
  return (
    <Router>
      <Set wrap={DomainwatchLayout}>
        <Route path="/about" page={AboutPage} name="about" />
      </Set>
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  );
};

export default Routes;
