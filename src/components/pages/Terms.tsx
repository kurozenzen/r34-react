import styled, { css } from 'styled-components'
import { gap } from '../../styled/mixins'
import FlexColumn, { FlexColumnWithSpacing } from '../designsystem/FlexColumn'
import Surface from '../designsystem/Surface'
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

export default function Terms() {
  document.title = 'R34 React - Terms of Service'

  return (
    <FlexColumn>
      <Header />
      <Section>
        <Title>Terms of Service</Title>
        <SectionBody>
          <p>
            This website does not impose any additional terms on you. However, terms for the technologies this app uses
            still apply. Therefore, you should read the following terms.
          </p>
          <a href='https://policies.google.com/terms'>Google - Privacy & Terms</a>
          <a href='https://rule34.xxx/tos.php'>Rule34 - Terms of Serivce</a>
          <Faded>If you have any questions feel free to contact me via Discord. See "about" section.</Faded>
        </SectionBody>
      </Section>
    </FlexColumn>
  )
}
