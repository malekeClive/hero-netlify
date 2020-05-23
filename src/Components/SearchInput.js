import React, { useRef } from 'react';

import { css } from 'emotion';

export default function SearchInput({ searchHandler, setSearchInputHandler ,searchInputHandler }) {
  const inputSearch = useRef(null);

  const onSearchClick = () => {
    inputSearch.current.focus();
  }
  
  return (
    <div className={css`
      padding: 10px 0 7px 0;
      margin: 10px 20px;
      border-bottom: 0.3px solid rgba(15, 15, 15, 0.8);
    `} onClick={onSearchClick}>
      <form className={css`
          text-align: left;
        `} onSubmit={searchHandler} >
        <input ref={inputSearch} className={css`
          border: none;
          font-size: 20px;
        `} placeholder="Search Hero..." type="text" onChange={e => setSearchInputHandler(e.target.value)} value={searchInputHandler} />
      </form>
    </div>
  )
}


