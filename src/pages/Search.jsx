import React from "react";
import Config from "../components/features/Config";
import Results from "../components/features/Results";

export default function Search({ tags, options, results, dispatch }) {
  return (
    <main>
      <Config options={options} tags={tags} dispatch={dispatch} />
      {results.posts.length > 0 && (
        <Results
          options={options}
          dispatch={dispatch}
          tags={tags}
          results={results}
        />
      )}
    </main>
  );
}
