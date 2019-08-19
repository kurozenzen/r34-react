import React, { useState, useEffect } from "react";
import { func } from "prop-types";
import Autosuggest from "react-autosuggest";
import api from "../../misc/api";
import "./TagSelector.css";
import prepare from "../../misc/prepare";

function TagSelector({ onSubmit }) {
  const [value, setValue] = useState("");
  const [modifier, setModifier] = useState("+");
  const [suggestions, setSuggestions] = useState([]);
  const [oldSuggestions, setOldSuggestions] = useState([]);

  useEffect(() => {
    if (suggestions && suggestions.length > 0)
      setOldSuggestions(suggestions.filter(() => true));
  }, [suggestions]);

  const onSubmitTag = event => {
    const tagObject = oldSuggestions.find(s => s.name === value) || {};

    onSubmit(
      prepare({
        name: value,
        count: tagObject.posts,
        types: tagObject.types,
        modifier: modifier
      })
    );

    setValue("");

    event.preventDefault();
  };
  const onValueChange = (event, { newValue }) => setValue(newValue);
  const onSuggestionsFetchRequested = ({ value }) => {
    api.getTags(normalize(value)).then(newSuggestions => {
      setSuggestions(newSuggestions);
    });
  };

  const inputProps = {
    placeholder: "Search for tags",
    value,
    onChange: onValueChange
  };

  return (
    <form onSubmit={onSubmitTag} className="d-flex input-group tag-selector">
      <div className="input-group-prepend left-append">
        <select
          className="form-control select-modifier"
          value={modifier}
          onChange={e => setModifier(e.target.value)}
        >
          <option>+</option>
          <option>-</option>
        </select>
      </div>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={() => setSuggestions([])}
        getSuggestionValue={suggestion => suggestion.name}
        renderSuggestion={({ name, posts }) => (
          <span>{`${name} (${posts})`}</span>
        )}
        inputProps={inputProps}
      />
      <div className="input-group-append right-append">
        <input type="submit" value="Add" className="btn btn-red btn-add-tag" />
      </div>
    </form>
  );
}

function normalize(tagname) {
  return tagname.toLowerCase().replace(" ", "_");
}

TagSelector.propTypes = {
  onSubmitTag: func
};

export default TagSelector;
