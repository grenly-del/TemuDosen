import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { DataType } from '@/app/(students)';

interface ContactedContextType {
  contactedLecturers: DataType[];
  addContactedLecturer: (lecturer: DataType) => Promise<void>;
  removeContactedLecturer: (id: string) => Promise<void>;
  isContacted: (id: string) => boolean;
}

const ContactedContext = createContext<ContactedContextType | undefined>(undefined);

const STORAGE_KEY = '@contacted_lecturers';

export const ContactedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contactedLecturers, setContactedLecturers] = useState<DataType[]>([]);

  useEffect(() => {
    loadContactedLecturers();
  }, []);

  const loadContactedLecturers = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setContactedLecturers(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading contacted lecturers:', error);
    }
  };

  const saveContactedLecturers = async (lecturers: DataType[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lecturers));
      setContactedLecturers(lecturers);
    } catch (error) {
      console.error('Error saving contacted lecturers:', error);
    }
  };

  const addContactedLecturer = async (lecturer: DataType) => {
    const exists = contactedLecturers.some(l => l.id === lecturer.id);
    if (!exists) {
      const updated = [...contactedLecturers, lecturer];
      await saveContactedLecturers(updated);
    }
  };

  const removeContactedLecturer = async (id: string) => {
    const updated = contactedLecturers.filter(l => l.id !== id);
    await saveContactedLecturers(updated);
  };

  const isContacted = (id: string) => {
    return contactedLecturers.some(l => l.id === id);
  };

  return (
    <ContactedContext.Provider
      value={{
        contactedLecturers,
        addContactedLecturer,
        removeContactedLecturer,
        isContacted,
      }}
    >
      {children}
    </ContactedContext.Provider>
  );
};

export const useContacted = () => {
  const context = useContext(ContactedContext);
  if (!context) {
    throw new Error('useContacted must be used within ContactedProvider');
  }
  return context;
};

