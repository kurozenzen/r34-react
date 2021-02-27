import React from 'react'
import { Title } from '../common/Text'
import Surface from '../common/Surface'
import TagSelector from '../tagSelector/TagSelector'
import Options from '../features/Options'
import TagList from '../tag/TagList'
import Header from '../features/Header'
import Footer from '../features/Footer'
import FlexColumn, { FlexColumnWithSpacing } from '../common/FlexColumn'
import styled, { css } from 'styled-components'
import { HorizontalLine } from '../common/Lines'
import { Modifier, TagType } from '../../data/types'

const FlexRow = styled.div(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.dimensions.bigSpacing};
    justify-content: center;
    padding: ${theme.dimensions.gutter};
  `
)

const StyledOl = styled.ol(
  ({ theme }) => css`
    padding-left: 1rem;
    display: flex;
    flex-direction: column;
    gap: ${theme.dimensions.gutter};
  `
)

export default function Help() {
  return (
    <FlexColumn>
      <Header />
      <FlexColumnWithSpacing>
        <Title>Help</Title>
        <FlexRow>
          <a href='https://github.com/kurozenzen/r34-react/issues/new?template=bug_report.md'>Report a bug</a>
          or
          <a href='https://github.com/kurozenzen/r34-react/issues/new?template=feature_request.md'>Request a feature</a>
        </FlexRow>
        <Surface>
          <Title>Searching for Tags</Title>
          <HorizontalLine />
          <TagSelector />
          <HorizontalLine />
          <p>You can use the Tag Selector to look for tags you like.The Tag Selector has 4 parts.</p>
          <StyledOl>
            <li>
              The modifier (left) determines wether posts must match a tag or not. Putting "-" will hide all posts with
              this tag
            </li>
            <li>
              The Search Box (center) allows you to search for tags. As soon as you start typing the Tag Selector will
              show you relevant tags to choose from (4).
            </li>
            <li>
              The Add Button (right) Allows you to add any tag to the current filter. Usefull when using wildcards.
            </li>
            <li>
              The Tag Dropdown (left) automatically shows tags that start with your input. It also includes The number
              of posts tagged, to allow you to weigh tags against each other.
            </li>
          </StyledOl>
        </Surface>
        <Surface>
          <Title>Options</Title>
          <HorizontalLine />
          <Options />
          <HorizontalLine />
          <p>Options allow you to customize your experience in various ways. There are 3 options available</p>
          <StyledOl>
            <li>Infinite Scrolling automatically loads new posts when you get close to the bottom of the page.</li>
            <li>Only show Rated posts filters out posts below the specified amount of posts.</li>
            <li>
              Load original sizes always loads the highest quality of an image. This can easily cause extreme data
              consumption. Don't use with mobile data.
            </li>
          </StyledOl>
        </Surface>
        <Surface>
          <Title>Tags</Title>
          <HorizontalLine />
          <TagList
            tags={{
              'Tag 1': { name: 'Tag 1' },
              'Tag 2': { name: 'Tag 2', types: [TagType.CHARACTER] },
              'Tag 3': {
                name: 'Tag 3',
                modifier: Modifier.MINUS,
                types: [TagType.COPYRIGHT],
                count: 1020,
              },
            }}
          />
          <HorizontalLine />
          <p>
            This whole application is based on tags. Every Post has multiple tags. Usually you can enable/disable a tag
            just by tapping it. If a tag is red it means its active. The icons next to the name show what type of tag it
            is. Not every tag has a type. The number on the right shows how many posts there are with that tag.
          </p>
        </Surface>
      </FlexColumnWithSpacing>

      <Footer />
    </FlexColumn>
  )
}
