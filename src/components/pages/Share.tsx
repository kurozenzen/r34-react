import * as r34 from 'r34-types'
import React from 'react'
//@ts-expect-error
import MetaTags from 'react-meta-tags'
import { useLocation } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { decodeSupertag } from '../../data/tagUtils'
import { addSupertag, removeSupertag, useSupertags } from '../../firebase'
import useFirebaseAuthState from '../../hooks/useFirebaseAuthState'
import { usePageTitle } from '../../hooks/usePageTitle'
import { CopyIcon, PlusIcon, SuccessIcon } from '../../icons/FontAwesomeIcons'
import { borderRadius, flexRowWithGap, layer } from '../../styled/mixins'
import { RedButton } from '../designsystem/Buttons'
import FlexColumn, { FlexColumnWithSpacing } from '../designsystem/FlexColumn'
import Surface from '../designsystem/Surface'
import { Faded, Title } from '../designsystem/Text'
import Header from '../features/Header'
import TagList from '../tag/TagList'
import socialPreview from '../../icons/social-preview.png'

const ShareColumn = styled(FlexColumnWithSpacing)`
  place-content: center;
  align-items: center;
  place-content: center;
  flex-grow: 1;
`

const SupertagSurface = styled(Surface)`
  grid-template-rows: auto auto auto 1fr;
  grid-template-columns: 1fr auto;
  padding: 16px;
  justify-content: center;
  max-width: 500px;
`

const Name = styled(Title)`
  text-align: left;
  grid-area: 1/1/2/2;
`

const ShortDesc = styled(Faded)`
  grid-area: 2/1/3/3;
`

const ImportButton = styled(RedButton)`
  grid-area: 1/2/2/3;
`

const ScrollFaded = styled(Faded)`
  overflow-x: auto;
  white-space: nowrap;
  mask-image: linear-gradient(90deg, #000 95%, transparent);
  ::-webkit-scrollbar {
    height: 0px;
  }
`

const Link = styled.span(
  ({ theme }) => css`
    ${flexRowWithGap}
    ${layer}
    ${borderRadius}
    padding: ${theme.dimensions.bigSpacing};
    color: ${theme.colors.subduedText};
    grid-area: 3/1/4/3;
    cursor: pointer;

    :active,
    :active > span {
      color: ${theme.colors.accentColor};
    }
  `
)

const Tags = styled(TagList)`
  grid-area: 4/1/5/3;
`

const TAG_NO_OP = (tag: r34.AnyBiasedTag) => {}

export default function About() {
  const location = useLocation()

  const { name, description, tags } = decodeSupertag(location.search)

  usePageTitle(`R34 React - ${name}`)

  const tagObjects = React.useMemo(
    () =>
      Object.entries(tags).reduce((result, [name, modifier]) => {
        result[name] = { name, modifier, types: [] }
        return result
      }, {} as Record<string, Omit<r34.BiasedTag, 'count'>>),
    [tags]
  )

  const copySupertagUrl = React.useCallback(() => {
    navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
      if (result.state === 'granted' || result.state === 'prompt') {
        navigator.clipboard.writeText(window.location.href).then(
          () => {},
          () => {
            console.warn('Failed to write to clipboard')
          }
        )
      }
    })
  }, [])

  const [signedIn] = useFirebaseAuthState()
  const supertags = useSupertags()

  const handleImport = React.useCallback(() => {
    addSupertag(name, description, tags)
      .then(() => {})
      .catch((err) => console.error('Failed to import supertag', err))
  }, [description, name, tags])
  const deleteSupertag = React.useCallback(() => removeSupertag(name), [name])

  const imported = React.useMemo(() => {
    return signedIn && name in supertags
  }, [name, signedIn, supertags])

  return (
    <FlexColumn>
      <MetaTags>
        <meta property='og:description' content={description} />
        <meta property='og:title' content={`Supertag - ${name}`} />
        <meta property='og:image' content={socialPreview} />
      </MetaTags>
      <Header />
      <ShareColumn>
        <Title>Supertag</Title>

        <SupertagSurface>
          <Name>{name}</Name>
          <ShortDesc>{description}</ShortDesc>
          {imported ? (
            <ImportButton
              disabled={!signedIn}
              title={signedIn ? 'Remove from your collection' : 'You need to be signed in'}
              onClick={deleteSupertag}
            >
              <SuccessIcon /> Imported
            </ImportButton>
          ) : (
            <ImportButton
              disabled={!signedIn}
              title={signedIn ? 'Import into your collection' : 'You need to be signed in'}
              onClick={handleImport}
            >
              <PlusIcon /> Import
            </ImportButton>
          )}

          <Link onClick={copySupertagUrl} title='Copy share url'>
            <ScrollFaded id='share-link'>{window.location.href}</ScrollFaded>
            <CopyIcon />
          </Link>
          <Tags tags={tagObjects} detailed={false} onTagClick={TAG_NO_OP} />
        </SupertagSurface>
      </ShareColumn>
    </FlexColumn>
  )
}
