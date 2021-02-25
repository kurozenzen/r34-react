import React, { useMemo } from "react"
import Surface from "../common/Surface"
import { Title } from "../common/Text"
import TagList from "../tag/TagList"
import outOfResultsPicture from "../../icons/OutOfResults.png"
import { useSelector } from "react-redux"
import { selectAliases } from "../../redux/selectors"
import TagDataClass from "../../data/Tag"
import { NO_OP, SimpleMap } from "../../data/types"
import LayoutElementProps from "./LayoutElementProps"
import { HorizontalLine } from "../common/Lines"

export default function LayoutOutOfItems({ onLoad = NO_OP, virtualRef, style }: LayoutElementProps) {
  const aliases = useSelector(selectAliases)
  const aliasesForRendering = useMemo(
    () =>
      aliases.reduce((result: SimpleMap<TagDataClass>, alias) => {
        result[alias.name] = alias
        return result
      }, {}),
    [aliases]
  )

  return (
    <div style={style} ref={virtualRef} onLoad={onLoad} role="row">
      <Surface>
        <img src={outOfResultsPicture} alt={outOfResultsPicture} style={{ width: "100%" }} />
        <HorizontalLine />
        <Title>You have reached the end!</Title>
        <p style={{ textAlign: "center" }}>Go look for something else!</p>
        {aliases.length > 0 && (
          <>
            <p style={{ textAlign: "center" }}>How about some of these?</p>
            <TagList tags={aliasesForRendering} padding />
          </>
        )}
      </Surface>
    </div>
  )
}
