import { VIDEO, GIF, PICTURE } from "../../data/constants";

/**
 * Fullscreens a given videoElement
 * @param {HTMLVideoElement} elem
 */
export const openFullscreen = (elem) => {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
};

/**
 * Calculates which type of media should be displayed for this type and source
 * @param {"video" | "image"} type
 * @param {String} src
 */
export const getMediaType = (type, src) => {
  if (type === "video") {
    return VIDEO;
  }

  // can't use .endsWith because of queryString
  if (src.includes(".gif")) {
    return GIF;
  }

  return PICTURE;
};
