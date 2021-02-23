import React, { MouseEventHandler, useCallback } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { API } from "../../../misc/api";
import { selectCount } from "../../../redux/selectors";
import { RedButton } from "../../common/Buttons";
import SmallTextInput from "../../common/SmallTextInput";

const PageRow = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-content: center;
    place-items: center;
    gap: ${theme.dimensions.gutter};
    padding: ${theme.dimensions.gutter};
    padding-bottom: 0;
    max-width: ${theme.dimensions.bodyWidth};
    margin: auto;
  `
);

interface PageNavigationProps {
  currentPage: number;
  loadPage: (pageNumber: number) => void;
}

const PageNumber = styled(RedButton)``;

const CurrentNumber = styled(SmallTextInput)``;

export default function PageNavigation(props: PageNavigationProps) {
  const { currentPage, loadPage } = props;
  const pageSize = API.pageSize;
  const count = useSelector(selectCount);

  const lastPage = Math.ceil(count / pageSize) - 1;

  const loadSpecificPage = useCallback(
    (newPage: number | string) => {
      loadPage(Number(newPage));
    },
    [loadPage]
  );

  const loadFirst: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      loadPage(0);
    },
    [loadPage]
  );

  const loadPrevious: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      loadPage(currentPage - 1);
    },
    [currentPage, loadPage]
  );

  const loadNext: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      loadPage(currentPage + 1);
    },
    [currentPage, loadPage]
  );

  const loadLast: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      loadPage(lastPage);
    },
    [loadPage, lastPage]
  );

  return (
    <PageRow className="page-navigation">
      {currentPage > 1 ? (
        <PageNumber onClick={loadFirst}>0</PageNumber>
      ) : (
        <div></div>
      )}
      {currentPage > 0 ? (
        <PageNumber onClick={loadPrevious}>{currentPage - 1}</PageNumber>
      ) : (
        <div></div>
      )}
      <CurrentNumber value={currentPage} onSubmit={loadSpecificPage} />
      {currentPage < lastPage ? (
        <PageNumber onClick={loadNext}>{currentPage + 1}</PageNumber>
      ) : (
        <div></div>
      )}
      {currentPage < lastPage - 1 ? (
        <PageNumber onClick={loadLast}>{lastPage}</PageNumber>
      ) : (
        <div></div>
      )}
    </PageRow>
  );
}
