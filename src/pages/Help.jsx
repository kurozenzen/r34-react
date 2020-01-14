import React from "react";
import Title from "../components/common/Title";
import Surface, { Line } from "../components/common/Surface";
import TagSelector from "../components/tagSelector/TagSelector";
import Options from "../components/features/Options";
import TagList from "../components/tag/TagList";

function Help() {
  return (
    <>
      <Title>Help</Title>
      <Surface>
        <Title type="small">Searching for Tags</Title>
        <Line />
        <TagSelector dispatch={() => {}} />
        <Line />
        <p>
          You can use the Tag Selector to look for tags you like.The Tag
          Selector has 4 parts.
        </p>
        <ol>
          <li>
            The modifier (left) determines wether posts must match a tag or not.
            Putting "-" will hide all posts with this tag
          </li>
          <li>
            The Search Box (center) allows you to search for tags. As soon as
            you start typing the Tag Selector will show you relevant tags to
            choose from (4).
          </li>
          <li>
            The Add Button (right) Allows you to add any tag to the current
            filter. Usefull when using wildcards.
          </li>
          <li>
            The Tag Dropdown (left) automatically shows tags that start with
            your input. It also includes The number of posts tagged, to allow
            you to weigh tags against each other.
          </li>
        </ol>
      </Surface>
      <Surface>
        <Title type="small">Options</Title>
        <Line />
        <Options options={{}} dispatch={() => {}} />
        <Line />
        <p>
          Options allow you to customize your experience in various ways. There
          are 3 options available
        </p>
        <ol>
          <li>
            Infinite Scrolling automatically loads new posts when you get close
            to the bottom of the page.
          </li>
          <li>
            Only show Rated posts filters out posts below the specified amount
            of posts.
          </li>
          <li>
            Load original sizes always loads the highest quality of an image.
            This can easily cause extreme data consumption. Don't use with
            mobile data.
          </li>
        </ol>
      </Surface>
      <Surface>
        <Title type="small">Tags</Title>
        <Line />
        <TagList
          tags={[
            { name: "Tag 1" },
            { name: "Tag 2", types: ["character"] },
            {
              name: "Tag 3",
              modifier: "-",
              types: ["copyright"],
              count: 1020
            }
          ]}
          activeTags={[{ name: "Tag 2" }, { name: "Tag 3" }]}
        />
        <Line />
        <p>
          This whole application is based on tags. Every Post has multiple tags.
          Usually you can enable/disable a tag just by tapping it. If a tag is
          red it means its active. The icons next to the name show what type of
          tag it is. Not every tag has a type. The number on the right shows how
          many posts there are with that tag.
        </p>
      </Surface>
    </>
  );
}

export default Help;
