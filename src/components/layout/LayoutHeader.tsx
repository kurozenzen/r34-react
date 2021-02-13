import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { formatCount } from "../../misc/formatting";
import useToggle from "../../misc/useToggle";
import { selectCount } from "../../redux/selectors";
import Title from "../common/Title";
import Config from "../features/Config";
import Header from "../features/Header";
import LayoutElementProps from "./LayoutElementProps";

export default function LayoutHeader({
  onLoad,
  virtualRef,
  style,
}: LayoutElementProps) {
  const [fullNumber, toggleFullNumber] = useToggle();
  const count = useSelector(selectCount);

  useEffect(() => {
    if (count > 0) onLoad();
  }, [count, onLoad]);

  return (
    <div onLoad={onLoad} ref={virtualRef} style={style}>
      <Header />
      <Config onLoad={onLoad} />
      {count > 0 && (
        <Title onClick={toggleFullNumber}>
          {(fullNumber ? count.toLocaleString() : formatCount(count)) +
            " results"}
        </Title>
      )}
    </div>
  );
}
