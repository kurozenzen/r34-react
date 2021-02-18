import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlockButton } from "../common/Buttons";
import FlexColumn, { FlexColumnWithSpacing } from "../common/FlexColumn";
import { HorizontalLine } from "../common/Lines";
import Setting from "../common/Setting";
import SmallTextInput from "../common/SmallTextInput";
import Surface from "../common/Surface";
import { Title } from "../common/Text";
import Toggle from "../common/Toggle";
import Footer from "../features/Footer";
import Header from "../features/Header";
import {
  PRELOAD_VIDEOS,
  TAG_SUGGESTION_COUNT,
  ORIGINALS,
} from "../../data/types";
import { setOption } from "../../redux/actions";
import { selectPreferences } from "../../redux/selectors";

export default function Settings() {
  const dispatch = useDispatch();
  const { preloadVideos, tagSuggestionsCount, originals } = useSelector(
    selectPreferences
  );
  const togglePreloadVideos = useCallback(
    () => dispatch(setOption(PRELOAD_VIDEOS, !preloadVideos)),
    [dispatch, preloadVideos]
  );
  const toggleOriginals = useCallback(
    () => dispatch(setOption(ORIGINALS, !originals)),
    [dispatch, originals]
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
    <FlexColumn>
      <Header />
      <FlexColumnWithSpacing>
        <Title>Settings</Title>
        <Surface>
          <Title>General</Title>
          <HorizontalLine />
          <Setting
            title="Preload Videos"
            description="Start loading videos immediately instead of just-in-time. This can improve the viewing experience but will consume a LOT of data. Only use with WIFI."
          >
            <Toggle value={preloadVideos} onToggle={togglePreloadVideos} />
          </Setting>

          <Setting
            title="Load original sizes"
            description="Display images and videos at their original resolution. This will consume more data but provides a nicer experience."
          >
            <Toggle value={originals} onToggle={toggleOriginals} />
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
          <Title>Developer</Title>
          <HorizontalLine />
          <BlockButton onClick={reset}>Reset Application</BlockButton>
        </Surface>
      </FlexColumnWithSpacing>
      <Footer />
    </FlexColumn>
  );
}
