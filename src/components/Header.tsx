import { app as messages } from '../locales/ru.json';

import { useAppSelector } from '../store/hooks';

import compass from '../assets/icons/compass.svg';

import '../styles/Header.css';

function Header() {
  const { writeStatus, isTitleDirty, isDayDirty } = useAppSelector(
    (state) => state.saveStatus
  );

  return (
    <header className='header'>
      <div className='header__title'>
        <img className="header__icon" src={compass} alt="" />
        <p>{messages.name}</p>
      </div>


      { writeStatus === 'saved' && !isTitleDirty && !isDayDirty && (
        <div className='header__save'>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path 
              d="M4.16675 10L7.50008 13.3333L15.8334 5"
              strokeWidth="1.33333"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
            />
          </svg>
          <p>
            {messages.save}
          </p>
        </div>
      )}
      
    </header>
  )
}

export default Header;
