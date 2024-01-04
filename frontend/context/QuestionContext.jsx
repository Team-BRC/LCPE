// context/QuestionContext.js
import { createContext, useContext } from 'react';

export const QuestionContext = createContext();

export function useQuestionContext() {
    const value = useContext(QuestionContext);
    return value
}
