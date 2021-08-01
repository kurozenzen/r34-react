import React, { useEffect, useState } from 'react'
import { getSupertags } from '../../firebase'

export default function TagLists() {
  const [tagLists, setTagLists] = useState<unknown>({})

  useEffect(() => {
    getSupertags().then((tagLists) => {
      setTagLists(tagLists)
    })
  }, [])

  return (
    <div>
      {/* {Object.entries(tagLists).map(([key, tagList]) => {
        return <div key={key}>list</div>
      })} */}
    </div>
  )
}
