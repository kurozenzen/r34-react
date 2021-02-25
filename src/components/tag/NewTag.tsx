import React, { useEffect, MouseEventHandler, useState } from "react"
import "./Tag.css"
import api from "../../misc/api"
import TypeIcon from "../../icons/TypeIcon"
import { ArrowIcon } from "../../icons/Icons"
import { formatCount } from "../../misc/formatting"
import TagDataClass from "../../data/Tag"
import { useDispatch, useSelector } from "react-redux"
import { selectActiveTags, selectAliasesByTagName } from "../../redux/selectors"
import { addAliases, removeTag, addTag } from "../../redux/actions"
import useToggle from "../../hooks/useToggle"
import TagWrapper from "./TagWrapper"
import TagName from "./TagName"
import { Modifier } from "../../data/types"
import AliasesList from "./AliasesList"

/**
 * Same data as a tag but different names
 */
type TagLike = {
  name: string
  posts: number
}

interface TagProps extends TagDataClass {
  loadAliases: boolean
}

export default function NewTag(props: TagProps) {
  const { name, count, modifier = Modifier.PLUS, types, loadAliases } = props
  const dispatch = useDispatch()
  const activeTags = useSelector(selectActiveTags)
  const [collapsed, toggleCollapsed, resetCollapsed] = useToggle(true)
  const aliases = useSelector(selectAliasesByTagName(name))
  const [tagRef, setTagRef] = useState<HTMLDivElement | null>(null)

  const isActive = Boolean(activeTags[name])

  useEffect(() => {
    if (loadAliases && activeTags[name])
      api.getAliases(name).then((newAliases: TagLike[]) => {
        newAliases.sort((a, b) => b.posts - a.posts)
        const filtered = newAliases
          .filter((alias) => !activeTags[alias.name])
          .map((alias) => new TagDataClass(alias.name, [], alias.posts))
        dispatch(addAliases(filtered, name))
      })
  }, [loadAliases, name, activeTags, dispatch])

  return (
    <TagWrapper active={isActive} collapsed={collapsed} onMouseLeave={resetCollapsed} ref={setTagRef}>
      <TypeIcon types={types} />
      <TagName modifier={modifier} name={name} count={count} />
      {loadAliases && aliases?.length > 0 && (
        <>
          <ArrowIcon onClick={toggleCollapsed} />
          {!collapsed && tagRef && <AliasesList aliases={aliases} modifier={modifier} parentRef={tagRef} />}
        </>
      )}
    </TagWrapper>
  )
}
