import { useState } from 'react';

import NewStep from './NewStep';

import { useAppDispatch } from '../store/hooks';
import { dayAdded } from '../store/tripSlice';

import type {
  TripDay,
  DayDraft,
  StepDraft,
  StepTextField,
  StepOptionalField,
} from '../types/trip';

import useMessages from '../locales/useMessages';

const initialForm: DayDraft = {
  name: '',
  date: '',
  steps: [
    {
      id: crypto.randomUUID(),
      name: '',
      icon: null,
      startTime: '',
      endTime: '',
      description: '',
      cost: '',
      duration: '',
      shortNote: '',
      note: '',
      address: '',
      link: '',
      booking: '',
      attachments: [],
      visibleFields: []
    }
  ]
};

type NewDayProps = {
  onCancel: () => void;
  onSave: () => void;
};

function NewDay({ onCancel, onSave }: NewDayProps) {
  const { newDay: messages } = useMessages();
  
  const dispatch = useAppDispatch();
  const [state, setState] = useState(initialForm);

  const handleDayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState((prev) => ({ ...prev, name: value }));
  };

  const handleDayDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState((prev) => ({ ...prev, date: value }));
  };

  const handleStepFieldChange = ( stepId: string, field: StepTextField,  value: string ) => {
    setState((prev) => ({ ...prev, steps: prev.steps.map((step) => step.id === stepId ? { ...step, [field]: value } : step) }));
  };

  const handleStepFieldAdd = ( stepId: string, field: StepOptionalField ) => {
    setState((prev) => ({ ...prev, steps: prev.steps.map((step) => step.id === stepId ? { ...step, visibleFields: step.visibleFields.includes(field)
        ? step.visibleFields
        : [...step.visibleFields, field]}
      : step) }));
  };

  const handleStepAdd = () => {
    const newStep: StepDraft = {
      id: crypto.randomUUID(),
      name: '',
      icon: null,
      startTime: '',
      endTime: '',
      description: '',
      cost: '',
      duration: '',
      shortNote: '',
      note: '',
      address: '',
      link: '',
      booking: '',
      attachments: [],
      visibleFields: []
    };

    setState((prev) => ({ ...prev, steps: [...prev.steps, newStep]}));
  };

  const handleDeleteStep = ( stepId: string ) => {
    setState((prev) => ({ ...prev, steps: prev.steps.filter((st) => st.id !== stepId) }));
  };

  const handleSaveDay = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const savedSteps = state.steps.map (step => {
      const { visibleFields, attachments, ...savedStep } = step;
      return savedStep;
    });

    const newDay: TripDay = {
      id: crypto.randomUUID(),
      name: state.name.trim(),
      date: state.date,
      steps: savedSteps
    };

    dispatch(dayAdded(newDay));
    onSave();
  };

  return (
    <form className="form" onSubmit={handleSaveDay}>
      <div className='form__intro'>
        <div className="form__heading">
          <span className="trip__day-number">
            <span className="trip__day-number-text">1</span>
          </span>
          <h3 className="form__title">{messages.title}</h3>
        </div>
        <p className='text-secondary'>{messages.description}</p>
      </div>

      <div className='form__group'>
        <div className='form__field'>
          <label htmlFor="" className='form__label'>{messages.name.label} *</label>
          <input
            type="text"
            placeholder={messages.name.placeholder}
            value={state.name}            
            onChange={handleDayNameChange}
            required
          />
        </div>
        
        <div  className='form__field'>
          <label htmlFor="" className='form__label'>{messages.date.label}</label>
          <input
            type="date"
            className={`form__input ${state.date === '' ? 'form__input--empty' : ''} form__field--date` }
            value={state.date}
            onChange={handleDayDateChange}
          />
        </div>

        {state.steps.map((step, index) => (
          <NewStep key={step.id} step={step} stepNumber={index + 1} onStepDelete={handleDeleteStep} onFieldChange={handleStepFieldChange} onFieldAdd={handleStepFieldAdd}/>
        ))}
        
        {/* Step button */}
        <button
          type="button"
          className='form__add-step'
          onClick={handleStepAdd}
        >
          + {messages.addStep}
        </button>

        {/* Day buttons */}
        <div className='row'>
          <button
            type="submit"
            className='btn-primary'
          >{messages.submit}</button>
          <button
            type="button"
            onClick={onCancel}
          >
            {messages.cancel}
          </button>
        </div>
      </div>
    </form>
  )
};

export default NewDay;
