import { VIDEO, GIF, PICTURE } from "../../data/constants";

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

export const getMediaType = (type, src) => {
  if (type === "video") {
    return VIDEO;
  }

  if (src.endsWith(".gif")) {
    return GIF;
  }

  return PICTURE;
};
