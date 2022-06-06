import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css, useTheme } from 'styled-components'
import { RouteName } from '../../data/types'
import { usePageTitle } from '../../hooks/usePageTitle'
import { DiscordIcon, GithubIcon, PrivacyIcon, TermsIcon } from '../../icons/FontAwesomeIcons'
import R34Icon from '../../icons/R34Icon'
import { buttonBaseStyle, multilineList } from '../../styled/mixins/layout'
import { LinkButton } from '../designsystem/Buttons'
import { DefaultPageColumn } from '../designsystem/DefaultPageColumn'
import { FlexColumn } from '../designsystem/FlexColumn'
import { HorizontalLine } from '../designsystem/Lines'
import { Faded, Title } from '../designsystem/Text'
import TitledSurface from '../designsystem/TitledSurface'
import Header from '../features/Header'
import { KofiButton, PatreonButton } from '../widgets/SponsoringButtons'

const AboutSurface = styled(TitledSurface)`
  grid-template-rows: auto auto auto auto 1fr;
  grid-template-columns: auto auto 1fr;
  padding: ${({ theme }) => theme.dimensions.hugeSpacing};
`

const ProfilePicture = styled.img`
  border-radius: 1000px;
  height: 100px;
  width: 100px;
  grid-area: 1/1/4/2;
`

const AppLogo = styled(R34Icon)`
  height: 100px;
  width: 100px;
  grid-area: 1/1/4/2;
`

const Name = styled(Title)`
  text-align: left;
  grid-area: 1/2/2/3;
`

const Username = styled(Faded)`
  text-align: left;
  align-self: center;
  grid-area: 1/3/2/4;
`

const ShortDesc = styled(Faded)`
  grid-area: 2/2/3/4;
`

const FlexRow = styled.div`
  grid-area: 3/2/4/4;
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
`

const Divider = styled(HorizontalLine)`
  grid-area: 4/1/5/4;
`

const Body = styled.div`
  grid-area: 5/1/6/4;
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    line-height: 20px;
  }
`
const AdditionalLinks = styled.div`
  ${multilineList}
  place-content: center;
`

const FadedLink = styled(Link)(
  ({ theme }) => css`
    ${buttonBaseStyle}
    color: ${theme.colors.subduedText};

    :visited {
      color: ${theme.colors.subduedText};
    }
  `
)

const ButtonList = styled(FlexRow)``

export default function About() {
  usePageTitle('Rule34 React - About')

  const iconColor = useTheme().colors.text

  return (
    <FlexColumn>
      <Header />
      <DefaultPageColumn>
        <AboutSurface title='The App' compact>
          <AppLogo size={100} />
          <Name>Rule34 React</Name>
          <ShortDesc>Here are some links</ShortDesc>
          <ButtonList>
            <LinkButton href='https://github.com/kurozenzen/r34-react' target='_newtab'>
              <GithubIcon color={iconColor} />
              Frontend
            </LinkButton>
            <LinkButton href='https://github.com/kurozenzen/r34-json-api'>
              <GithubIcon color={iconColor} />
              Backend
            </LinkButton>
            <LinkButton href='https://github.com/kurozenzen/r34-react/issues/new?template=bug_report.md'>
              <GithubIcon color={iconColor} />
              Bug Report
            </LinkButton>
            <LinkButton href='https://github.com/kurozenzen/r34-react/issues/new?template=feature_request.md'>
              <GithubIcon color={iconColor} />
              Feature Request
            </LinkButton>
          </ButtonList>
          <Divider />
          <Body>
            <p>A simple yet powerful search tool for rule34.xxx.</p>
            <p>
              The aim of this web application is to provide a more enjoyable experience while browsing rule34 on mobile
              devices. The sites main feature is an easy-to-use, tag-based search.
            </p>
          </Body>
        </AboutSurface>
        <AboutSurface title='Me' compact>
          <ProfilePicture
            src={`https://avatars.githubusercontent.com/u/44543171?s=400&u=fbda1f0794336c90624d2005d8fd24a5ecb1e5fd&v=4`}
          />
          <Name>Zen Kuro</Name>
          <Username>(kurozenzen)</Username>
          <ShortDesc>Here are some links</ShortDesc>
          <ButtonList>
            <LinkButton href='https://github.com/kurozenzen'>
              <GithubIcon color={iconColor} />
              GitHub
            </LinkButton>
            <LinkButton href='https://discord.gg/yyJFG5PVBZ'>
              <DiscordIcon color={iconColor} />
              Discord
            </LinkButton>
            <KofiButton id='V7V73PWW9' label='Ko-fi' />
            <PatreonButton name='kurozenzen' label='Patreon' />
          </ButtonList>
          <Divider />
          <Body>
            <p>Hi my name is Zen. I made this website. I hope you like it.</p>
            <p>
              Feel free to ping me on discord or write me an email if you wanna get in touch. I am usually quite
              friendly.
            </p>
            <p>That's all. Have a nice day.</p>
          </Body>
        </AboutSurface>
        <AdditionalLinks>
          <FadedLink to={RouteName.TERMS}>
            <TermsIcon /> Terms and Conditions
          </FadedLink>
          <FadedLink to={RouteName.PRIVACY}>
            <PrivacyIcon /> Privacy
          </FadedLink>
        </AdditionalLinks>
      </DefaultPageColumn>
    </FlexColumn>
  )
}
