import React, { useState } from 'react';
import { JobPosting, Language } from '../types';
import { JOB_POSTINGS_DATA } from '../data/mockData';
import { RegionSelector, SelectedRegion } from './RegionSelector';
import { getTranslation } from '../data/translations';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Calendar, 
  Building2, 
  Send, 
  PlusCircle, 
  Check, 
  Eye, 
  Flame, 
  Filter,
  DollarSign
} from 'lucide-react';

interface GeneralJobsTabProps {
  onApplyJob: (job: JobPosting) => void;
  onPostNewJob: () => void;
  language?: Language;
}

export const GeneralJobsTab: React.FC<GeneralJobsTabProps> = ({
  onApplyJob,
  onPostNewJob,
  language = 'ko',
}) => {
  const t = (key: string) => getTranslation(language, key);
  const [selectedRegion, setSelectedRegion] = useState<SelectedRegion>({ province: '전국', county: '전체' });
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [jobTypeFilter, setJobTypeFilter] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [dormitoryOnly, setDormitoryOnly] = useState<boolean>(false);
  const [foreignersOnly, setForeignersOnly] = useState<boolean>(false);

  const industries = [
    { id: 'all', label: '전체 직종' },
    { id: '제조·생산', label: '제조·생산' },
    { id: '건설·토목', label: '건설·토목' },
    { id: '물류·운송', label: '물류·운송' },
    { id: '농축산·어업', label: '농축산·어업' },
    { id: '서비스·식음료', label: '서비스·외식' },
  ];

  // Filtering with Region & County (군단위) precision
  const filteredJobs = JOB_POSTINGS_DATA.filter((job) => {
    // 1. Region filter
    if (selectedRegion.province !== '전국') {
      const provShort = selectedRegion.province.slice(0, 2);
      const matchProv = job.region.includes(selectedRegion.province) || job.region.includes(provShort);
      if (!matchProv) return false;

      if (selectedRegion.county !== '전체') {
        const matchCounty = job.region.includes(selectedRegion.county);
        if (!matchCounty) return false;
      }
    }

    // 2. Industry
    if (industryFilter !== 'all' && job.industry !== industryFilter) return false;

    // 3. Job type
    if (jobTypeFilter !== 'all' && job.jobType !== jobTypeFilter) return false;

    // 4. Conditions
    if (dormitoryOnly && !job.dormitoryProvided) return false;
    if (foreignersOnly && !job.foreignersWelcome) return false;

    // 5. Search keyword
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchComp = job.companyName.toLowerCase().includes(q);
      const matchRegion = job.region.toLowerCase().includes(q);
      if (!matchTitle && !matchComp && !matchRegion) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Title & Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {t('jobs.title')}
          </h1>
        </div>

        <button
          onClick={onPostNewJob}
          className="flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer self-start sm:self-auto whitespace-nowrap"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{t('jobs.postBtn')}</span>
        </button>
      </div>

      {/* Solid Industrial Region & County Selector */}
      <RegionSelector
        selectedRegion={selectedRegion}
        onChangeRegion={setSelectedRegion}
        resultCount={filteredJobs.length}
        label={t('region.label')}
        language={language}
      />

      {/* Filter and Search Bar (사람인 / 잡코리아 스타일의 정교한 필터링 UI) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        {/* Search bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="회사명, 직무(조립, 지게차, 형틀, 사출), 근무지 검색..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => {}}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>검색</span>
          </button>
        </div>

        {/* Filter Rows */}
        <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
          {/* Industry Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="w-20 text-slate-500 font-medium shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              업종 분류
            </span>
            <div className="flex flex-wrap gap-1.5">
              {industries.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => setIndustryFilter(ind.id)}
                  className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                    industryFilter === ind.id
                      ? 'bg-blue-600 text-white border-blue-600 font-bold'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {ind.label}
                </button>
              ))}
            </div>
          </div>



          {/* Additional Checkbox Options */}
          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100">
            <span className="text-slate-500 font-medium">추가 조건:</span>
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={dormitoryOnly}
                onChange={(e) => setDormitoryOnly(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
              />
              <span>기숙사 제공 공고만 보기</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={foreignersOnly}
                onChange={(e) => setForeignersOnly(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
              />
              <span>외국인 근로자 지원 가능 공고</span>
            </label>
          </div>
        </div>
      </div>

      {/* Job Postings List (표준화된 게시판 형태) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>전체 채용 공고 <strong className="text-slate-900 tabular-nums">{filteredJobs.length}건</strong></span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setJobTypeFilter('all')}
              className={`hover:text-slate-900 ${jobTypeFilter === 'all' ? 'text-blue-600 font-bold' : ''}`}
            >
              전체
            </button>
            <span>·</span>
            <button
              onClick={() => setJobTypeFilter('정규직')}
              className={`hover:text-slate-900 ${jobTypeFilter === '정규직' ? 'text-blue-600 font-bold' : ''}`}
            >
              정규직
            </button>
            <span>·</span>
            <button
              onClick={() => setJobTypeFilter('계약직')}
              className={`hover:text-slate-900 ${jobTypeFilter === '계약직' ? 'text-blue-600 font-bold' : ''}`}
            >
              계약직
            </button>
            <span>·</span>
            <button
              onClick={() => setJobTypeFilter('일당제')}
              className={`hover:text-slate-900 ${jobTypeFilter === '일당제' ? 'text-blue-600 font-bold' : ''}`}
            >
              일당제
            </button>
          </div>
        </div>

        {/* Board List */}
        <div className="space-y-3">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-slate-200 hover:border-blue-400 rounded-xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Column: Company Info */}
              <div className="md:w-56 shrink-0">
                <span className="text-[11px] text-blue-600 font-medium block">
                  {job.companyType}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-0.5 truncate">
                  {job.companyName}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{job.region}</span>
                </div>
              </div>

              {/* Middle Column: Title & Conditions */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {job.isUrgent && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                      <Flame className="w-3 h-3 fill-red-500 text-red-500" />
                      급구
                    </span>
                  )}
                  <span className="text-xs text-slate-500 font-medium">
                    {job.industry}
                  </span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-xs text-slate-500">
                    {job.jobType}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer">
                  {job.title}
                </h3>

                {/* Benefits tag chips */}
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  {job.benefits.map((b, i) => (
                    <span
                      key={i}
                      className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
                    >
                      {b}
                    </span>
                  ))}
                  {job.foreignersWelcome && (
                    <span className="text-[11px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-medium">
                      외국인 지원 가능
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column: Pay, Deadline & Apply CTA */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 shrink-0">
                <div className="text-left md:text-right">
                  <span className="text-[11px] text-slate-400 block">급여 조건</span>
                  <span className="text-base font-bold text-blue-700 tabular-nums">
                    {job.payType} {job.payAmount}
                  </span>
                  <span className="text-xs text-orange-600 font-bold block mt-0.5">
                    마감 {job.deadline}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onApplyJob(job)}
                  className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>지원하기</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl">
            <p className="text-sm font-semibold text-slate-600">조건에 일치하는 채용공고가 없습니다.</p>
            <p className="text-xs text-slate-400 mt-1">지역이나 업종 필터를 전체로 변경해 보세요.</p>
            <button
              onClick={() => {
                setIndustryFilter('all');
                setSelectedRegion({ province: '전국', county: '전체' });
                setJobTypeFilter('all');
                setDormitoryOnly(false);
                setForeignersOnly(false);
                setSearchKeyword('');
              }}
              className="mt-3 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              지역 및 조건 초기화
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
