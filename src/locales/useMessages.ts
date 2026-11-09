import { useAppSelector } from '../store/hooks'

import en from './en.json';
import ru from './ru.json';

const dictionaries = { ru, en };

const useMessages = () => {
  const language = useAppSelector((state) => state.settings.language);

  return dictionaries[language];
};

export default useMessages;
