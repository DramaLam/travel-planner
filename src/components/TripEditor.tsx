import { useState } from 'react';

import NewDay from './NewDay';
import TripDayCard from './TripDayCard';

import { useAppSelector } from '../store/hooks';

import pencilIcon from '../assets/icons/pencil.svg';
import { trip as messages } from '../locales/ru.json';

import '../styles/TripEditor.css';

type TitleObj = {
  name: string;
  isEditing: boolean;
};

function TripEditor() {
  const days = useAppSelector((state) => state.trip.days);

  const initialTitle: TitleObj = {
    name: messages.title,
    isEditing: false
  };

  const [title, setTitle] = useState(initialTitle);
  const [draftTitle, setDraftTitle] = useState(title.name);

  const handleStartEditing = () => {
    setTitle({ ...title, isEditing: true })
  };

  const handleRenameEditing = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDraftTitle(value);
  };

  const handleEditingBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    handleRenameDone();
  };

  const handleRenameDone = () => {
    setTitle({ name: draftTitle, isEditing: false })
  };

  const handleRenameCancel = () => {
    setTitle({ ...title, isEditing: false });
    setDraftTitle(title.name);
  };

  const [isCreatingDay, setCreatingDay] = useState(false);

  const handleCancelCreateNewDay = () => {
    setCreatingDay(false);
  };

  const handleCreateNewDay = () => {
    setCreatingDay(true);
  };

  const handleDaySaved = () => {
    setCreatingDay(false);
  };

  return (
    <main className="main">
      <div className="trip-editor__heading">
        <div className="trip-editor__title-row">
          {title.isEditing ? (
            <div
              className="trip-editor__editing-group"
              onBlur={handleEditingBlur}
            >
              <input
                value={draftTitle}
                className="trip-editor__title trip-editor__input"
                onChange={handleRenameEditing}
                autoFocus
              />

              {/* Button Done */}
              <button
                type='button'
                className='trip-editor__editing-btn trip-editor__editing-btn-done'
                aria-label={messages.editDone}
                onClick={handleRenameDone}
              >
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
              </button>

              {/* Button Cancel */}
              <button
                type='button'
                className='trip-editor__editing-btn trip-editor__editing-btn-cancel'
                aria-label={messages.editCancel}
                onClick={handleRenameCancel}  
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M5 5L10 10M10 10L15 15M10 10L15 5M10 10L5 15"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="currentColor"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <>
              <h1 className='trip-h1'>
                <button
                  className="trip-editor__title"
                  onClick={handleStartEditing}
                >
                  {title.name}
                </button>
              </h1>

              <button
                type="button"
                className="trip-editor__edit"
                aria-label={messages.editTitle}
                onClick={handleStartEditing}
              >
                <img
                  src={pencilIcon}
                  alt="" width="20" height="20"
                  className='trip-editor__edit-icon'
                />
              </button>
            </>
          )
        }
        </div>

        <p className="trip-editor__description">
          {messages.emptyDescription}
        </p>
      </div>

      <section className='form'>
        {/* No one days */}
        {days.length === 0 && !isCreatingDay && (
          <div className='trip-editor__day__title-group'>
            <h2 className='trip-editor__day__title'>
              {messages.firstDayTitle}
            </h2>

            <p className='text-secondary '>
              {messages.firstDayText}
            </p>
          </div>
        )}

        {/* Days */}
        <div>
          {days.map((day, index) => (
            <TripDayCard
              key={day.id}
              day={day}
              dayNumber={index + 1}
            />
          ))}

          {isCreatingDay && (
            <NewDay
              onCancel={handleCancelCreateNewDay}
              onSave={handleDaySaved}
            />
          )}
        </div>

        {/* Btn create new day */}
        <button
          type='button'
          className='trip__day-number trip-editor__plus'
          onClick={handleCreateNewDay}
          disabled={isCreatingDay}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className='trip-editor__plus-text'
            aria-hidden="true"
          >
            <path d="M5.38003 -4.76837e-06V4.72H10.02V5.31999H5.38003V10.02H4.66003V5.31999H2.95639e-05V4.72H4.66003V-4.76837e-06H5.38003Z"
              fill="currentColor"
            />
          </svg>

        </button>
        
      </section>
    </main>
  )
}

export default TripEditor;
