import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@klearning_active_course';

interface CourseCtx {
  activeCourse: string | null;
  setActiveCourse: (key: string | null) => void;
}

const CourseContext = createContext<CourseCtx>({
  activeCourse: null,
  setActiveCourse: () => {},
});

export function CourseProvider({ children }: { children: ReactNode }) {
  const [activeCourse, setActiveCourseState] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(v => {
      if (v) setActiveCourseState(v);
    });
  }, []);

  function setActiveCourse(key: string | null) {
    setActiveCourseState(key);
    if (key) AsyncStorage.setItem(STORAGE_KEY, key);
    else AsyncStorage.removeItem(STORAGE_KEY);
  }

  return (
    <CourseContext.Provider value={{ activeCourse, setActiveCourse }}>
      {children}
    </CourseContext.Provider>
  );
}

export const useCourse = () => useContext(CourseContext);
