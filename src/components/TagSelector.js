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
      suggestions: [],
      onSubmit: (event) => {
        props.onSubmit(this.state.value)
        event.preventDefault();
      }
    };    
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    api.getTags(value)
      .then(result => {
        this.setState({
          suggestions:result
        });
      })
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search for tags",
      value,
      onChange: this.onChange
    };

    return (
      <form onSubmit={this.state.onSubmit} className="tag-selector input-group">
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} />
        <div className="input-group-append">
          <input type="submit" value="Add" className="btn btn-red" />
        </div> 
      </form>
    );
  }
}


export default TagSelector