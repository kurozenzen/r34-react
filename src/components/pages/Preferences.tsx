import styled, { useTheme } from 'styled-components'
import { getVersionString } from '../../data/utils'
import useFirebaseAuthState from '../../hooks/useFirebaseAuthState'
import { usePageTitle } from '../../hooks/usePageTitle'
import { CodeBranchIcon } from '../../icons/FontAwesomeIcons'
import { flexRowWithGap } from '../../styled/mixins/layout'
import { FlexColumn, FlexColumnWithSpacing } from '../designsystem/FlexColumn'
import { HorizontalLine } from '../designsystem/Lines'
import { Faded } from '../designsystem/Text'
import TitledSurface from '../designsystem/TitledSurface'
import Header from '../features/Header'
import PrefAccount from '../preferences/PrefAccount'
import PrefAutoPlay from '../preferences/PrefAutoPlay'
import PrefAutoscrollDelay from '../preferences/PrefAutoscrollDelay'
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

const VersionWrapper = styled.div`
  ${flexRowWithGap}
  flex-grow: 1;
  justify-content: center;
  min-height: 50px;
`

const PreferencesColumn = styled(FlexColumnWithSpacing)`
  flex-grow: 1;
`

export default function Preferences() {
  const theme = useTheme()
  const versionString = getVersionString()
  const [isSignedIn] = useFirebaseAuthState()

  usePageTitle('Rule34 React - Preferences')

  return (
    <FlexColumn>
      <Header />
      <PreferencesColumn>
        <TitledSurface title='General'>
          <PrefResultsLayout />
          <PrefPreloadVideos />
          <PrefLoadOriginals />
          <PrefTagSuggestions />
          <PrefPageSize />
          <PrefShowComments />
        </TitledSurface>

        <TitledSurface title='Account'>
          <PrefAccount />
          <PrefTheme />
          {isSignedIn && (
            <>
              <PrefSupertags />
              <PrefHideSeenPosts />
            </>
          )}
        </TitledSurface>

        <TitledSurface title='Experimental'>
          <Faded>
            These features that are still under active development. They might change a lot in the future. Please report
            any bugs you find so I can fix them :)
          </Faded>
          <HorizontalLine />
          <PrefAutoPlay />
          <PrefAutoscrollDelay />
        </TitledSurface>
        <TitledSurface title='Developer'>
          <PrefMetadata />
          <FeatureDetection />
          <ResetResultsButton />
          <ResetSeenPostsButton />
          <ResetButton />
        </TitledSurface>

        <VersionWrapper>
          <CodeBranchIcon color={theme.colors.subduedText} />
          <Faded>{versionString}</Faded>
        </VersionWrapper>
      </PreferencesColumn>
    </FlexColumn>
  )
}
