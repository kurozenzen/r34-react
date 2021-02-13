import React from "react";
import Footer from "../features/Footer";
import LayoutElementProps from "./LayoutElementProps";

export default function LayoutFooter({
  onLoad,
  virtualRef,
  style,
}: LayoutElementProps) {
  return (
    <div onLoad={onLoad} ref={virtualRef} style={style}>
      <Footer />
    </div>
  );
}
