import { render } from "@redwoodjs/testing";

import FavoritesPage from "./FavoritesPage";

describe("FavoritesPage", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<FavoritesPage />);
    }).not.toThrow();
  });
});
