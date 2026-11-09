import React, { useState } from 'react';
import { TabType, Language, UserProfile } from '../types';
import { PhoneCall, Globe, Menu, X, ShieldCheck, User, HardHat, Building2 } from 'lucide-react';
import { getTranslation } from '../data/translations';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onOpenQuickCounsel: () => void;
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
  onOpenProfileDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  language,
  onToggleLanguage,
  onOpenQuickCounsel,
  currentUser,
  onOpenAuthModal,
  onOpenProfileDrawer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const t = (key: string) => getTranslation(language, key);

  const navLinks: { id: TabType; label: string }[] = [
    { id: 'dashboard', label: t('nav.home') },
    { id: 'foreign', label: t('nav.foreign') },
    { id: 'choice', label: t('nav.choice') },
    { id: 'jobs', label: t('nav.jobs') },
  ];

  const handleTabClick = (tab: TabType) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B1528]/95 backdrop-blur-md border-t-2 border-orange-500 border-b border-slate-800/90 shadow-md">
      {/* Top Bar strictly follows the 3-zone contract: Brand — 4 Nav Links — 1 Primary Action */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-6 h-14 sm:h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleTabClick('dashboard')}
            className="flex items-center gap-2 text-left focus:outline-none group cursor-pointer shrink-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 border border-blue-400/30 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105 shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <span className="text-base sm:text-xl font-black tracking-tight text-white whitespace-nowrap">
                매칭온 <span className="hidden sm:inline text-blue-400 font-bold text-sm sm:text-base">MatchingOn</span>
              </span>
            </div>
          </button>

          {/* Zone 2: Concise single-line text navigation links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
            {navLinks.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`relative py-1 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-white font-extrabold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-[-19px] left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-sky-400 to-orange-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action + Utility items */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Language Selector (Desktop only) */}
            <div className="hidden xl:flex items-center text-xs text-slate-300 border border-slate-700/80 rounded-lg p-1 bg-white/5 backdrop-blur-xs">
              <Globe className="w-3.5 h-3.5 mr-1 text-slate-400" />
              <button
                onClick={() => onToggleLanguage('ko')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                  language === 'ko' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                KO
              </button>
              <button
                onClick={() => onToggleLanguage('en')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                  language === 'en' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onToggleLanguage('vi')}
                className={`px-1.5 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                  language === 'vi' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                VN
              </button>
            </div>

            {/* User Auth Button / Profile Badge */}
            {currentUser ? (
              <button
                onClick={onOpenProfileDrawer}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer border ${
                  currentUser.role === 'jobseeker'
                    ? 'bg-orange-950/70 border-orange-500/50 text-orange-200 hover:bg-orange-900/80'
                    : 'bg-blue-950/70 border-blue-500/50 text-blue-200 hover:bg-blue-900/80'
                }`}
              >
                {currentUser.role === 'jobseeker' ? (
                  <HardHat className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                ) : (
                  <Building2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                )}
                <span className="max-w-[70px] sm:max-w-[120px] truncate text-white">
                  {currentUser.name}
                </span>
                <span className={`w-1.5 h-1.5 rounded-full ${currentUser.role === 'jobseeker' && currentUser.isAvailable ? 'bg-emerald-400' : 'bg-blue-400'}`} />
              </button>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/15 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap backdrop-blur-xs"
              >
                <User className="w-3.5 h-3.5 text-slate-300" />
                <span className="hidden sm:inline">{t('nav.login')}</span>
                <span className="sm:hidden">{t('nav.loginShort')}</span>
              </button>
            )}

            {/* Primary Action Button (긴급 상담) */}
            <button
              onClick={onOpenQuickCounsel}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-black text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 active:scale-95 rounded-lg shadow-md shadow-orange-950/40 border border-orange-400/30 transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">{t('nav.counsel')}</span>
              <span className="sm:hidden">{t('nav.counselShort')}</span>
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-300 hover:text-white focus:outline-none cursor-pointer rounded-lg hover:bg-white/10 transition-colors"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0B1528] px-4 pt-3 pb-5 space-y-2.5 shadow-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs text-slate-400 font-medium">{t('nav.selectLang')}</span>
            <div className="flex gap-1 text-xs">
              <button
                onClick={() => onToggleLanguage('ko')}
                className={`px-2 py-1 rounded text-xs font-bold ${language === 'ko' ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-300'}`}
              >
                한국어
              </button>
              <button
                onClick={() => onToggleLanguage('en')}
                className={`px-2 py-1 rounded text-xs font-bold ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-300'}`}
              >
                English
              </button>
              <button
                onClick={() => onToggleLanguage('vi')}
                className={`px-2 py-1 rounded text-xs font-bold ${language === 'vi' ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-300'}`}
              >
                Tiếng Việt
              </button>
            </div>
          </div>

          {navLinks.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600/20 text-white border-l-3 border-orange-500 font-bold'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* User Auth in Mobile Drawer */}
          <div className="pt-1 pb-1">
            {currentUser ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProfileDrawer();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-bold cursor-pointer ${
                  currentUser.role === 'jobseeker'
                    ? 'bg-orange-950/60 border-orange-500/40 text-orange-200'
                    : 'bg-blue-950/60 border-blue-500/40 text-blue-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {currentUser.role === 'jobseeker' ? (
                    <HardHat className="w-4 h-4 text-orange-400" />
                  ) : (
                    <Building2 className="w-4 h-4 text-blue-400" />
                  )}
                  <span className="text-white">{currentUser.name} ({currentUser.role === 'jobseeker' ? t('nav.jobseeker') : t('nav.employer')})</span>
                </div>
                <span className="text-[11px] text-blue-400 underline">{t('nav.mypage')} &gt;</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/10 hover:bg-white/15 text-white border border-white/15 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                <User className="w-4 h-4 text-slate-300" />
                <span>{t('nav.login')}</span>
              </button>
            )}
          </div>

          <div className="pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuickCounsel();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-black text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 rounded-xl shadow-md border border-orange-400/30"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>{t('nav.counselPhone')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
