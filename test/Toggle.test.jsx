import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Toggle from "../src/components/common/Toggle.jsx";

describe("Toggle", () => {
  function renderToggle({ initial, children, onChange = () => {} }) {
    const component = render(
      <Toggle initial={initial} onChange={onChange}>
        {children}
      </Toggle>
    );

    return {
      component,
      label: component.container.firstChild,
      toggle: component.container.firstChild.firstChild,
      isEnabled: () =>
        component.container.querySelector(".react-toggle--checked") !== null
    };
  }

  it("renders correctly", () => {
    const toggle = renderToggle({ children: "Some Text" });

    expect(toggle.label.textContent).toBe("Some Text");
    expect(toggle.isEnabled()).toBe(false);
  });

  it("respects initial", () => {
    const toggle = renderToggle({ initial: true, children: "Some Text" });

    expect(toggle.isEnabled()).toBe(true);
  });

  it("is clickable", () => {
    const spy = jasmine.createSpy("toggleClickSpy");
    const toggle = renderToggle({ children: "Some Text", onChange: spy });

    fireEvent.click(toggle.label);

    expect(spy).toHaveBeenCalledWith(jasmine.any(Object));
  });
});
