import { render } from "@redwoodjs/testing/web";

import UserStateNavBit from "./UserStateNavBit";

describe("UserStateNavBit", () => {
  it("renders successfully", () => {
    expect(() => {
      render(<UserStateNavBit />);
    }).not.toThrow();
  });
});
