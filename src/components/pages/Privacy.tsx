import React from 'react'
import styled, { css } from 'styled-components'
import { DiscordIcon } from '../../icons/FontAwesomeIcons'
import { gap } from '../../styled/mixins/gap'
import { LinkButton } from '../designsystem/Buttons'
import { FlexColumn, FlexColumnWithSpacing } from '../designsystem/FlexColumn'
import { Surface } from '../designsystem/Surface'
import { Faded, Title } from '../designsystem/Text'
import Header from '../features/Header'

const SectionBody = styled(Surface)(
  ({ theme }) => css`
    padding: ${theme.dimensions.hugeSpacing};
    ${gap(theme.dimensions.hugeSpacing)};
  `
)

const Section = styled(FlexColumnWithSpacing)`
  flex-grow: 1;
`

export default function Privacy() {
  document.title = 'R34 React - Privacy Policy'

  return (
    <FlexColumn>
      <Header />
      <Section>
        <Title>Privacy</Title>
        <SectionBody>
          <p>This page informs you of any information I collect about you and any data that I store.</p>
          <p>
            The short version is: I only ever collect and store data to ensure the app runs smoothly and to provide
            functionality in the app. Never for anything else.
          </p>
        </SectionBody>
      </Section>
      <Section>
        <Title>Information I collect</Title>
        <SectionBody>
          <p>I am using Google Analytics to track usage data.</p>
          <p>
            This includes the number of active users on this site as well as their country of origin and operating
            system. This is mainly so I have a way to measure how many users use my app.
          </p>
          <p>
            You can find out more about Google Analytics{' '}
            <a href='https://en.wikipedia.org/wiki/Google_Analytics'>here</a>.
          </p>
          <Faded>TL;DR: I collect Log and Usage Data, Device Data, Location Data</Faded>
          <p>Addidtionally, I use Sentry to gather information about crashes in the app. </p>
          <p>
            This means when you experience a crash of any kind, some Log data is stored which helps me identify and fix
            the bug.
          </p>
          <p>
            You can find out more about Sentry <a href='https://www.sentry.io'>here</a>.
          </p>
        </SectionBody>
      </Section>
      <Section>
        <Title>Information privacy</Title>
        <SectionBody>
          <p>I do not share the collected data with anyone and I don't plan to change that.</p>
          <p>The only exception is the number of overall users. I might is mention this number like:</p>
          <Faded>"Hey guys, last month 100 people used my app! Time to celebrate!"</Faded>
        </SectionBody>
      </Section>
      <Section>
        <Title>Cookies and Browser Storage</Title>
        <SectionBody>
          <p>Cookies are used to enable Google Analytics.</p>
          <p>I store application data (mainly settings) locally in your browser.</p>
        </SectionBody>
      </Section>
      <Section>
        <Title>Google Account</Title>
        <SectionBody>
          <p>
            If you choose to sign in with your Google Account, your settings will be stored anonymously on a server so
            they are available on all your devices.
          </p>
        </SectionBody>
      </Section>
      <Section>
        <Title>Contact and Complaints</Title>
        <SectionBody>
          <p>If you have questions or comments about your privacy rights, feel free to contact me.</p>
          <LinkButton href=' https://discord.gg/yyJFG5PVBZ'>
            <DiscordIcon />
            Discord
          </LinkButton>
          <p>
            If you are a resident in the EEA or UK and you believe I am unlawfully processing your personal information,
            you also have the right to complain to your local data protection supervisory authority. You can find their
            contact details{' '}
            <a href='http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm'>here</a>.
          </p>
          <p>
            If you are a resident in Switzerland, the contact details for the data protection authorities are available
            here <a href='https://www.edoeb.admin.ch/edoeb/en/home.html'>here</a>.
          </p>{' '}
        </SectionBody>
      </Section>
    </FlexColumn>
  )
}
