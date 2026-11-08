import { newStep as messages } from '../locales/ru.json';
import type { StepDraft, StepTextField, StepOptionalField } from '../types/trip';
import { useState } from 'react';

type NewStepProps = {
  step: StepDraft;
  stepNumber: number;
  onFieldChange: (
    stepId: string,
    field: StepTextField,
    value: string
  ) => void;
  onFieldAdd: (stepId: string, field: StepOptionalField) => void;
  onStepDelete: (stepId: string) => void;
};

type ActiveTimeField = 
  | 'startTime' 
  | 'endTime';


function NewStep({ step, stepNumber, onStepDelete, onFieldChange, onFieldAdd}: NewStepProps) {
  const [activeTimeField, setActiveTimeField] = useState<ActiveTimeField>('startTime')

  return (
    <section className='form'>
      {/* Step header */}
      <div className='form__step-title-group'>
        <h3 className='form__step-title'>
          <span className="form__step-number">
            {stepNumber}
          </span>
          <span className="form__step-label">{messages.title}</span>
        </h3>

        <button
          type="button"
          className='trip__icon form__step-delete'
          aria-label={messages.delete}
          onClick={() => onStepDelete(step.id)}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M0.708374 3.20837H2.37504M2.37504 3.20837H4.87504M2.37504 3.20837L3.20837 14.0417H11.5417L12.375 3.20837M4.87504 3.20837H9.87504M4.87504 3.20837V0.708374H9.87504V3.20837M9.87504 3.20837H12.375M12.375 3.20837H14.0417M5.70837 6.54171V10.7084M9.04171 6.54171V10.7084"
              strokeWidth="1.41667"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
            />
          </svg>
        </button>
      </div>

      <div className='form__group'>
        {/* Step name */}
        <div className='form__field'>
          <label
            htmlFor={`${step.id}-name`}
            className='form__label'
          >
            {messages.name.label} *
          </label>

          <div className="form__input-group">
            <button
              type="button"
              className="form__icon-button"
              aria-label={messages.name.chooseIcon}
            >
              <span aria-hidden="true">+</span>
            </button>

            <input
              id={`${step.id}-name`}
              type="text"
              value={step.name}
              className="form__input form__input--embedded"
              placeholder={messages.name.placeholder}
              onChange={(e) => onFieldChange(step.id, "name", e.target.value)}
              required
            />
          </div>
        </div>

        {/* Time */}
        <div className='form__field'>
          <div className='form__field-data'>
            {/* Start time */}
            <div className='form__field'>
              <label
                htmlFor={`${step.id}-startTime`}
                className='form__label'
              >
                {messages.time.start}
              </label>

              <input
                id={`${step.id}-startTime`}
                value={step.startTime}
                type="time"
                className='form__input'
                placeholder={messages.time.placeholder}
                onFocus={() => setActiveTimeField('startTime')}
                onChange={(e) => onFieldChange(step.id, "startTime", e.target.value)}
              />
            </div>

            {/* End time */}
            <div className='form__field'>
              <label
                htmlFor={`${step.id}-endTime`}
                className='form__label'
              >
                {messages.time.end}
              </label>

              <input
                id={`${step.id}-endTime`}
                value={step.endTime}
                type="time"
                className='form__input'
                placeholder={messages.time.placeholder}
                onFocus={() => setActiveTimeField('endTime')}
                onChange={(e) => onFieldChange(step.id, "endTime", e.target.value)}
              />
            </div>
          </div>

          {/* Quick time options */}
          <div className='form__time-group'>
            <p className='form__hint'>{messages.time.quickOptions}</p>

            <div className='form__time-options'>
              <button
                type="button"
                className='form__time-option'
                onClick={() => onFieldChange(step.id, activeTimeField, "09:00")}
              >
                09:00
              </button>

              <button
                type="button"
                className='form__time-option'
                onClick={() => onFieldChange(step.id, activeTimeField, "12:00")}
              >
                12:00
              </button>

              <button
                type="button"
                className='form__time-option'
                onClick={() => onFieldChange(step.id, activeTimeField, "15:00")}
              >
                15:00
              </button>

              <button
                type="button"
                className='form__time-option'
                onClick={() => onFieldChange(step.id, activeTimeField, "18:00")}
              >
                18:00
              </button>

              <button
                type="button"
                className='form__time-option'
                onClick={() => onFieldChange(step.id, activeTimeField, "21:00")}
              >
                21:00
              </button>
            </div>

            <p className='form__hint'>{messages.time.quickOptionsHint}</p>
          </div>
        </div>

        {/* Description */}
        <div className='form__field'>
          <label
            htmlFor={`${step.id}-description`}
            className='form__label'
          >
            {messages.description.label}
          </label>

          <textarea
            id={`${step.id}-description`}
            value={step.description}
            className="form__description form__input"
            placeholder={messages.description.placeholder}
            onChange={(e) => onFieldChange(step.id, "description", e.target.value)}
          />
        </div>

        {/* Optional fields */}
        {(step.visibleFields.includes('cost') || step.visibleFields.includes('duration')) && (
          <div className='form__cost-dur'>
            {/* Cost */}
            {step.visibleFields.includes('cost') && (
              <div className='form__field'>
                <label
                  htmlFor={`${step.id}-cost`}
                  className='form__label'
                >
                  {messages.cost.label}
                </label>

                <input
                  id={`${step.id}-cost`}
                  value={step.cost}
                  type="text"
                  className='form__input'
                  placeholder={messages.cost.placeholder}
                  onChange={(e) => onFieldChange(step.id, "cost", e.target.value)}
                />
              </div>
            )}

            {/* Duration */}
            {step.visibleFields.includes('duration') && (
              <div className='form__field'>
                <label
                  htmlFor={`${step.id}-duration`}
                  className='form__label'
                >
                  {messages.duration.label}
                </label>

                <input
                  id={`${step.id}-duration`}
                  value={step.duration}
                  type="text"
                  className='form__input'
                  placeholder={messages.duration.placeholder}
                  onChange={(e) => onFieldChange(step.id, "duration", e.target.value)}
                />
              </div>
            )}
          </div>
        )}

        {/* Short note */}
        {step.visibleFields.includes('shortNote') && (
          <div className='form__field'>
            <label
              htmlFor={`${step.id}-shortNote`}
              className='form__label'
            >
              {messages.shortNote.label}
            </label>

            <input
              id={`${step.id}-shortNote`}
              value={step.shortNote}
              type="text"
              className='form__input'
              placeholder={messages.shortNote.placeholder}
              onChange={(e) => onFieldChange(step.id, "shortNote", e.target.value)}
            />
          </div>
        )}

        {/* Note */}
        {step.visibleFields.includes('note') && (
          <div className='form__field'>
            <label
              htmlFor={`${step.id}-note`}
              className='form__label'
            >
              {messages.note.label}
            </label>

            <textarea
              id={`${step.id}-note`}
              value={step.note}
              className="form__description form__input"
              placeholder={messages.note.placeholder}
              onChange={(e) => onFieldChange(step.id, "note", e.target.value)}
            />
          </div>
        )}

        {/* Address */}
        {step.visibleFields.includes('address') && (
          <div className='form__field'>
            <label
              htmlFor={`${step.id}-address`}
              className='form__label'
            >
              {messages.address.label}
            </label>

            <input
              id={`${step.id}-address`}
              value={step.address}
              type="text"
              className='form__input'
              placeholder={messages.address.placeholder}
              onChange={(e) => onFieldChange(step.id, "address", e.target.value)}
            />
          </div>
        )}

        {/* Link */}
        {step.visibleFields.includes('link') && (
          <div className='form__field'>
          <label
            htmlFor={`${step.id}-link`}
            className='form__label'
          >
            {messages.link.label}
          </label>

          <input
            id={`${step.id}-link`}
            value={step.link}
            type="text"
            className='form__input'
            placeholder={messages.link.placeholder}
            onChange={(e) => onFieldChange(step.id, "link", e.target.value)}
          />
          </div>
        )}

        {/* Attachment */}
        {step.visibleFields.includes('attachments') && (
          <div className='form__field'>
            <label
              htmlFor=""
              className='form__label'
            >
              {messages.attachment.label}
            </label>

            <div className="form__input-group">
              <input
                type="file"
                className='form__input form__input--embedded'
              />

              <button
                type="button"
                className='form__step-delete'
                aria-label={messages.attachment.remove}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M0.708374 3.20837H2.37504M2.37504 3.20837H4.87504M2.37504 3.20837L3.20837 14.0417H11.5417L12.375 3.20837M4.87504 3.20837H9.87504M4.87504 3.20837V0.708374H9.87504V3.20837M9.87504 3.20837H12.375M12.375 3.20837H14.0417M5.70837 6.54171V10.7084M9.04171 6.54171V10.7084"
                    strokeWidth="1.41667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="currentColor"
                  />
                </svg>
              </button>
            </div>

            <button
              type="button"
              className='form__add-field-file'
            >
              + {messages.attachment.addMore}
            </button>
          </div>
        )}

        {/* Booking */}
        {step.visibleFields.includes('booking') && (
          <div className='form__field'>
            <label
              htmlFor={`${step.id}-booking`}
              className='form__label update-soon'
            >
              {messages.booking.label}
            </label>

            <input
              id={`${step.id}-booking`}
              value={step.booking}
              type="text"
              className='form__input update-soon'
              placeholder={messages.booking.placeholder}
              onChange={(e) => onFieldChange(step.id, "booking", e.target.value)}
            />
          </div>
        )}

        {/* Add fields to step */}
        <div className='form__field'>
          <p className='form__label'>{messages.additionalFields.title}</p>

          <div className='form__add-field-group'>
            {!step.visibleFields.includes('cost') && (
              <button
                type="button"
                className='form__add-field'
                onClick={() => onFieldAdd(step.id, "cost")}
              >
                + {messages.additionalFields.cost}
              </button>
            )}

            {!step.visibleFields.includes('duration') && (
              <button
                type="button"
                className='form__add-field'
                onClick={() => onFieldAdd(step.id, "duration")}
              >
                + {messages.additionalFields.duration}
              </button>
            )}

            {!step.visibleFields.includes('shortNote') && (
              <button
                type="button"
                className='form__add-field'
                onClick={() => onFieldAdd(step.id, "shortNote")}
              >
                + {messages.additionalFields.shortNote}
              </button>
            )}

            {!step.visibleFields.includes('note') && (
              <button
                type="button"
                className='form__add-field'
                onClick={() => onFieldAdd(step.id, "note")}
              >
                + {messages.additionalFields.note}
              </button>
            )}

            {!step.visibleFields.includes('address') && (
              <button
                type="button"
                className='form__add-field'
                onClick={() => onFieldAdd(step.id, "address")}
              >
                + {messages.additionalFields.address}
              </button>
            )}

            {!step.visibleFields.includes('link') && (
              <button
                type="button"
                className='form__add-field'
                onClick={() => onFieldAdd(step.id, "link")}
              >
                + {messages.additionalFields.link}
              </button>
            )}

            {!step.visibleFields.includes('attachments') && (
              <button
                type="button"
                className='form__add-field'
                onClick={() => onFieldAdd(step.id, "attachments")}
              >
                + {messages.additionalFields.attachment}
              </button>
            )}

            {!step.visibleFields.includes('booking') && (
              <button
                type="button"
                className='form__add-field update-soon'
                onClick={() => onFieldAdd(step.id, "booking")}
              >
                + {messages.additionalFields.booking}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Debug output */}
      {/* <pre>{JSON.stringify(step, null, 2)}</pre> */}
    </section>
  );
}

export default NewStep;
