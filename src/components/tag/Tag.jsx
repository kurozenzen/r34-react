import React, { useState, useEffect } from "react";
import { arrayOf, bool, func, number, string } from "prop-types";
import "./Tag.css";
import api from "../../misc/api";

function Tag({ name, count, modifier, types, active, onClick }) {
  const [aliases, setAliases] = useState();
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    api.getAliases(name).then(newAliases => {
      newAliases.sort((a, b) => Number(b.posts) - Number(a.posts));
      setAliases(newAliases);
    });
  }, [name]);

  const onAction = () => onClick({ name, count, types, modifier });

  const exclude = modifier === "-";
  const character = types.includes("character");
  const artist = types.includes("artist");
  const showAliases = aliases && aliases.length > 0;

  return (
    <div
      className={
        "tag" +
        (active ? " active" : "") +
        (exclude ? " exclude" : "") +
        (character ? " character" : "") +
        (artist ? " artist" : "")
      }
    >
      <span onClick={onAction}>{count ? `${name} (${count})` : name}</span>
      {showAliases && (
        <>
          <i
            class="caret fas fa-caret-down"
            onClick={() => setCollapsed(!collapsed)}
          />
          <div className={"dropdown-list" + (!collapsed ? " visible" : "")}>
            {aliases.map(alias => (
              <div>
                {alias.posts ? `${alias.name} (${alias.posts})` : alias.name}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

Tag.propTypes = {
  name: string,
  count: number,
  modifier: string,
  types: arrayOf(string),
  active: bool,
  onClick: func
};

export default Tag;
