import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import Button from "../common/Button";
import { RED } from "../../data/types";
import { useDispatch } from "react-redux";
import { allowCookiesAction } from "../../redux/actions";

const CookieWrapper = styled.div(
  (props) => css`
    position: fixed;
    display: flex;
    bottom: 0;
    bottom: left;
    width: 100%;
    color: ${props.theme.colors.text};
    background: ${props.theme.colors.backgroundColor};
    justify-content: space-between;
    padding: ${props.theme.dimensions.gutter} 0;

    span {
      margin: auto 0;
      margin-left: ${props.theme.dimensions.gutter};
    }

    button {
      margin-right: ${props.theme.dimensions.gutter};
    }
  `
);

export default function CookieConfirmation() {
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    dispatch(allowCookiesAction());
  }, [dispatch]);

  return (
    <CookieWrapper>
      <span>This website uses cookies.</span>
      <Button type={RED} onClick={onClick} label="Allow Cookies">
        Cool
      </Button>
    </CookieWrapper>
  );
}
