import React, { useState, useEffect } from "react";
import { arrayOf, bool, func, number, object, string } from "prop-types";
import "./Tag.css";
import api from "../../misc/api";

function Tag({
  name,
  count,
  modifier,
  types,
  activeTags,
  onClick,
  onAliasClick
}) {
  const [aliases, setAliases] = useState();
  const [collapsed, setCollapsed] = useState(true);

  if (onAliasClick)
    onAliasClick = onAliasClick.bind(undefined, {
      name,
      count,
      modifier,
      types
    });

  useEffect(() => {
    if (activeTags.some(t => t.name === name))
      api.getAliases(name).then(newAliases => {
        newAliases.sort((a, b) => Number(b.posts) - Number(a.posts));
        setAliases(
          newAliases.filter(
            alias => !activeTags.some(tag => tag.name === alias.name)
          )
        );
      });
  }, [name, activeTags]);

  const active = activeTags.some(t => t.name === name);
  const exclude = modifier === "-";
  const character = types.includes("character");
  const artist = types.includes("artist");
  const showAliases = aliases && onAliasClick && aliases.length > 0;

  return (
    <div
      className={
        "tag" +
        (active ? " active" : "") +
        (exclude ? " exclude" : "") +
        (character ? " character" : "") +
        (artist ? " artist" : "") +
        (!collapsed ? " dropped" : "")
      }
      onMouseLeave={() => setCollapsed(true)}
    >
      <TagText
        name={name}
        count={count}
        modifier={modifier}
        types={types}
        activeTags={activeTags}
        onClick={onClick}
      />
      {showAliases && (
        <>
          <i
            className="caret fas fa-caret-down"
            onClick={() => setCollapsed(!collapsed)}
          />
          <div className={"dropdown-list" + (!collapsed ? " visible" : "")}>
            {aliases.map(({ name, posts }) => (
              <Alias
                key={"t_" + name}
                name={name}
                count={posts}
                onClick={onAliasClick}
              />
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

Tag.defaultProps = {
  types: [],
  onClick: () => {}
};

function TagText({ name, count, types, modifier, onClick }) {
  return (
    <span onClick={() => onClick({ name, count, types, modifier })}>
      {count ? `${name} (${count})` : name}
    </span>
  );
}

function Alias({ name, count, onClick }) {
  return (
    <div className="alias">
      <TagText
        name={name}
        count={count}
        onClick={() => onClick({ name, count })}
      />
    </div>
  );
}

TagText.propTypes = {
  name: string.isRequired,
  count: number,
  modifier: string,
  types: arrayOf(string),
  activeTags: arrayOf(object),
  onClick: func
};

TagText.defaultProps = {
  modifier: "+",
  types: [],
  activeTags: [],
  onClick: () => {}
};

export default Tag;
