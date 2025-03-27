import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';


export type Language = 'ru' | 'en';


interface Translations {
  manifesto: {
    text: string;
  };
  about: {
    text: string;
  };
  name: {
    primary: string;
    alternate: string;
    nickname: string;
  };
}


const translations: Record<Language, Translations> = {
  ru: {
    manifesto: {
      text: 'Мы живем в эпоху, где алгоритмы знают о нас больше, чем мы сами. Поэтому я верю, что разработчик — это не техник, а архитектор человеческого опыта. Каждая строка кода для меня — вопрос ответственности: не манипулирует ли этот дизайн? Не превращает ли пользователя в ресурс? Я стремлюсь к сайтам, которые уважают время, внимание и свободу выбора. Даже в мелочах: ленивая загрузка — это не оптимизация, а бережливость к чужому времени.'
    },
    about: {
      text: 'Приветствую. Меня зовут Владислав, и я создаю сайты — но не как цифровые конструкции, а как пространства, где встречаются человеческие мысли, эмоции и технологии. Для меня веб-разработка — это не просто написание строк кода или следование трендам. Это попытка ответить на вопрос: как цифровое может стать продолжением человеческого?'
    },
    name: {
      primary: 'Владислав',
      alternate: 'Vladislav',
      nickname: 'awwwdde'
    }
  },
  en: {
    manifesto: {
      text: 'We live in an era where algorithms know more about us than we do ourselves. This is why I believe a developer is not a technician, but an architect of human experience. Every line of code is a question of responsibility: does this design manipulate? Does it turn users into resources? I aim for websites that respect time, attention, and freedom of choice. Even in small details: lazy loading is not optimization, but respect for someone else\'s time.'
    },
    about: {
      text: 'Greetings. My name is Vladislav, and I create websites — not as digital constructions, but as spaces where human thoughts, emotions, and technologies meet. For me, web development is not just writing lines of code or following trends. It\'s an attempt to answer the question: how can the digital become an extension of the human?'
    },
    name: {
      primary: 'Vladislav',
      alternate: 'Владислав',
      nickname: 'awwwdde'
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