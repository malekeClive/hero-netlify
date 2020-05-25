import React, { useState, useEffect } from 'react';

import './App.css';
import { css } from 'emotion';

import SearchInput from './Components/SearchInput';
import Menu from './Components/Menu';
import Heroes from './Components/Heroes';

function App() {
  const [ heroes, setHeroes ]             = useState([]); // hero list
  const [ favoriteHero, setFavoriteHero ] = useState([]); // favorite hero list
  const [ hasError, setError ]            = useState("");
  const [ searchInput, setSearchInput ]   = useState("");
  const [ menuBtn, setMenuBtn ]           = useState(1);
  const [ loading, setLoading ]           = useState(false);

  const _MENU = { favoriteMenu: 0, searchMenu: 1 };

  useEffect(() => {
    setHeroes([]); // reset when switch menu button
    setSearchInput(""); // reset when switch menu button
  }, [ menuBtn ]); // re-render component if something has changed in menu
  
  const onSearchSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const url           = (`/.netlify/functions/searchHero?heroes=${searchInput}`);
      const sendUrl       = await fetch(url);
      const responseJSON  = await sendUrl.json();
      if (responseJSON.result === "FAIL") {
        setHeroes([]);
        setLoading(false);
        return setError(responseJSON.message);
      }
      setLoading(false);
      setError("");
      setHeroes(responseJSON);
    } catch (err) {
      setError(err);
      console.log("error", err);
    }
  }

  const onSetAsFavoriteHero = (hero) => {
    const liked       = { liked: true }
    const heroList    = {...hero, ...liked};

    const existedHero = favoriteHero.some(val => val.id === hero.id);
    if (existedHero) return; // if hero exist in favoriteHero

    // if no Favorite yet
    if (favoriteHero.length === 0) return setFavoriteHero([...favoriteHero, heroList]);

    setFavoriteHero([...favoriteHero, heroList]) // add new one
  }

  const onRemoveHeroFromMyFavorite = (heroId) => {
    const copyFavHero = [...favoriteHero];
    const newFavHero  = favoriteHero.findIndex(hero => hero.id === heroId.id);
    copyFavHero.splice(newFavHero, 1); // remove hero from favorite list
    return setFavoriteHero([...copyFavHero]); // add new favorite heroes
  }

  return (
    <div className="App">
      <SearchInput 
        searchHandler={onSearchSubmit} 
        setSearchInputHandler={setSearchInput} 
        searchInputHandler={searchInput} />
      <Menu clickedMenu={menuBtn} setClickedMenu={setMenuBtn} />
      {loading === true ?
        <div className={css`
          color: black;
          margin 0 auto;
          border-radius: 5px;
          width: 30%;

          animation-duration: 1s;
          animation-name: changeOpacity;
          animation-iteration-count: infinite;
          animation-direction: alternate;

          @keyframes changeOpacity {
            from {
              opacity: 0%;
            }
            to {
              oopacity: 100%
            }
          }

          > p {
            padding: 10px 0;
            font-size: 25px;
          }
        `}><p>Loading...</p>
        </div>
      :
        null
      }

      {menuBtn === _MENU.favoriteMenu ? 
        <SearchHeroResults 
          heroes={favoriteHero} 
          onAction={onRemoveHeroFromMyFavorite}
          msg="You have no favorite hero" />
      :
        <SearchHeroResults 
          heroes={heroes} 
          onAction={onSetAsFavoriteHero}
          msg="Search Result" />
      }
    </div>

  );
}

const SearchHeroResults = ({ heroes, onAction, msg }) => {
  if (heroes.length === 0) return <NoData msg={msg} />;
  return <Heroes heroes={heroes} heroAction={onAction} />;
}

const NoData = ({msg=""}) => {
  return (
    <div className={css`
      width: 100%;
      color: black;
      font-size: 20px;
    `}>
      {msg}
    </div>
  )
}

export default App;
