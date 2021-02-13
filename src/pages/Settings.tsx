import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlockButton } from "../components/common/Button";
import Setting from "../components/common/Setting";
import SmallTextInput from "../components/common/SmallTextInput";
import Surface, { Line } from "../components/common/Surface";
import Title from "../components/common/Title";
import Toggle from "../components/common/Toggle";
import Footer from "../components/features/Footer";
import Header from "../components/features/Header";
import { PRELOAD_VIDEOS, TAG_SUGGESTION_COUNT } from "../data/types";
import { setOption } from "../redux/actions";
import { selectPreferences } from "../redux/selectors";

export default function Settings() {
  const dispatch = useDispatch();
  const { preloadVideos, tagSuggestionsCount } = useSelector(selectPreferences);
  const togglePreloadVideos = useCallback(
    () => dispatch(setOption(PRELOAD_VIDEOS, !preloadVideos)),
    [dispatch, preloadVideos]
  );
  const setTagSuggestionCount = useCallback(
    (event) => dispatch(setOption(TAG_SUGGESTION_COUNT, event.target.value)),
    [dispatch]
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

        <Setting
          title="Preload Videos"
          description="Start loading videos immediately instead of just-in-time. This can improve the viewing experience but will consume a LOT of data. Only use with WIFI."
        >
          <Toggle value={preloadVideos} onToggle={togglePreloadVideos} />
        </Setting>

        <Setting
          title="Number of Tag suggestions"
          description="Controls the number of tags displayed when searching. Increase this when searching for niche tags."
        >
          <SmallTextInput
            type="number"
            value={tagSuggestionsCount}
            onChange={setTagSuggestionCount}
          />
        </Setting>
        <Line />
        <Title>Developer</Title>
        <BlockButton onClick={reset}>Reset Application</BlockButton>
      </Surface>
      <Footer />
    </>
  );
}
