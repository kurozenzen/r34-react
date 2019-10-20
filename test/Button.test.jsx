import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../src/components/common/Button.jsx";

describe("Button", () => {
  function renderButton({ type, children, onClick }) {
    return render(
      <Button type={type} onClick={onClick}>
        {children}
      </Button>
    );
  }

  it("renders correctly", () => {
    const button = renderButton({ children: "Some Text" });

    expect(button.container.firstChild.textContent).toBe("Some Text");
  });

  it("is clickable", () => {
    const spy = jasmine.createSpy("btnClickSpy");
    const button = renderButton({ children: "Some Text", onClick: spy });

    fireEvent.click(button.getByText("Some Text"));

    expect(spy).toHaveBeenCalledWith(jasmine.any(Object));
  });
});
