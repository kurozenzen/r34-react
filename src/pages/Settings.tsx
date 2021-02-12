import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlockButton } from "../components/common/Button";
import LabeledToggle from "../components/common/LabeledToggle";
import Surface, { Line } from "../components/common/Surface";
import { Subdued } from "../components/common/Text";
import Title from "../components/common/Title";
import Footer from "../components/features/Footer";
import Header from "../components/features/Header";
import { PRELOAD_VIDEOS } from "../data/types";
import { setOption } from "../redux/actions";
import { selectPreferences } from "../redux/selectors";

export default function Settings() {
  const dispatch = useDispatch();
  const { preloadVideos } = useSelector(selectPreferences);
  const togglePreloadVideos = useCallback(
    () => dispatch(setOption(PRELOAD_VIDEOS, !preloadVideos)),
    [dispatch, preloadVideos]
  );

  const reset = useCallback(() => {
    localStorage.clear();
    window.location.reload();
  }, []);

  return (
    <>
      <Header />
      <Title>Settings</Title>
      <Surface>
        <Title>General</Title>
        <LabeledToggle value={preloadVideos} onToggle={togglePreloadVideos}>
          <span>
            Preload Videos <Subdued>This will use a lot of data.</Subdued>
          </span>
        </LabeledToggle>
        <Line />
        <Title>Developer</Title>
        <BlockButton onClick={reset}>Reset Application</BlockButton>
      </Surface>
      <Footer />
    </>
  );
}
