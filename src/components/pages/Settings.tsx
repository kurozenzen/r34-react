import React, { useCallback } from 'react'
import styled, { css, useTheme } from 'styled-components'
import { supportsAspectRatio, supportsFlexGap, supportsGap, supportsObjectFit } from '../../data/browserUtils'
import { ResultLayout, PreferenceKey } from '../../data/types'
import { getVersionString } from '../../data/utils'
import usePreference from '../../hooks/usePreference'
import { CodeBranchIcon } from '../../icons/FontAwesomeIcons'
import { flexColumnWithGap, flexRowWithGap, gap } from '../../styled/mixins'
import FlexColumn, { FlexColumnWithSpacing } from '../common/FlexColumn'
import { HorizontalLine } from '../common/Lines'
import Select from '../common/Select'
import Setting from '../common/Setting'
import { SmallNumberInput } from '../common/SmallInput'
import Surface from '../common/Surface'
import { Faded, SmallTitle, Title } from '../common/Text'
import Toggle from '../common/Toggle'
import Header from '../features/Header'
import ResetButton from '../widgets/ResetButton'

const layouts = {
  [ResultLayout.INFINITE_COLUMN]: 'Infinite',
  [ResultLayout.PAGES]: 'Pages',
}

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

const Entry = styled.div`
  ${flexColumnWithGap}
`

const StyledCode = styled.div(
  ({ theme }) => css`
    background: #00000040;
    ${gap(theme.dimensions.gutter)}
    padding: ${theme.dimensions.gutter};
    border-radius: ${theme.dimensions.borderRadius};

    p,
    span {
      font-family: 'Courier New', Courier, monospace;
    }
  `
)

const Yes = styled.span`
  color: limegreen;
`

const No = styled.span`
  color: red;
`

function yesOrNo(value: boolean) {
  return value ? <Yes>Yes</Yes> : <No>No</No>
}

export default function Settings() {
  const theme = useTheme()

  const [resultsLayout, setResultsLayout] = usePreference(PreferenceKey.RESULTS_LAYOUT)
  const [pageSize, setPageSize] = usePreference(PreferenceKey.PAGE_SIZE)
  const [originals, setOriginals] = usePreference(PreferenceKey.ORIGINALS)
  const [preloadVideos, setPreloadVideos] = usePreference(PreferenceKey.PRELOAD_VIDEOS)
  const [tagSuggestionsCount, setTagSuggestionsCount] = usePreference(PreferenceKey.TAG_SUGGESTIONS_COUNT)
  const [useCorsProxy, setUseCorsProxy] = usePreference(PreferenceKey.USE_CORS_PROXY)
  const [showMetadata, setShowMetadata] = usePreference(PreferenceKey.SHOW_METADATA)
  const [showComments, setShowComments] = usePreference(PreferenceKey.SHOW_COMMENTS)

  const togglePreloadVideos = useCallback(() => setPreloadVideos(!preloadVideos), [preloadVideos, setPreloadVideos])
  const toggleOriginals = useCallback(() => setOriginals(!originals), [originals, setOriginals])
  const toggleUseCorsProxy = useCallback(() => setUseCorsProxy(!useCorsProxy), [useCorsProxy, setUseCorsProxy])
  const toggleShowMetadata = useCallback(() => setShowMetadata(!showMetadata), [showMetadata, setShowMetadata])
  const toggleShowComments = useCallback(() => setShowComments(!showComments), [showComments, setShowComments])

  const onChangeResultsLayout = useCallback((event) => setResultsLayout(event.target.value), [setResultsLayout])

  const versionString = getVersionString()

  document.title = 'R34 React - Settings'

  return (
    <FlexColumn>
      <Header />
      <SettingsColumn>
        <Title>General</Title>
        <SettingsSurface>
          <Setting title='Results Layout' description='Choose how your results are displayed.'>
            <Select options={layouts} value={resultsLayout} onChange={onChangeResultsLayout} />
          </Setting>

          <Setting
            title='Preload Videos'
            description='Start loading videos immediately instead of just-in-time. This can improve the viewing experience but will consume a LOT of data. Only use with WIFI.'
          >
            <Toggle value={preloadVideos} onToggle={togglePreloadVideos} />
          </Setting>

          <Setting
            title='Load original sizes'
            description='Display images and videos at their original resolution. This will consume more data but provides a nicer experience.'
          >
            <Toggle value={originals} onToggle={toggleOriginals} />
          </Setting>

          <Setting
            title='Use CORS Proxy'
            description='Request images via the built in cors proxy. Normally, this should just make loading times worse. But I have seen the opposite.'
          >
            <Toggle value={useCorsProxy} onToggle={toggleUseCorsProxy} />
          </Setting>

          <Setting
            title='Number of Tag suggestions'
            description='Controls the number of tags displayed when searching. Increase this when searching for niche tags.'
          >
            <SmallNumberInput value={tagSuggestionsCount} onSubmit={setTagSuggestionsCount} />
          </Setting>

          <Setting title='Page size' description='Controls the number of posts loaded at once.'>
            <SmallNumberInput value={pageSize} onSubmit={setPageSize} />
          </Setting>
        </SettingsSurface>

        <Title>Experimental</Title>
        <SettingsSurface>
          <Faded>
            These features that are still under active development. They might change a lot in the future. Please report
            any bugs you find so I can fix them :)
          </Faded>
          <HorizontalLine />
          <Setting
            title='Show post metadata'
            description="Posts display more data in their details. Mainly for developing purposes but maybe it's useful to someone."
          >
            <Toggle value={showMetadata} onToggle={toggleShowMetadata} />
          </Setting>

          <Setting
            title='Show comments'
            description="If there are comments on a post, they will appear in the details. They can be a bit weird though, that's why they are disabled by default."
          >
            <Toggle value={showComments} onToggle={toggleShowComments} />
          </Setting>
        </SettingsSurface>

        <Title>Developer</Title>
        <SettingsSurface>
          <Entry>
            <SmallTitle>Debug Info</SmallTitle>
            <StyledCode>
              <p>Supports grid-gap: {yesOrNo(supportsGap)}</p>
              <p>Supports flex-gap: {yesOrNo(supportsFlexGap)}</p>
              <p>Supports aspect-ratio: {yesOrNo(supportsAspectRatio)}</p>
              <p>Supports object-fit: {yesOrNo(supportsObjectFit)}</p>
            </StyledCode>
          </Entry>

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
