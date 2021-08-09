import * as r34 from 'r34-types'
import React from 'react'
import styled from 'styled-components'
import { flexColumnGap } from '../../../styled/mixins'
import { Faded } from '../../designsystem/Text'
import { AdditionalDetails } from './AdditonalDetails'

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  ${flexColumnGap('4px')}
`

const Username = styled.span`
  line-height: 20px;
`

const Message = styled(Faded)`
  line-height: 20px;
`

interface CommentsProps {
  comments: r34.Comment[]
}

export default function Comments(props: CommentsProps) {
  const { comments } = props

  return (
    <AdditionalDetails>
      {comments.map((comment, index) => (
        <Comment key={index}>
          <Username>{comment.creator}</Username>
          <Message>{comment.body}</Message>
        </Comment>
      ))}
    </AdditionalDetails>
  )
}
