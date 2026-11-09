import { TabType, Language } from '../types';
import { STATS_DATA, RECENT_MATCH_LOGS } from '../data/mockData';
import { getTranslation } from '../data/translations';
import { 
  Users, 
  UserCheck, 
  Briefcase, 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  TrendingUp, 
  Building, 
  Clock, 
  Sparkles,
  Search,
  Hammer,
  Truck,
  Factory,
  Wheat,
  Coffee
} from 'lucide-react';

interface DashboardTabProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenCounsel: () => void;
  language?: Language;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({ 
  onNavigateTab, 
  onOpenCounsel,
  language = 'ko' 
}) => {
  const t = (key: string) => getTranslation(language, key);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0B1528] rounded-3xl text-white shadow-xl border border-slate-800">
        {/* Background Image with Measured Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_workforce_banner_1794127180069.jpg"
            alt="스마트 제조 및 물류 산업 현장 인력"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-[#0B1A30]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl px-6 sm:px-10 py-10 sm:py-16">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-sky-400 font-bold mb-2">
            <span>{t('hero.badge')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-3xl" style={{ textWrap: 'balance' }}>
            {t('hero.title1')}<span className="text-sky-400">{t('hero.titleHighlight')}</span>{t('hero.title2')}
          </h1>

          <p className="mt-3 text-sm text-slate-300 max-w-xl">
            {t('hero.sub')}
          </p>

          {/* Quick Search / Direct Filter Bar */}
          <div className="mt-6 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 max-w-2xl shadow-lg">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-300 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder={t('hero.placeholder')}
                  className="w-full pl-10 pr-4 py-2.5 bg-white text-slate-900 placeholder-slate-400 text-xs sm:text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-inner"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onNavigateTab('choice');
                  }}
                />
              </div>
              <button
                onClick={() => onNavigateTab('choice')}
                className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer border border-orange-400/30"
              >
                <span>{t('hero.choiceBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Key Assurance Indicators - Minimal 1-liner */}
          <div className="mt-5 flex flex-wrap items-center gap-y-1.5 gap-x-5 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              {t('hero.assurance1')}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              {t('hero.assurance2')}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              {t('hero.assurance3')}
            </span>
          </div>
        </div>
      </section>

      {/* Industry Categories Strip (직종별 빠른 찾기) - Moved directly below Hero as requested */}
      <section className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-3">
          {t('cat.title')}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {[
            { key: 'cat.mfg', icon: Factory },
            { key: 'cat.const', icon: Hammer },
            { key: 'cat.logistics', icon: Truck },
            { key: 'cat.agri', icon: Wheat },
            { key: 'cat.service', icon: Coffee },
            { key: 'cat.general', icon: UserCheck },
          ].map((cat, i) => {
            const IconComp = cat.icon;
            return (
              <button
                key={i}
                onClick={() => onNavigateTab('choice')}
                className="p-3.5 bg-white hover:bg-blue-50/60 border border-slate-200 hover:border-blue-400 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group shadow-2xs hover:shadow-xs active:bg-blue-100"
              >
                <IconComp className="w-6 h-6 text-slate-700 group-hover:text-blue-600 transition-colors" />
                <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-700">
                  {t(cat.key)}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Real-time Statistics Section */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span>{t('stat.title')}</span>
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{t('stat.live')}</span>
          </div>
        </div>

        {/* 4 Metric Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3.5 bg-blue-50/40 border border-blue-100/70 rounded-xl">
            <span className="text-xs text-blue-900/70 font-semibold block">{t('stat.todayMatches')}</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-blue-700 font-mono tabular-nums">
                {STATS_DATA.todayMatches}
              </span>
              <span className="text-xs font-semibold text-slate-600">{t('stat.completed')}</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
            <span className="text-xs text-slate-500 font-medium block">{t('stat.foreignWaiting')}</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-slate-900 font-mono tabular-nums">
                {STATS_DATA.newForeignWorkers}
              </span>
              <span className="text-xs font-semibold text-slate-600">{t('stat.peopleWaiting')}</span>
            </div>
          </div>

          <div className="p-3.5 bg-orange-50/40 border border-orange-100/70 rounded-xl">
            <span className="text-xs text-orange-950/70 font-semibold block">{t('stat.avgTime')}</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-orange-600 font-mono tabular-nums">
                {STATS_DATA.avgMatchTimeMinutes}
              </span>
              <span className="text-xs font-semibold text-slate-600">{t('stat.minutes')}</span>
            </div>
          </div>

          <div className="p-3.5 bg-emerald-50/40 border border-emerald-100/70 rounded-xl">
            <span className="text-xs text-emerald-950/70 font-semibold block">{t('stat.emergencyRate')}</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-emerald-600 font-mono tabular-nums">
                {STATS_DATA.quickMatchRate}%
              </span>
            </div>
          </div>
        </div>

        {/* Live Matching Ticker */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {RECENT_MATCH_LOGS.slice(0, 3).map((log, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg text-xs border border-slate-100">
                <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">{log.time}</span>
                <span className="text-blue-600 font-bold">[{log.region}]</span>
                <span className="text-slate-700 font-medium truncate">{log.title}</span>
                <span className="text-emerald-600 text-[11px] font-bold ml-auto shrink-0">{t('stat.matchDone')}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Core Services Action Banners - Minimal, Punchy, Zero Slop */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            {t('service.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Service 1: 외국인 근로자 전용 매칭 */}
          <div className="bg-white border border-slate-200 hover:border-blue-500 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-xs text-blue-600 font-semibold mb-1">
                {t('service.s1Badge')}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {t('service.s1Title')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                {t('service.s1Desc')}
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('foreign')}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>{t('service.s1Btn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Service 2: 일용직 및 장기 초이스(Choice) 매칭 */}
          <div className="bg-white border-2 border-orange-500 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all flex flex-col justify-between ring-1 ring-orange-500/10">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center shadow-xs">
                  <UserCheck className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 text-[11px] font-bold text-orange-700 bg-orange-50 border border-orange-200 rounded">
                  {t('service.s2Direct')}
                </span>
              </div>
              <div className="text-xs text-orange-600 font-semibold mb-1">
                {t('service.s2Badge')}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {t('service.s2Title')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                {t('service.s2Desc')}
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('choice')}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black text-xs rounded-xl shadow-md border border-orange-400/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{t('service.s2Btn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Service 3: 일반 구인구직 */}
          <div className="bg-white border border-slate-200 hover:border-slate-400 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-500 font-semibold mb-1">
                {t('service.s3Badge')}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {t('service.s3Title')}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                {t('service.s3Desc')}
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('jobs')}
              className="w-full py-2.5 px-4 bg-[#0B1528] hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>{t('service.s3Btn')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Emergency Banner - Minimal & Punchy */}
      <section className="bg-[#0B1528] rounded-2xl p-5 sm:p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl border border-slate-800">
        <div>
          <h4 className="text-base sm:text-lg font-bold text-white">
            {t('banner.title')}
          </h4>
          <p className="text-xs text-slate-300 mt-0.5">
            {t('banner.desc')}
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto">
          <button
            onClick={onOpenCounsel}
            className="flex-1 sm:flex-initial px-5 py-2.5 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-black rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-md border border-orange-400/30"
          >
            {t('banner.btn')}
          </button>
          <a
            href="tel:1234-1234"
            className="flex-1 sm:flex-initial px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition-all text-center cursor-pointer whitespace-nowrap"
          >
            1234-1234
          </a>
        </div>
      </section>
    </div>
  );
};
