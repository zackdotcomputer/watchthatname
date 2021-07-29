import { render } from "@redwoodjs/testing";

import DomainwatchLayout from "./DomainwatchLayout";

describe("DomainwatchLayout", () => {
  it("renders successfully", () => {
    expect(() => {
      render(
        <DomainwatchLayout>
          <p>Hello World!</p>
        </DomainwatchLayout>
      );
    }).not.toThrow();
  });
});
