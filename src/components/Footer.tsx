import React from 'react';
import { ShieldCheck, PhoneCall } from 'lucide-react';
import { TabType, Language } from '../types';
import { getTranslation } from '../data/translations';

interface FooterProps {
  onSelectTab: (tab: TabType) => void;
  onOpenCounsel: () => void;
  language?: Language;
}

export const Footer: React.FC<FooterProps> = ({ language = 'ko' }) => {
  const t = (key: string) => getTranslation(language, key);

  return (
    <footer className="bg-[#0B1528] text-slate-400 border-t border-slate-800/90 text-xs py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          {/* Brand & Essential Contact Details */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-[11px] sm:text-xs">
            <span className="font-black text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              {t('footer.brand')}
            </span>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a href="tel:1234-1234" className="text-orange-400 font-extrabold hover:text-orange-300 flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
              1234-1234
            </a>
            <span className="text-slate-700 hidden sm:inline">·</span>
            <span className="text-slate-300">twomong3@naver.com</span>
            <span className="text-slate-700 hidden sm:inline">·</span>
            <span className="text-slate-300">{t('footer.address')}</span>
          </div>

          {/* Copyright & Policy */}
          <div className="flex items-center gap-2.5 text-[11px] text-slate-500">
            <span>© 2026 MatchingOn</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">{t('footer.terms')}</span>
            <span>·</span>
            <span className="hover:text-slate-300 cursor-pointer">{t('footer.privacy')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

