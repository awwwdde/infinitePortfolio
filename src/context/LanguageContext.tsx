import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';


export type Language = 'ru' | 'en';


interface Translations {
  manifesto: {
    text: string;
  };
}


const translations: Record<Language, Translations> = {
  ru: {
    manifesto: {
      text: 'Мы живем в эпоху, где алгоритмы знают о нас больше, чем мы сами. Поэтому я верю, что разработчик — это не техник, а архитектор человеческого опыта. Каждая строка кода для меня — вопрос ответственности: не манипулирует ли этот дизайн? Не превращает ли пользователя в ресурс? Я стремлюсь к сайтам, которые уважают время, внимание и свободу выбора. Даже в мелочах: ленивая загрузка — это не оптимизация, а бережливость к чужому времени.'
    }
  },
  en: {
    manifesto: {
      text: 'We live in an era where algorithms know more about us than we do ourselves. This is why I believe a developer is not a technician, but an architect of human experience. Every line of code is a question of responsibility: does this design manipulate? Does it turn users into resources? I aim for websites that respect time, attention, and freedom of choice. Even in small details: lazy loading is not optimization, but respect for someone else\'s time.'
    }
  }
};


interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'ru',
  setLanguage: () => {},
  t: () => ''
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {

  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'en' || savedLanguage === 'ru') ? savedLanguage : 'ru';
  });


  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key; 
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};


export const useLanguage = () => useContext(LanguageContext);