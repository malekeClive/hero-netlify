import React from 'react';
import { css } from 'emotion';


export default function Menu({ clickedMenu, setClickedMenu }) {
  const clicked = css`
    background-color: #fff;
    color: black;
    border: 1px solid rgba(15, 15, 15, 0.5);
  `
  const unClicked = css`
    background-color: black;
    color: #fff;
    border: #fff;
  `

  return (
    <div className={css`
      display: flex;
      justify-content: space-between;
      margin: 15px 20px;

      > div {
        border-radius: 5px;
        width: 47%;
        font-size: 15px;
      }
    `}>
      <div className={clickedMenu === 0 ? clicked : unClicked} onClick={() => setClickedMenu(0)}>
        <p>
          Favorite Hero
        </p>
      </div>
      <div className={clickedMenu === 1 ? clicked : unClicked} onClick={() => setClickedMenu(1)}>
        <p>
          Search
        </p>
      </div>
    </div>
  )
}
