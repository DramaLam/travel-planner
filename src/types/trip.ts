export type StepDraft = {
  id: string;
  name: string;
  icon: string | null;
  startTime: string;
  endTime: string;
  description: string;
  cost: string;
  duration: string;
  shortNote: string;
  note: string;
  address: string;
  link: string;
  booking: string;
  attachments: File[];
  visibleFields: string[];
};

export type DayDraft = {
  name: string;
  date: string;
  steps: StepDraft[];
};

export type StepTextField =
  | 'name'
  | 'startTime'
  | 'endTime'
  | 'description'
  | 'cost'
  | 'duration'
  | 'shortNote'
  | 'note'
  | 'address'
  | 'link'
  | 'booking';

export type StepOptionalField =
  | 'cost'
  | 'duration'
  | 'shortNote'
  | 'note'
  | 'address'
  | 'link'
  | 'attachments'
  | 'booking';

export type TripStep = Omit<StepDraft, 'visibleFields' | 'attachments'>;

export type TripDay = {
  id: string;
  name: string;
  date: string;
  steps: TripStep[];
};
