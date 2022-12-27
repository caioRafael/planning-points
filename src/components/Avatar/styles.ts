import { darken } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  .AvatarRoot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    overflow: hidden;
    user-select: none;
    width: 45px;
    height: 45px;
    border-radius: 100%;
    border: solid 2px ${(props) => darken(0.05, props.theme.colors.primary)};
    width: 50px;
    height: 50px;
  }

  .AvatarImage {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }

  .AvatarFallback {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: ${(props) => props.theme.colors.primary};
    font-size: 20px;
    line-height: 1;
    font-weight: 700;
  }
`
