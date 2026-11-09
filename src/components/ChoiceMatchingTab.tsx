import React, { useState } from 'react';
import { ChoiceWorker, Language } from '../types';
import { CHOICE_WORKERS_DATA } from '../data/mockData';
import { RegionSelector, SelectedRegion } from './RegionSelector';
import { getTranslation } from '../data/translations';
import { 
  UserCheck, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Calendar, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  PhoneCall, 
  Zap, 
  Award,
  ChevronRight
} from 'lucide-react';

interface ChoiceMatchingTabProps {
  onSelectChoice: (worker: ChoiceWorker) => void;
  onOpenCounsel: () => void;
  language?: Language;
}

export const ChoiceMatchingTab: React.FC<ChoiceMatchingTabProps> = ({
  onSelectChoice,
  onOpenCounsel,
  language = 'ko',
}) => {
  const t = (key: string) => getTranslation(language, key);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<SelectedRegion>({ province: '전국', county: '전체' });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'experience' | 'rate'>('recommended');

  const categories = [
    { id: 'all', label: '전체 특기' },
    { id: '목수', label: '🔨 형틀·목수' },
    { id: '용접', label: '🔥 용접·배관' },
    { id: '철근', label: '🏗️ 철근·골조' },
    { id: '단순노무', label: '📦 단순노무' },
    { id: '지게차', label: '🚜 지게차' },
    { id: '타일/미장', label: '🧱 타일·미장' },
    { id: '전기/배관', label: '⚡ 전기·설비' },
    { id: '조경/석공', label: '🌳 조경·석공' },
  ];

  // Filtering with Regional / County precision
  const filteredWorkers = CHOICE_WORKERS_DATA.filter((worker) => {
    // 1. Regional filter (시·도 및 군단위)
    if (selectedRegion.province !== '전국') {
      const provShort = selectedRegion.province.slice(0, 2);
      const matchProv = worker.location.includes(selectedRegion.province) || worker.location.includes(provShort);
      if (!matchProv) return false;

      if (selectedRegion.county !== '전체') {
        const matchCounty = worker.location.includes(selectedRegion.county);
        if (!matchCounty) return false;
      }
    }

    // 2. Work type
    if (selectedType !== 'all') {
      if (selectedType === '당일일용' && worker.workType !== '당일일용') return false;
      if (selectedType === '장기' && (worker.workType === '당일일용')) return false;
    }

    // 3. Category
    if (selectedCategory !== 'all' && worker.category !== selectedCategory) return false;

    // 4. Keyword
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = worker.name.toLowerCase().includes(q);
      const matchLoc = worker.location.toLowerCase().includes(q);
      const matchSkill = worker.skills.some((s) => s.toLowerCase().includes(q)) || worker.headline.toLowerCase().includes(q);
      if (!matchName && !matchLoc && !matchSkill) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
    if (sortBy === 'rate') return a.dailyRate - b.dailyRate;
    return b.completedJobs - a.completedJobs;
  });

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-slate-900 rounded-2xl text-white shadow-lg">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/banner_choice_workers_1794127179976.jpg"
            alt="건설 및 산업 현장 기술자"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/85 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl px-6 sm:px-10 py-8 sm:py-12">
          <div className="flex items-center gap-2 text-xs text-orange-400 font-semibold mb-1.5">
            <span>실시간 다이렉트 매칭</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            {t('choice.title')}
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-xl">
            {t('choice.sub')}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-y-1.5 gap-x-5 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-orange-400 shrink-0" />
              1초 SMS 매칭
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              안전교육 이수증 확인
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              당일 현장 긴급 출동
            </span>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
          {/* Segmented work-type control - Grid on mobile, inline flex on desktop */}
          <div className="grid grid-cols-3 sm:flex items-center gap-1 p-1 bg-slate-200/80 rounded-xl w-full sm:w-fit">
            <button
              onClick={() => setSelectedType('all')}
              className={`py-2 px-2 sm:px-4 text-xs font-bold rounded-lg transition-colors cursor-pointer text-center ${
                selectedType === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              전체 인력
            </button>
            <button
              onClick={() => setSelectedType('당일일용')}
              className={`py-2 px-2 sm:px-4 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                selectedType === '당일일용'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>당일 일용</span>
            </button>
            <button
              onClick={() => setSelectedType('장기')}
              className={`py-2 px-2 sm:px-4 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                selectedType === '장기'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>단기·장기</span>
            </button>
          </div>

          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 sm:top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="이름, 지역, 기술 검색..."
                className="w-full pl-9 pr-3 py-2 sm:py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white h-10 sm:h-auto"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="w-full sm:w-auto px-3 py-2 text-xs font-bold border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-slate-700 h-10 sm:h-auto cursor-pointer"
            >
              <option value="recommended">추천순 (완료 많은순)</option>
              <option value="rating">평점 높은순</option>
              <option value="experience">경력 많은순</option>
              <option value="rate">일당 낮은순</option>
            </select>
          </div>
        </div>

        {/* Solid Industrial Region & County Selector */}
        <RegionSelector
          selectedRegion={selectedRegion}
          onChangeRegion={setSelectedRegion}
          resultCount={filteredWorkers.length}
          label={t('region.label')}
          language={language}
        />

        {/* Category Pill Buttons - Smooth horizontal thumb scroll on mobile */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1 sm:mx-0 sm:px-0 sm:flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer whitespace-nowrap shrink-0 min-h-[34px] sm:min-h-0 flex items-center justify-center ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 active:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid: 바둑판 배열 인적사항 및 특기 프로필 카드 */}
      <section className="space-y-4">
        <div className="text-xs text-slate-500">
          <span>등록 인력: <strong className="text-slate-900 tabular-nums">{filteredWorkers.length}명</strong></span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWorkers.map((worker) => (
            <div
              key={worker.id}
              className="bg-white border-2 border-slate-200 hover:border-orange-500 rounded-2xl p-5 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Status and Top Badge */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-emerald-700">
                      {worker.status}
                    </span>
                    <span className="text-xs text-slate-300">|</span>
                    <span className="text-xs text-slate-500 font-medium">
                      {worker.workType}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="tabular-nums">{worker.rating}</span>
                  </div>
                </div>

                {/* Worker Identity */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 text-white font-bold text-base flex items-center justify-center shrink-0 shadow-xs">
                    {worker.name[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                      <span>{worker.name}</span>
                      <span className="text-xs font-normal text-slate-500">
                        ({worker.age}세, {worker.gender})
                      </span>
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-blue-700 font-semibold mt-0.5">
                      <span>{worker.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>경력 {worker.experienceYears}년차</span>
                    </div>
                  </div>
                </div>

                {/* Headline quotation */}
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 leading-snug mb-3">
                  &ldquo;{worker.headline}&rdquo;
                </div>

                {/* Details list */}
                <div className="space-y-1.5 text-xs text-slate-600 mb-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      활동 지역
                    </span>
                    <span className="font-medium text-slate-800 truncate max-w-[150px]">
                      {worker.location}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" />
                      누적 출동 실적
                    </span>
                    <span className="font-semibold text-slate-800 tabular-nums">
                      {worker.completedJobs}회 완료 (노쇼 0건)
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-400">희망 일당</span>
                    <span className="text-base font-black text-blue-700 tabular-nums">
                      {worker.dailyRate.toLocaleString()}원
                    </span>
                  </div>
                </div>

                {/* Badges / Skills */}
                <div className="space-y-1.5 mb-4">
                  {worker.safetyCert && (
                    <div className="flex items-center gap-1 text-[11px] text-blue-700 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>기초안전보건교육증 확인 완료</span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {worker.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* The CORE Requested Choice Button */}
              <div>
                <button
                  type="button"
                  onClick={() => onSelectChoice(worker)}
                  className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-black text-sm rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>{t('choice.btn')}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredWorkers.length === 0 && (
          <div className="p-10 text-center bg-white border border-slate-200 rounded-2xl">
            <p className="text-sm font-semibold text-slate-600">조건에 부합하는 인력이 없습니다.</p>
            <button
              onClick={() => {
                setSelectedType('all');
                setSelectedCategory('all');
                setSelectedRegion({ province: '전국', county: '전체' });
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              조건 초기화
            </button>
          </div>
        )}
      </section>

      {/* Team Dispatch Callout - Minimal & Clean */}
      <section className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            5인 이상 팀 단위 인력이 필요하신가요?
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            목수팀·철근팀·골조팀 등 반장급 시공팀을 즉시 조율해 드립니다.
          </p>
        </div>
        <button
          onClick={onOpenCounsel}
          className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs whitespace-nowrap cursor-pointer"
        >
          단체 배차 문의
        </button>
      </section>
    </div>
  );
};
