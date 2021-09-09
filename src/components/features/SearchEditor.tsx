import styled from 'styled-components'
import TagSelector from '../tagSelector/TagSelector'
import SearchButton from '../widgets/SearchButton'
import ActiveTags from '../widgets/ActiveTags'
import { useActivateTag } from '../../hooks/useActivateTag'
import { defaultSpacing } from '../../styled/mixins/gap'
import { centeredMaxWidth, flexColumn } from '../../styled/mixins/layout'
import TitledSurface from '../designsystem/TitledSurface'
import RatedFilter from '../widgets/RatedFilter'
import SortSelect from '../widgets/SortSelect'
import useFirebaseAuthState from '../../hooks/useFirebaseAuthState'

const ConfigWrapper = styled.section`
  ${flexColumn}
  ${defaultSpacing}
  ${centeredMaxWidth}
`

export default function SearchEditor(props: { onLoad: () => void }) {
  const { onLoad } = props

  const [isSignedIn] = useFirebaseAuthState()
  const activateTag = useActivateTag()

  return (
    <ConfigWrapper>
      <TitledSurface title={<label htmlFor='tag-input'>Search</label>} compact>
        <TagSelector onSubmit={activateTag} showSupertags />
        <ActiveTags onChange={onLoad} offerSupertags={isSignedIn} />
        <RatedFilter />
        <SortSelect />
        <SearchButton />
      </TitledSurface>
    </ConfigWrapper>
  )
}
