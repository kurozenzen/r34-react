import React from "react"
import styled, { css } from "styled-components"

const Container = styled.div`
  display: inline-block;
  white-space: nowrap;
  min-width: 160px;
`

const AButton = styled.a(
  ({ theme }) => css`
    box-shadow: 1px 1px 0px rgba(0, 0, 0, 0.2);
    line-height: 36px !important;
    min-width: 150px;
    display: inline-block !important;
    background-color: ${theme.colors.layerBg};
    padding: 2px 12px !important;
    text-align: center !important;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
    overflow-wrap: break-word;
    vertical-align: middle;
    border: 0 none #fff !important;
    font-family: "Quicksand", Helvetica, Century Gothic, sans-serif !important;
    text-decoration: none;
    text-shadow: none;
    font-weight: 700 !important;
    font-size: 14px !important;

    :visited {
      color: #fff !important;
      text-decoration: none !important;
    }

    :hover {
      opacity: 0.85;
      color: #f5f5f5 !important;
      text-decoration: none !important;
    }

    :active {
      color: #f5f5f5 !important;
      text-decoration: none !important;
    }
  `
)

const Text = styled.span`
  color: #fff !important;
  letter-spacing: -0.15px !important;
  vertical-align: middle;
  line-height: 33px !important;
  padding: 0;
  text-align: center;
  text-decoration: none !important;
  text-shadow: 0 1px 1px rgba(34, 34, 34, 0.05);

  a {
    color: #fff !important;
    text-decoration: none !important;
  }

  a:hover {
    color: #fff !important;
    text-decoration: none;
  }
`

const Image = styled.img`
  display: initial !important;
  vertical-align: middle;
  height: 13px !important;
  width: 20px !important;
  padding-top: 0;
  padding-bottom: 0;
  border: none;
  margin-top: 0;
  margin-right: 5px;
  margin-left: 0;
  margin-bottom: 3px;
  content: url("https://ko-fi.com/img/cup-border.png");

  :after {
    vertical-align: middle;
    height: 25px;
    padding-top: 0;
    padding-bottom: 0;
    border: none;
    margin-top: 0;
    margin-right: 6px;
    margin-left: 0;
    margin-bottom: 4px !important;
    content: url("https://ko-fi.com/img/whitelogo.svg");

    height: 15px !important;
    width: 22px !important;
    display: initial;
    animation: kofi-wiggle 3s infinite;
  }
`

interface KofiButtonProps {
  id: string
  label: string
}

export default function KofiButton(props: KofiButtonProps) {
  const { id, label } = props

  return (
    <Container>
      <AButton title={label} href={"https://ko-fi.com/" + id} target="_blank" rel="noopener noreferrer">
        <Text>
          <Image src="https://ko-fi.com/img/cup-border.png" className="kofiimg" alt="Ko-Fi button" />
          {label}
        </Text>
      </AButton>
    </Container>
  )
}
