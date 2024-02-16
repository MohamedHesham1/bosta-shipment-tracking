import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function Header({ trackingNumber, setTrackingNumber, onSearchSubmit }) {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLangMenu = () => {
    setIsLangMenuOpen(!isLangMenuOpen);
  };

  const toggleSearchVisibility = (isVisible) => {
    setIsSearchVisible(isVisible);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue)) {
      setTrackingNumber(inputValue);
      setErrorMessage('');
    } else {
      setErrorMessage('Please enter a valid tracking number.');
    }
  };

  const handleSearchSubmit = () => {
    onSearchSubmit();
    console.log('Searching for tracking number:', trackingNumber);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    setIsLangMenuOpen(false);
  };

  return (
    <header className='cairo-bold text-tertiary shadow-md py-4 px-4 sm:px-10 bg-white min-h-70 '>
      <div className='max-w-[1200px] mx-auto flex flex-wrap items-center justify-between gap-5 relative'>
        <a href='#'>
          <img
            src={
              i18n.language === 'ar'
                ? '/src/assets/logo-ar.svg'
                : '/src/assets/logo-en.svg'
            }
            alt='logo'
            className='w-36'
          />
        </a>
        <div className='flex items-center lg:order-1 max-sm:ms-auto'>
          <ul className='flex items-center gap-10'>
            <li
              className=' relative py-5 px-7'
              onMouseEnter={() => toggleSearchVisibility(true)}
              onMouseLeave={() => toggleSearchVisibility(false)}
            >
              <p className='text-primary'>{t('track')}</p>

              {isSearchVisible && (
                <div className='absolute top-16 left-0 z-10 bg-white border border-[#e4e7ec] rounded-[10px] px-5 py-9 shadow-xl bg-[#fff]'>
                  <label
                    htmlFor='tracking-number'
                    className='text-secondary font-semibold'
                  >
                    {t('trackShipment')}
                  </label>
                  {errorMessage && (
                    <p className='text-primary text-sm mt-1'>{errorMessage}</p>
                  )}
                  <div className='flex rounded-md border border-[#85888d] overflow-hidden w-[250px] mx-auto mt-4'>
                    <input
                      type='search'
                      id='tracking-number'
                      placeholder={t('placeholder')}
                      className='w-full outline-none bg-white text-gray-600 text-sm px-4 py-3'
                      value={trackingNumber}
                      onChange={handleInputChange}
                    />
                    <button
                      type='button'
                      className='flex items-center justify-center bg-primary px-5'
                      onClick={handleSearchSubmit}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 192.904 192.904'
                        width='16px'
                        className='fill-white'
                      >
                        <path d='m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z'></path>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </li>
            <li className='hover:text-primary hover:underline'>
              <a href='#'> {t('signIn')} </a>
            </li>
            <li>
              <div
                className='text-primary cursor-pointer relative'
                onClick={toggleLangMenu}
              >
                {i18n.language.toUpperCase()}
                {isLangMenuOpen && (
                  <ul className='absolute p-3 rounded-md bg-[#fff] text-left  top-full -left-2 bg-white border shadow-md'>
                    <li
                      onClick={() => changeLanguage('en')}
                      className='cursor-pointer'
                    >
                      EN
                    </li>
                    <li
                      onClick={() => changeLanguage('ar')}
                      className='cursor-pointer'
                    >
                      AR
                    </li>
                  </ul>
                )}
              </div>
            </li>
          </ul>

          <button
            id='toggle'
            className='lg:hidden ms-7 flex flex-col justify-center w-10 h-10 rounded-full focus:outline-none'
            onClick={toggleMenu}
          >
            <div
              className={`w-6 bg-[#475467] h-[3px] bg-black transition-transform duration-300 ${
                isMenuOpen ? 'transform rotate-45 relative top-[14px]' : ''
              }`}
            ></div>
            <div
              className={`w-6 bg-[#475467] h-[3px] bg-black mt-1 transition-transform duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            ></div>
            <div
              className={`w-6 bg-[#475467] h-[3px] bg-black mt-1 transition-transform duration-300 ${
                isMenuOpen ? 'transform -rotate-45' : ''
              }`}
            ></div>
          </button>
        </div>

        <ul
          id='collapseMenu'
          className={` lg:flex lg:space-x-5 max-lg:space-y-2  max-lg:py-4 max-lg:w-full ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <li className='max-lg:border-b max-lg:py-2 px-3 max-lg:rounded'>
            <a
              href='#'
              className='hover:text-primary hover:underline text-primary max-lg:text-white block text-[15px]'
            >
              {t('home')}
            </a>
          </li>
          <li className='max-lg:border-b max-lg:py-2 px-3 max-lg:rounded'>
            <a
              href='#'
              className='hover:text-primary hover:underline text-gray-500 block text-[15px]'
            >
              {t('prices')}
            </a>
          </li>
          <li className='max-lg:border-b max-lg:py-2 px-3 max-lg:rounded'>
            <a
              href='#'
              className='hover:text-primary hover:underline text-gray-500 block text-[15px]'
            >
              {t('sales')}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
