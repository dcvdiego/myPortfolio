import { createContext, useContext } from 'react';

export type TestimonialsContent = {
  activeWord: string;
  setActiveWord: (c: string) => void;
};
export const MyTestimonialContext = createContext<TestimonialsContent>({
  activeWord: 'test', // set a default value
  setActiveWord: () => {}
});
export const useTestimonialContext = () => useContext(MyTestimonialContext);
