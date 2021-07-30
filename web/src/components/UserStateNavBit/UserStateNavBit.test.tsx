import { render } from "@redwoodjs/testing";

import UserStateNavBit from "./UserStateNavBit";

describe("UserStateNavBit", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<UserStateNavBit />);
    }).not.toThrow();
  });
});
