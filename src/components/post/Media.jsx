import React from "react";
import Button from "../common/Button";
import { ExpandIcon, CloseIcon } from "../../icons/Icons";
import Image from "./Image";
import Video from "./Video";

export default function Media({
  type,
  src,
  thumbnail_src,
  isFullscreen,
  onFullscreen,
  onClick
}) {
  return (
    <div style={{ display: "contents" }}>
      <Button type={"topLeft"} onClick={onFullscreen} label="Toggle Fullscreen">
        {isFullscreen ? (
          <CloseIcon color="white" />
        ) : (
          <ExpandIcon color="white" />
        )}
      </Button>
      {type === "video" ? (
        <Video src={src} poster={thumbnail_src} onClick={onClick} />
      ) : (
        <Image src={src} alt={src} onClick={onClick} />
      )}
    </div>
  );
}
