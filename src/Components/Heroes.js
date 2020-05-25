import React, { useState, useEffect } from 'react';

import { css } from 'emotion';

export default function Heroes({ heroes, heroAction }) {
  const [ isClicked, setIsClicked ]     = useState(false);
  const [ heroDetails, setHeroDetails ] = useState({});

  useEffect(() => {
    console.log(isClicked);
  }, [ isClicked ]);

  const resetValueAndCloseModal = () => {
    setIsClicked(false);
    setHeroDetails({}); // reset statistics
  }

  function onClickedSearchHero(id) {
    setIsClicked(true);
    const getHero = heroes.find(val => val.id === id);
    setHeroDetails(getHero);
  }

  return (
    <div>
      <Modal 
        heroDetails={heroDetails} 
        resetVal={resetValueAndCloseModal} 
        isClicked={isClicked} 
        heroAction={heroAction} />

      {heroes.map(hero => {
        return <Hero clickedHero={onClickedSearchHero} key={hero.id} hero={hero} />
      })}
    </div>
  )
}

function Modal({ heroDetails, resetVal, isClicked, heroAction }) {
  const [ isOpen, setIsOpen ] = useState(false);

  useEffect(() => {
    setIsOpen(isClicked);
  }, [ isClicked ]);

  const onHeroClickHandler = (heroDetails) => {
    resetVal();
    return heroAction(heroDetails);
  }

  return (
    <div className={css`
      z-index: 1;
      position: fixed;
      display: ${isClicked === false ? "none" : "inline-block"};
      background-color: black;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      text-align: left;
      padding: 20px;
    `}>

      <div className={css`
        position: relative;
      `}>
        <div className={css`
          position: absolute;
          border-radius: 40px;
          overflow: hidden;
          top: 10px;
          right: 10px;
          text-align: center;
          font-size: 40px;
          color: #fff;
          cursor: pointer;
        `}
        onClick={resetVal}>
          X
        </div>
      </div>
      <Biography heroDetails={ heroDetails } />
      <PowerStats heroDetails={ heroDetails.powerstats } />

      <div className={css`
        position: absolute;
        bottom: 10px;
        left: 30%;
        right: 30%;

        > button {
          font-size: 20px;
          background: none;
          width: 100%;
          border-radius: 5px;
          border: 0.5px solid rgba(255, 255, 255, 0.7);
          padding: 20px 0;
        }
      `}>
        <button onClick={() => onHeroClickHandler(heroDetails)} type="button">{ heroDetails.hasOwnProperty("liked") ? "Remove as favorite" : "Add to favorite" }</button>
      </div>

      <div className={css`
        z-index: -1;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background-image: ${isClicked === false ? "none" : `linear-gradient(to right, ${heroDetails.appearance["eye-color"]}, rgba(255, 255, 255, 0)), url(${heroDetails.image.url})` };
        transform: ${isOpen === false ? "scale(1) rotate(0)" : "scale(1.1) rotate(3deg)"};
        transition: transform 1.5s ease-out;
        background-size: cover;
        filter: grayscale(50%);
        opacity: 0.2;
        width: 100%;
        height: 100%;
        color: #fff;
      `}>
      </div>
    </div>
  )
}

function PowerStats({ heroDetails }) {
  const [ stats, setStats ] = useState({
    "combat": 0,
    "durability": 0,
    "intelligence": 0,
    "power": 0,
    "speed": 0,
    "strength": 0,
  });

  useEffect(() => {
    if (typeof heroDetails !== 'undefined') {
      setStats(heroDetails);
    }
  }, [ heroDetails ]);

  return (
    <div className={css`
      position: absolute;
      bottom: 100px;
      margin-top: 100px;
      display: grid;
      align-items: center;
      grid-template-columns: repeat(2,1fr);

      > span {
        height: 20px;
        background-color: #fff;
        transition: width 0.5s linear;
      }
      > p {
        margin: 0;
        margin-right: 10px;
        font-size: 20px;
      }
    `}>
      <p>Combat</p>
      <span className={css`
        width: ${stats.combat}%;
      `}></span>
      <p>Durability</p>
      <span className={css`
        width: ${stats.durability}%;
      `}></span>
      <p>Intelligence</p>
      <span className={css`
        width: ${stats.intelligence}%;
      `}></span>
      <p>Power</p>
      <span className={css`
        width: ${stats.power}%;
      `}></span>
      <p>Speed</p>
      <span className={css`
        width: ${stats.speed}%;
      `}></span>
      <p>Strength</p>
      <span className={css`
        width: ${stats.strength}%;
      `}></span>
    </div>
  )
}

function Biography({ heroDetails }) {
  const [ biography, setBiography ] = useState({
    "name": "name",
    "biography": {
      "full-name": "full name",
      "alter-egos": "alter ego",
      "aliases": ["alias1", "alias2", "alias3"],
      "publisher": "publisher"
    }
  });

  useEffect(() => {
    if (Object.keys(heroDetails).length !== 0) {
      setBiography(heroDetails);
    }
  }, [ heroDetails, biography ]);

  return (
    <div className={css`
      > p {
        margin-bottom: 0;
        font-size: 20px;
        font-weight: 400;
      }
      > i {
        margin-left: 10px;
        font-size: 15px;
      }
    `}>
      <div className={css`
        font-size: 50px;
        font-weight: 500;
        border-bottom: 1px solid #fff;
        padding-bottom: 30px;
      `}>{biography.name}</div>
      <p>Full Name</p>
      <i>{biography.biography["full-name"]}</i>
      <p>Alter Ego</p>
      <i>{biography.biography["alter-egos"]}</i>
      <p>Aliases</p>
      {biography.biography.aliases.map((alias, idx) => {
        return <i key={idx}>{alias}</i>
      })}
      <p>Publisher</p>
      <i>{biography.biography.publisher}</i>
    </div>
  )
}

function Hero({ clickedHero, hero }) {

  return (
    <div onClick={() => clickedHero(hero.id)} className={css`   
      background-color: rgba(15, 15, 15, 1);
      margin: 5px 10px;
      display: flex;
      position: relative;
      height: 150px;
      overflow: hidden;
      padding-left: 10px;
      text-align: left;
      cursor: pointer;

      &:hover {
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.8);
      }
    `}>
      <div>
      <h2>{ hero.name }</h2>
      <p>full name: <i>{ hero.biography["full-name"] }</i> </p>
      </div>
      <div className={css`
        background-image:
        linear-gradient(to right, rgba(15, 15, 15, 1), rgba(255, 255, 255, 0)),
        url(${hero.image.url});
        filter: grayscale(100%);
        background-size: cover;
        position: absolute;
        width: 50%;
        height: 100%;
        right: 0;
      `}>
      </div>
    </div>
  )
} 