import type { TripDay, TripStep } from '../types/trip';
import { useAppSelector } from '../store/hooks';

import settingIcon from '../assets/icons/setting.svg';
import hidden from '../assets/icons/hidden.svg';
import more from '../assets/icons/more.svg';

import '../styles/TripDayCard.css';
import '../styles/TripEditor.css';

import useMessages from '../locales/useMessages';

type TripDayCardProps = {
  day: TripDay;
  dayNumber: number;
};

function TripDayCard({ day, dayNumber }: TripDayCardProps) {
  const language = useAppSelector((state) => state.settings.language);
  const locale = language === 'en' ? 'en-US' : 'ru-RU';
  const { trip: messages } = useMessages();

  // Date
  const date = day.date
    ? new Date(`${day.date}T00:00:00`)
    : null;

  const formattedDate = date
    ? date.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'long',
      })
    : '';

  const weekday = date
    ? date.toLocaleDateString(locale, {
        weekday: 'long',
      })
    : '';
   
    //
    const sortedSteps = [...day.steps].sort((a, b) => {
      if (!a.startTime && !b.startTime) return 0;
      if (!a.startTime) return 1;
      if (!b.startTime) return -1;

      return a.startTime.localeCompare(b.startTime);
    });

    const renderOptionalInfo = (step: TripStep) => {
      const filledValues = Object.entries(step)
        .filter(([key]) => ['cost', 'duration', 'shortNote', 'address', 'link'].includes(key))
        .filter(([, value]) => {
          if (typeof value === 'string') return value.trim() !== '';
          return value !== null && value !== undefined;
        })
        .map(([, value]) => value);
      
      const detailsText = filledValues.join(' · ');

      return detailsText;
    };

  return (
    <section
      className='trip-day'
    >
      {/* Day title */}
      <div className='trip-day__header'>
        <div>
          <span className="trip__day-number">
            <span className="trip__day-number-text">
              {dayNumber}
            </span>
          </span>
        </div>

        {/* Day information */}
        <div className="trip-day__info">
          {date && (
            <p className="trip-day__date">
              {formattedDate} · {weekday}
            </p>
          )}

          <h3 className='trip-day__title'>
            {day.name}
          </h3>
        </div>

        {/* Btn */}
        <div className='trip-day__actions'>
          <button
            type='button'
            className='trip__icon'
            aria-label={messages.daySetting}
          >
            <img src={settingIcon} alt="" width="20" height="20" />
          </button>
          
          <button
            type='button'
            className='trip__icon'
            aria-label={messages.stepsHidden}
          >
            <img src={hidden} alt="" width="20" height="20" />
          </button>
        </div>

      </div>

      {/* Day steps */}
      <div>
        {sortedSteps.map((step) => (
          <div
            key={step.id}
            className='trip-day__step'
          >
            <div className='trip-day__step__time-group'>
              <span className='trip-day__step__time trip-day__step__time-primary'>
                {step.startTime}
              </span>
              <span className='trip-day__step__time'>
                {step.endTime}
              </span>
            </div>

            <div className="trip-day__step-marker" aria-hidden="true" />

            <div className="trip-day__step-content">
              {step.icon && (
                <span className="trip-day__step-icon">
                  {step.icon}
                </span>
              )}

              <div className='trip-day__step__info-group'>
                <p className='trip-day__step__name'>
                  {step.name}
                </p>
                
                <p className='trip-day__step__description'>
                  {step.description}
                </p>

                <p className='trip-day__step__optionalInfo'>
                  {renderOptionalInfo(step)}
                </p>
              </div>
            </div>

            <button
              type='button'
              className='trip__icon trip-day__step-menu'
              aria-label={messages.daySetting}
            >
              <img src={more} alt="" width="20" height="20" />
            </button>
          </div>
        ))}
      </div>

      {/* Add step */}
      <div>
        <button
          type='button'
          className='trip-day__add-btn'
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M5.38003 -4.76837e-06V4.72H10.02V5.31999H5.38003V10.02H4.66003V5.31999H2.95639e-05V4.72H4.66003V-4.76837e-06H5.38003Z"
              fill="currentColor"
            />
          </svg>
          <p>
            {messages.addStep}
          </p>
        </button>
      </div>
    </section>
  )
};

export default  TripDayCard;
