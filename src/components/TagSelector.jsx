import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import api from "../misc/api";
import './TagSelector.css'

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

function renderSuggestion(suggestion) {
    return ( 
        <span>{suggestion.name}</span>
    );
}

class TagSelector extends Component {
  constructor(props) {
    super();

    this.state = {
      value: '',
      modifier: '',
      suggestions: [],
      cachedSuggestions: [],
      onSubmit: (event) => {
        props.onSubmit({
          name: this.state.value, 
          modifier: this.state.modifier
        })

        this.setState({
          value: ""
        })
        event.preventDefault();
      }
    };    
  }

  onValueChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  onModifierChange = (event) => {
    this.setState({
      modifier: event.target.value
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    api.getTags(value.replace(this.state.modifier, ""))
      .then(result => {
        this.setState({
          suggestions: result
        });
      })
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      cachedSuggestions: this.state.suggestions,
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search for tags",
      value,
      onChange: this.onValueChange
    };

    return (
      <form onSubmit={this.state.onSubmit} className="d-flex input-group tag-selector">
        <div className="input-group-prepend left-append">
        <select className="form-control select-modifier" value={this.state.modifier} onChange={this.onModifierChange}>
          <option>+</option>
          <option>-</option>
        </select>
        </div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} />
        <div className="input-group-append right-append">
          <input type="submit" value="Add" className="btn btn-red btn-add-tag" />
        </div> 
      </form>
    );
  }
}


export default TagSelector