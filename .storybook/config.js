import { configure } from "@storybook/react";
import "../src/App.css";
import "../src/index.css";

const req = require.context("../src", true, /\.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
