import styled, { css, useTheme } from 'styled-components'

import { getVersionString } from '../../data/utils'
import useFirebaseAuthState from '../../hooks/useFirebaseAuthState'
import { CodeBranchIcon } from '../../icons/FontAwesomeIcons'
import { flexRowWithGap, gap } from '../../styled/mixins'
import FlexColumn, { FlexColumnWithSpacing } from '../designsystem/FlexColumn'
import { HorizontalLine } from '../designsystem/Lines'
import Surface from '../designsystem/Surface'
import { Faded, Title } from '../designsystem/Text'
import Header from '../features/Header'
import PrefAccount from '../preferences/PrefAccount'
import PrefAutoPlay from '../preferences/PrefAutoPlay'

import PrefHideSeenPosts from '../preferences/PrefHideSeenPosts'
import PrefLoadOriginals from '../preferences/PrefLoadOriginals'
import PrefMetadata from '../preferences/PrefMetadata'
import PrefPageSize from '../preferences/PrefPageSize'
import PrefPreloadVideos from '../preferences/PrefPreloadVideos'
import PrefResultsLayout from '../preferences/PrefResultsLayout'
import PrefShowComments from '../preferences/PrefShowComments'
import PrefSupertags from '../preferences/PrefSupertags'
import PrefTagSuggestions from '../preferences/PrefTagSuggestions'
import PrefTheme from '../preferences/PrefTheme'
import FeatureDetection from '../widgets/FeatureDetection'
import ResetButton from '../widgets/ResetButton'
import ResetResultsButton from '../widgets/ResetResultsButton'
import ResetSeenPostsButton from '../widgets/ResetSeenPostsButton'

const SettingsSurface = styled(Surface)(
  ({ theme }) => css`
    padding: ${theme.dimensions.hugeSpacing};
    ${gap(theme.dimensions.hugeSpacing)};
  `
)

const VersionWrapper = styled.div`
  ${flexRowWithGap}
  flex-grow: 1;
  justify-content: center;
  min-height: 50px;
`

const SettingsColumn = styled(FlexColumnWithSpacing)`
  flex-grow: 1;
`

export default function Settings() {
  document.title = 'R34 React - Settings'

  const theme = useTheme()
  const versionString = getVersionString()
  const [isSignedIn] = useFirebaseAuthState()

  return (
    <FlexColumn>
      <Header />
      <SettingsColumn>
        <Title>General</Title>
        <SettingsSurface>
          <PrefResultsLayout />
          <PrefPreloadVideos />
          <PrefLoadOriginals />
          <PrefTagSuggestions />
          <PrefPageSize />
          <PrefShowComments />
        </SettingsSurface>

        <Title>Account</Title>
        <SettingsSurface>
          <PrefAccount />
          <PrefTheme />
          {isSignedIn && (
            <>
              <PrefSupertags />
              <PrefHideSeenPosts />
            </>
          )}
        </SettingsSurface>

        <Title>Experimental</Title>
        <SettingsSurface>
          <Faded>
            These features that are still under active development. They might change a lot in the future. Please report
            any bugs you find so I can fix them :)
          </Faded>
          <HorizontalLine />
          <PrefAutoPlay />
        </SettingsSurface>

        <Title>Developer</Title>
        <SettingsSurface>
          <PrefMetadata />
          <FeatureDetection />
          <ResetResultsButton />
          <ResetSeenPostsButton />
          <ResetButton />
        </SettingsSurface>

        <VersionWrapper>
          <CodeBranchIcon color={theme.colors.subduedText} />
          <Faded>{versionString}</Faded>
        </VersionWrapper>
      </SettingsColumn>
    </FlexColumn>
  )
}
