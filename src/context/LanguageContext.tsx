import React, { createContext, useContext, useState } from 'react';
import { Language } from '../types';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

export const translations: Translations = {
  navHome: {
    en: 'Home',
    hi: 'होम',
    mr: 'मुख्य',
    gu: 'હોમ',
    es: 'Inicio',
    fr: 'Accueil'
  },
  navAbout: {
    en: 'About',
    hi: 'हमारे बारे में',
    mr: 'आमच्याबद्दल',
    gu: 'અમારા વિશે',
    es: 'Nosotros',
    fr: 'À propos'
  },
  navServices: {
    en: 'Services',
    hi: 'सेवाएं',
    mr: 'सेवा',
    gu: 'સેવાઓ',
    es: 'Servicios',
    fr: 'Services'
  },
  navDemos: {
    en: 'AI Demos',
    hi: 'एआई डेमो',
    mr: 'एआय डेमो',
    gu: 'એઆઈ ડેમો',
    es: 'Demos IA',
    fr: 'Démos IA'
  },
  navProjects: {
    en: 'Projects',
    hi: 'प्रोजेक्ट्स',
    mr: 'प्रकल्प',
    gu: 'પ્રોજેક્ટ્સ',
    es: 'Proyectos',
    fr: 'Projets'
  },
  navPricing: {
    en: 'Pricing',
    hi: 'मूल्य निर्धारण',
    mr: 'किंमत',
    gu: 'કિંમત',
    es: 'Precios',
    fr: 'Tarifs'
  },
  navTestimonials: {
    en: 'Testimonials',
    hi: 'प्रशंसापत्र',
    mr: 'प्रशंसापत्रे',
    gu: 'પ્રશંસાપત્રો',
    es: 'Testimonios',
    fr: 'Témoignages'
  },
  navBlog: {
    en: 'Blog',
    hi: 'ब्लॉग',
    mr: 'ब्लॉग',
    gu: 'બ્લોગ',
    es: 'Blog',
    fr: 'Blog'
  },
  navCareers: {
    en: 'Careers',
    hi: 'करियर',
    mr: 'करिअर',
    gu: 'કારકિર્દી',
    es: 'Carreras',
    fr: 'Carrières'
  },
  navContact: {
    en: 'Contact',
    hi: 'संपर्क',
    mr: 'संपर्क',
    gu: 'સંપર્ક',
    es: 'Contacto',
    fr: 'Contact'
  },
  btnLogin: {
    en: 'Login',
    hi: 'लॉग इन',
    mr: 'लॉगिन',
    gu: 'લૉગિન',
    es: 'Iniciar sesión',
    fr: 'Connexion'
  },
  btnGetStarted: {
    en: 'Get Started',
    hi: 'शुरू करें',
    mr: 'शुरू करा',
    gu: 'શરૂ કરો',
    es: 'Empezar',
    fr: 'Commencer'
  },
  heroTitle: {
    en: 'Transform Your Business with Artificial Intelligence',
    hi: 'कृत्रिम बुद्धिमत्ता के साथ अपने व्यवसाय को रूपांतरित करें',
    mr: 'कृत्रिम बुद्धिमत्तेसह तुमचा व्यवसाय बदलून टाका',
    gu: 'કૃત્રિમ બુદ્ધિમત્તા સાથે તમારા વ્યવસાયને બદલો',
    es: 'Transforma tu negocio con Inteligencia Artificial',
    fr: 'Transformez votre entreprise grâce à l\'Intelligence Artificielle'
  },
  heroSubtitle: {
    en: 'Build smarter websites, AI chatbots, automation systems, intelligent applications, and next-generation digital experiences.',
    hi: 'स्मार्ट वेबसाइट, एआई चैटबॉट, ऑटोमेशन सिस्टम और अगली पीढ़ी के डिजिटल अनुभव बनाएं।',
    mr: 'स्मार्ट वेबसाइट्स, एआय चॅटबॉट्स, ऑटोमेशन सिस्टीम आणि पुढील पिढीचे डिजिटल अनुभव तयार करा.',
    gu: 'સ્માર્ટ વેબસાઇટ્સ, એઆઈ ચેટબોટ્સ, ઓટોમેશન સિસ્ટમ્સ અને નેક્સ્ટ જનરેશન ડિજિટલ અનુભવો બનાવો.',
    es: 'Crea sitios web más inteligentes, chatbots de IA, sistemas de automatización y experiencias digitales de última generación.',
    fr: 'Créez des sites Web plus intelligents, des chatbots IA, des systèmes d\'automatisation et des expériences numériques de nouvelle génération.'
  },
  btnBookConsultation: {
    en: 'Book Free Consultation',
    hi: 'निःशुल्क परामर्श बुक करें',
    mr: 'विनामूल्य सल्लामसलत बुक करा',
    gu: 'મફત પરામર્શ બુક કરો',
    es: 'Reservar Consulta Gratis',
    fr: 'Réserver une consultation gratuite'
  },
  statsProjects: {
    en: 'Projects Delivered',
    hi: 'प्रोजेक्ट्स डिलीवर किए गए',
    mr: 'पूर्ण झालेले प्रकल्प',
    gu: 'ડિલિવર કરાયેલા પ્રોજેક્ટ્સ',
    es: 'Proyectos Entregados',
    fr: 'Projets Livrés'
  },
  statsClients: {
    en: 'Global Clients',
    hi: 'वैश्विक ग्राहक',
    mr: 'जागतिक ग्राहक',
    gu: 'વૈશ્વિક ગ્રાહકો',
    es: 'Clientes Globales',
    fr: 'Clients Mondiaux'
  },
  statsSatisfaction: {
    en: 'Client Satisfaction',
    hi: 'ग्राहक संतुष्टि',
    mr: 'ग्राहक समाधान',
    gu: 'ગ્રાહક સંતોષ',
    es: 'Satisfacción del Cliente',
    fr: 'Satisfaction Client'
  },
  statsCountries: {
    en: 'Countries Served',
    hi: 'देशों में सेवाएं',
    mr: 'सेवा दिलेले देश',
    gu: 'સેવા આપેલા દેશો',
    es: 'Países Atendidos',
    fr: 'Pays Desservis'
  },
  statsUptime: {
    en: 'Uptime SLA',
    hi: 'अपटाइम एसएलए',
    mr: 'अपटाइम एसएलए',
    gu: 'અપટાઇમ SLA',
    es: 'Garantía de Tiempo de Actividad',
    fr: 'Garantie de Disponibilité'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return translations[key]?.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
