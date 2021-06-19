import React from 'react'
import styled, { css } from 'styled-components'
import { gap } from '../../styled/mixins'
import FlexColumn, { FlexColumnWithSpacing } from '../common/FlexColumn'
import Surface from '../common/Surface'
import { Faded, Title } from '../common/Text'
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
  return (
    <FlexColumn>
      <Header />
      <Section>
        <Title>Information I collect</Title>
        <SectionBody>
          <p>I am using Google Analytics to track usage data. </p>
          <p>
            This includes the number of active users on this site as well as their country of origin and operating
            system. This is mainly so I can see the numbers going up though.
          </p>
          <p>
            You can find out more about Google Analytics{' '}
            <a href='https://en.wikipedia.org/wiki/Google_Analytics'>here</a>.
          </p>
          <Faded>TL;DR: I collect Log and Usage Data, Device Data, Location Data</Faded>
        </SectionBody>
      </Section>
      <Section>
        <Title>Information privacy</Title>
        <SectionBody>
          <p>I do not share the collected data with anyone. And I don't plan to change that.</p>
          <p>
            The only thing I might is mention the number of users like: "Hey guys, last month 100 people used my app!
            Time to celebrate!"
          </p>
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
            If you choose to login with your Google Account, your settings will be stored in your Google Drive so you
            can share them across devices.
          </p>
        </SectionBody>
      </Section>
      <Section>
        <Title>Contact and Complaints</Title>
        <SectionBody>
          <p>
            If you have questions or comments about your privacy rights, contact me via the "about" section. Preferably
            via Discord.
          </p>
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
