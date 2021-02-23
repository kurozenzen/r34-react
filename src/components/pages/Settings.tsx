import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css, useTheme } from "styled-components";
import {
  ORIGINALS,
  PAGE_SIZE,
  PRELOAD_VIDEOS,
  ResultLayout,
  RESULTS_LAYOUT,
  TAG_SUGGESTION_COUNT,
} from "../../data/types";
import { CodeBranchIcon } from "../../icons/Icons";
import { ThemeType } from "../../misc/theme";
import { setOption } from "../../redux/actions";
import { selectPreferences } from "../../redux/selectors";
import { BlockButton } from "../common/Buttons";
import Centered from "../common/Centered";
import FlexColumn, { FlexColumnWithSpacing } from "../common/FlexColumn";
import { HorizontalLine } from "../common/Lines";
import Select from "../common/Select";
import Setting from "../common/Setting";
import SmallTextInput from "../common/SmallTextInput";
import Surface from "../common/Surface";
import { Faded, Title } from "../common/Text";
import Toggle from "../common/Toggle";
import Header from "../features/Header";

const layouts = {
  [ResultLayout.INFINITE_COLUMN]: "Infinite",
  [ResultLayout.PAGES]: "Pages",
};

const SettingsSurface = styled(Surface)(
  ({ theme }) => css`
    padding: ${theme.dimensions.hugeSpacing};
    gap: ${theme.dimensions.hugeSpacing};
  `
);

export default function Settings() {
  const dispatch = useDispatch();
  const {
    preloadVideos,
    tagSuggestionsCount,
    originals,
    resultsLayout,
    pageSize,
  } = useSelector(selectPreferences);

  const togglePreloadVideos = useCallback(
    () => dispatch(setOption(PRELOAD_VIDEOS, !preloadVideos)),
    [dispatch, preloadVideos]
  );

  const toggleOriginals = useCallback(
    () => dispatch(setOption(ORIGINALS, !originals)),
    [dispatch, originals]
  );

  const setTagSuggestionCount = useCallback(
    (newValue: string | number) =>
      dispatch(setOption(TAG_SUGGESTION_COUNT, Number(newValue))),
    [dispatch]
  );

  const setPageSize = useCallback(
    (newValue: string | number) =>
      dispatch(setOption(PAGE_SIZE, Number(newValue))),
    [dispatch]
  );

  const setResultsLayout = useCallback(
    (event) => dispatch(setOption(RESULTS_LAYOUT, event.target.value)),
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
        <SettingsSurface>
          <Title>General</Title>
          <HorizontalLine />
          <Setting
            title="Results Layout"
            description="Choose how your results are displayed."
          >
            <Select
              options={layouts}
              value={resultsLayout}
              onChange={setResultsLayout}
            />
          </Setting>

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
              value={tagSuggestionsCount}
              onSubmit={setTagSuggestionCount}
            />
          </Setting>
          <Setting
            title="Page size"
            description="Controls the number of posts loaded at once."
          >
            <SmallTextInput value={pageSize} onSubmit={setPageSize} />
          </Setting>
          <Title>Developer</Title>
          <HorizontalLine />
          <BlockButton onClick={reset}>Reset Application</BlockButton>
        </SettingsSurface>
        <Centered>
          <CodeBranchIcon
            color={(useTheme() as ThemeType).colors.subduedText}
          />{" "}
          <Faded>Version 2.2.1</Faded>
        </Centered>
      </FlexColumnWithSpacing>
    </FlexColumn>
  );
}
