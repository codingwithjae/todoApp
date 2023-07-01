import './Header.css';
import mobileHeaderHero from '../../assets//bg-mobile-light.jpg';
import desktopHeaderHero from '../../assets//bg-desktop-light.jpg';
import mobileHeaderHeroDark from '../../assets//bg-mobile-dark.jpg';
import desktopHeaderHeroDark from '../../assets//bg-desktop-dark.jpg';
import moonIcon from '../../assets//icon-moon.svg';
import sunIcon from '../../assets//icon-sun.svg';
import React, { useContext } from 'react';
import { ThemeContext } from '/home/johander/DevProjects/todoApp/src/App.js';

function Header() {
  const { toggleTheme } = useContext(ThemeContext);

  const handleModeToggle = () => {
    toggleTheme();
  };

  return (
    <header>
      <section className="headerContainerMobile">
        <button className="headerContainer__title">
          <h1>T O D O</h1>
          <img className='moonIcon' src={moonIcon} alt="moonIcon" onClick={handleModeToggle} />
          <img className='sunIcon' src={sunIcon} alt="sunIcon" onClick={handleModeToggle} />
        </button>
        <img className='mobileHero' src={mobileHeaderHero} alt="heroForMobile" />
        <img className='mobileHeroDark' src={mobileHeaderHeroDark} alt="heroForMobile" />
      </section>

      <section className="headerContainerDesktop">
        <button className="headerContainer__title">
          <span><h1>T O D O</h1></span>
          <span><img className='moonIcon' src={moonIcon} alt="moonIcon" onClick={handleModeToggle} /></span>
          <span><img className='sunIcon' src={sunIcon} alt="sunIcon" onClick={handleModeToggle} /></span>
        </button>
      </section>
      <img className='desktopHero' src={desktopHeaderHero} alt="desktopForMobile" />
      <img className='desktopHeroDark' src={desktopHeaderHeroDark} alt="desktopForMobile" />
    </header>
  );
}

export { Header };
