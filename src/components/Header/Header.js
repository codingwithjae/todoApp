import './Header.css';
import mobileHeaderHero from '../../assets//bg-mobile-light.jpg';
import desktopHeaderHero from '../../assets//bg-desktop-light.jpg';
import moonIcon from '../../assets//icon-moon.svg';

function Header() {
  return (
    <header>
      <section className="headerContainerMobile">
        <div className="headerContainer__title">
          <h1>T O D O</h1>
          <img className='moonIcon' src={moonIcon} alt="moonIcon" />
        </div>
        <img className='mobileHero' src={mobileHeaderHero} alt="heroForMobile" />
      </section>

      <section className="headerContainerDesktop">
        <div className="headerContainer__title">
          <h1>T O D O</h1>
          <img className='moonIcon' src={moonIcon} alt="moonIcon" />
        </div>
        <img className='desktopHero' src={desktopHeaderHero} alt="desktopForMobile" />
      </section>
    </header>
  );
}

export { Header };