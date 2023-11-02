import * as r34 from 'r34-types'
import styled from 'styled-components'
import { Faded } from '../../designsystem/Text'
import { AdditionalDetails } from './AdditonalDetails'

const Username = styled.p`
  line-height: 1.25em;
`

const Message = styled(Faded)`
  display: block;
  line-height: 1.25em;
  overflow-wrap: anywhere;
`

const Centered = styled.p`
  text-align: center;
  padding: 12px;
`

const Comment = styled.div`
  display: content;
`

interface CommentsProps {
  comments: r34.Comment[]
}

export default function Comments(props: CommentsProps) {
  const { comments } = props

  return (
    <AdditionalDetails>
      {comments.length === 0 ? (
        <Centered>No comments found</Centered>
      ) : (
        comments.map((comment, index) => (
          <Comment key={index}>
            <Username>{comment.creator}</Username>
            <Message>{comment.body}</Message>
          </Comment>
        ))
      )}
    </AdditionalDetails>
  )
}
