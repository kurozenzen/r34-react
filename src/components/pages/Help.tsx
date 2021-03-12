import React from 'react'
import styled, { css } from 'styled-components'
import { Modifier, TagType } from '../../data/types'
import { defaultBorder, flexColumnWithGap } from '../../styled/mixins'
import FlexColumn, { FlexColumnWithSpacing } from '../common/FlexColumn'
import { HorizontalLine } from '../common/Lines'
import Surface from '../common/Surface'
import { Title } from '../common/Text'
import Footer from '../features/Footer'
import Header from '../features/Header'
import Options from '../features/Options'
import TagList from '../tag/TagList'
import TagSelector from '../tagSelector/TagSelector'

const StyledOl = styled.ol`
  ${flexColumnWithGap}
  padding-left: 1rem;
`

const Disclaimer = styled.div(
  ({ theme }) => css`
    ${defaultBorder({ theme })}
    background-color: ${theme.colors.accentColor}40;
    padding: ${theme.dimensions.gutter};
    p {
      line-height: 20px;
    }
  `
)

export default function Help() {
  document.title = 'R34 React - Help'

  return (
    <FlexColumn>
      <Header />
      <FlexColumnWithSpacing>
        <Title>Help</Title>
        <Disclaimer>
          <p>
            This is super outdated! But i don't have energy to rewrite it.. If you wanna know anything, just ask me.
            Either by creating a GitHub issue or contacting me directly (see About)
          </p>
        </Disclaimer>

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
            detailed
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
