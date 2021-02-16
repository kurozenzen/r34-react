import React from "react";
import LayoutElementProps from "./LayoutElementProps";
import LoadingIcon from "../../icons/Loading";

export default function LayoutLoadingItem({
  onLoad,
  virtualRef,
  style,
}: LayoutElementProps) {
  return (
    <div onLoad={onLoad} ref={virtualRef} style={style}>
      <LoadingIcon />
    </div>
  );
}
