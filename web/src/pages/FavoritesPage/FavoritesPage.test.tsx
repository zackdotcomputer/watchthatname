import { render } from "@redwoodjs/testing/web";

import FavoritesPage from "./FavoritesPage";

describe("FavoritesPage", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<FavoritesPage />);
    }).not.toThrow();
  });
});
