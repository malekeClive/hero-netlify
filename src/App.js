import React, { useState, useEffect } from 'react';

import './App.css';
import { css } from 'emotion';

import SearchInput from './Components/SearchInput';
import Menu from './Components/Menu';
import Heroes from './Components/Heroes';

function App() {
  const [ heroName, setHeroName ]         = useState([]);
  const [ favoriteHero, setFavoriteHero ] = useState([]);
  const [ hasError, setError ]            = useState("");
  const [ searchInput, setSearchInput ]   = useState("");
  const [ menu, setMenu ]                 = useState(1);
  const [ loading, setLoading ]           = useState(false);

  useEffect(() => {
    setHeroName([]);
    setSearchInput("");
  }, [ menu ]); // re-render component if something has changed in menu

  const CheckClickedMenu = () => {
    if (menu === 0) {
      return (<Heroes 
              heroes={favoriteHero} 
              heroAction={onRemoveHeroFromMyFavorite}
            />);
    }
    return searchCheck(hasError, heroName);
  }

  const searchCheck = (hasError, heroName) => {
    if (hasError === "" && heroName.length === 0) return null;
    if (hasError !== "") return <div>kosong</div>;
    return (<Heroes 
            heroes={heroName} 
            heroAction={onSetAsFavoriteHero} 
            />);
  }
  
  const onSearchSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const url           = (`/.netlify/functions/searchHero?heroName=${searchInput}`);
      const sendUrl       = await fetch(url);
      const responseJSON  = await sendUrl.json();
      if (responseJSON.result === "FAIL") {
        setHeroName([]);
        setLoading(false);
        return setError(responseJSON.message);
      }
      setLoading(false);
      setError("");
      setHeroName(responseJSON);
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

    if (favoriteHero.length === 0) return setFavoriteHero([...favoriteHero, heroList]); // if no Favorite yet

    setFavoriteHero([...favoriteHero, heroList]) // add new one
  }

  const onRemoveHeroFromMyFavorite = (heroId) => {
    const copyFavHero = [...favoriteHero];
    const newFavHero = favoriteHero.findIndex(hero => hero.id === heroId);
    copyFavHero.splice(newFavHero, 1);
    return setFavoriteHero([...copyFavHero]);
  }

  return (
    <div className="App">
      <SearchInput 
        searchHandler={onSearchSubmit} 
        setSearchInputHandler={setSearchInput} 
        searchInputHandler={searchInput} />
      <Menu clickedMenu={menu} setClickedMenu={setMenu} />
      <div className={css`
        display: ${loading === true ? "inline-block" : "none"};
        background-color: rgba(15, 15, 15, 1);
        color: white;
        width: 100%;
        height: 10%;
      `}><p>Loading</p></div>
      <CheckClickedMenu />
    </div>
  );
}

export default App;
