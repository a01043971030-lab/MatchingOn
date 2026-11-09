import React, { useState, useMemo } from 'react';
import { ForeignWorker, Language } from '../types';
import { FOREIGN_WORKERS_DATA } from '../data/mockData';
import { RegionSelector, SelectedRegion } from './RegionSelector';
import { KOREA_REGIONS } from '../data/regionsData';
import { getTranslation } from '../data/translations';
import { 
  Building2, 
  Send, 
  ShieldCheck, 
  Languages, 
  Home, 
  Search, 
  CheckCircle2, 
  PhoneCall, 
  Briefcase, 
  Filter, 
  MapPin, 
  GraduationCap
} from 'lucide-react';

interface ForeignWorkersTabProps {
  onRequestSubmitted: (formData: any) => void;
  onOpenCounsel: () => void;
  language?: Language;
}

export const ForeignWorkersTab: React.FC<ForeignWorkersTabProps> = ({
  onRequestSubmitted,
  onOpenCounsel,
  language = 'ko',
}) => {
  const t = (key: string) => getTranslation(language, key);
  // Enterprise Matching Form State
  const [companyName, setCompanyName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [formProvince, setFormProvince] = useState('경기도');
  const [formCounty, setFormCounty] = useState('화성시');
  const [detailAddress, setDetailAddress] = useState('팔탄면 현대연구소 인근');
  const [industry, setIndustry] = useState('제조업 (금속·기계·플라스틱)');
  const [headcount, setHeadcount] = useState(2);
  const [payCondition, setPayCondition] = useState('월 3,000,000원 ~ 3,500,000원');
  const [koreanLevel, setKoreanLevel] = useState('중급 (업무 지시 이해 가능)');
  const [dormitory, setDormitory] = useState('기숙사 무상 제공 (식사 지원)');
  const [visaPreference, setVisaPreference] = useState('E-9 / E-7 / F-4 무관');

  // Counties available for selected form province
  const formCounties = useMemo(() => {
    const prov = KOREA_REGIONS.find((p) => p.province === formProvince);
    return prov ? prov.counties.filter((c) => c !== '전체') : [];
  }, [formProvince]);

  // Worker Profiles Filter State
  const [selectedRegion, setSelectedRegion] = useState<SelectedRegion>({ province: '전국', county: '전체' });
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [visaFilter, setVisaFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullRegion = `${formProvince} ${formCounty} ${detailAddress}`.trim();
    onRequestSubmitted({
      companyName,
      contactPhone,
      region: fullRegion,
      industry,
      headcount,
      koreanLevel,
      dormitory,
      visaPreference,
    });
  };

  // Filtered workers with Region & County (군단위) precision
  const filteredWorkers = FOREIGN_WORKERS_DATA.filter((worker) => {
    // 1. Region filter
    if (selectedRegion.province !== '전국') {
      const provShort = selectedRegion.province.slice(0, 2);
      const matchProv = worker.location.includes(selectedRegion.province) || worker.location.includes(provShort);
      if (!matchProv) return false;

      if (selectedRegion.county !== '전체') {
        const matchCounty = worker.location.includes(selectedRegion.county);
        if (!matchCounty) return false;
      }
    }

    // 2. Country
    if (countryFilter !== 'all' && worker.country !== countryFilter) return false;

    // 3. Visa
    if (visaFilter !== 'all' && !worker.visa.includes(visaFilter)) return false;

    // 4. Keyword
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = worker.name.toLowerCase().includes(q);
      const matchSkill = worker.specialty.toLowerCase().includes(q) || worker.desiredIndustry.toLowerCase().includes(q);
      const matchLoc = worker.location.toLowerCase().includes(q);
      if (!matchName && !matchSkill && !matchLoc) return false;
    }
    return true;
  });

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-slate-900 rounded-2xl text-white shadow-lg">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/banner_foreign_workers_1794127181319.jpg"
            alt="외국인 전문 기술 인력"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-slate-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl px-6 sm:px-10 py-8 sm:py-12">
          <div className="flex items-center gap-2 text-xs text-blue-300 font-semibold mb-1.5">
            <span>합법 체류 비자 100% 검증</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            {t('foreign.title')}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-xl">
            {t('foreign.sub')}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-200">
            <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {t('foreign.visaVerified')}
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
              <Languages className="w-3.5 h-3.5 text-blue-400" />
              {t('foreign.koreanCheck')}
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
              <Home className="w-3.5 h-3.5 text-orange-400" />
              {t('foreign.dormCheck')}
            </span>
          </div>
        </div>
      </section>

      {/* 1. 기업용 매칭 신청 폼 */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold text-blue-700 tracking-wide uppercase">
              FOR EMPLOYERS
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              [기업용] 외국인 근로자 채용 신청서
            </h2>
          </div>
          <button
            type="button"
            onClick={onOpenCounsel}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-bold rounded-lg shadow-xs cursor-pointer whitespace-nowrap self-start sm:self-auto"
          >
            <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
            <span>전화 접수 1234-1234</span>
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 1. 회사명 */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                기업체명 (상호명) <span className="text-orange-600">*</span>
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="예: (주)한국정밀 / 대성산업"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 2. 담당자 연락처 */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                채용 담당자 휴대폰 번호 <span className="text-orange-600">*</span>
              </label>
              <input
                type="tel"
                required
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="010-0000-0000"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 3. 근무 지역 (시·도 및 군단위 정밀 설정) */}
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                근무 지역 (시·군 단위 설정) <span className="text-orange-600">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <select
                  value={formProvince}
                  onChange={(e) => {
                    const newProv = e.target.value;
                    setFormProvince(newProv);
                    const found = KOREA_REGIONS.find((p) => p.province === newProv);
                    if (found && found.counties.length > 1) {
                      setFormCounty(found.counties[1]);
                    }
                  }}
                  className="w-full px-2.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-bold text-slate-800"
                >
                  {KOREA_REGIONS.map((p) => (
                    <option key={p.province} value={p.province}>
                      {p.province}
                    </option>
                  ))}
                </select>

                <select
                  value={formCounty}
                  onChange={(e) => setFormCounty(e.target.value)}
                  className="w-full px-2.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-bold text-slate-800"
                >
                  {formCounties.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={detailAddress}
                  onChange={(e) => setDetailAddress(e.target.value)}
                  placeholder="상세 읍·면 또는 산업단지명 (예: 팔탄면 / 대불산단)"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 4. 업종 */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                업종 선택 <span className="text-orange-600">*</span>
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="제조업 (금속·기계·플라스틱)">제조업 (금속·기계·플라스틱 사출)</option>
                <option value="뿌리산업 (주조·금형·용접·소성가공)">뿌리산업 (주조·금형·용접·열처리)</option>
                <option value="건설업 (토목·골조·마감)">건설업 (토목·골조·마감)</option>
                <option value="농축산업 (시설채소·축사·과수)">농축산업 (시설채소·축사·과수)</option>
                <option value="물류유통 (창고·상하차·패킹)">물류유통 (창고·상하차·패킹)</option>
                <option value="식품가공·외식서비스">식품가공·외식서비스</option>
              </select>
            </div>

            {/* 5. 급여 조건 */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                급여 지급 조건 <span className="text-orange-600">*</span>
              </label>
              <select
                value={payCondition}
                onChange={(e) => setPayCondition(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="월 2,800,000원 ~ 3,200,000원">월 280만 ~ 320만원 수준</option>
                <option value="월 3,200,000원 ~ 3,600,000원">월 320만 ~ 360만원 수준</option>
                <option value="월 3,600,000원 이상 (숙련공/잔업포함)">월 360만원 이상 (숙련공/잔업포함)</option>
                <option value="시급 10,500원 ~ 12,000원">시급 10,500원 ~ 12,000원</option>
                <option value="면접 후 경력별 상호협의">면접 후 경력별 상호협의</option>
              </select>
            </div>

            {/* 6. 필요 인원 수 */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                채용 필요 인원 수
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={headcount}
                  onChange={(e) => setHeadcount(Number(e.target.value))}
                  className="w-24 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                />
                <span className="text-xs text-slate-600">명</span>
                <span className="text-[11px] text-slate-400"> (대량 충원 협의 가능)</span>
              </div>
            </div>

            {/* 7. 요구 한국어 수준 */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                요구 한국어 수준 <span className="text-orange-600">*</span>
              </label>
              <select
                value={koreanLevel}
                onChange={(e) => setKoreanLevel(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="중급 (업무 지시 이해 가능 / TOPIK 3~4)">중급 (업무 지시 이해 가능 / TOPIK 3~4)</option>
                <option value="고급 (한국어 능통 / TOPIK 5~6)">고급 (원활한 일상/전문 대화 / TOPIK 5~6)</option>
                <option value="기초 (단순 단어 및 수신호 소통 가능)">기초 (단순 단어 및 수신호 소통 가능)</option>
                <option value="한국어 무관 (작업 시연 및 지도 가능)">한국어 무관 (작업 지도 및 시연 가능)</option>
              </select>
            </div>

            {/* 8. 기숙사 및 식사 제공 여부 */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                기숙사 및 식사 제공 여부 <span className="text-orange-600">*</span>
              </label>
              <select
                value={dormitory}
                onChange={(e) => setDormitory(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="기숙사 무상 제공 (1~2인 1실, 식사 지원)">기숙사 무상 제공 (1~2인 1실 + 3식 지원)</option>
                <option value="기숙사 제공 (실비 일부 공제)">기숙사 제공 (관리비/실비 일부 공제)</option>
                <option value="기숙사 미제공 (통근 가능자 희망)">기숙사 미제공 (자체 통근 가능자 희망)</option>
                <option value="주거보조금 별도 지원">주거보조금(월세) 별도 지원</option>
              </select>
            </div>

            {/* 9. 선호 비자 종류 */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                선호 비자 유형
              </label>
              <select
                value={visaPreference}
                onChange={(e) => setVisaPreference(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="E-9 / E-7 / F-4 / H-2 무관">전체 비자 무관 (빠른 채용 우선)</option>
                <option value="E-9 (비전문취업 만기재입국/이직)">E-9 (고용허가제 일반 기능인력)</option>
                <option value="E-7 (특정활동 숙련기능인력)">E-7 (특정활동/뿌리산업 숙련공)</option>
                <option value="F-4 / F-2 / F-5 (체류 및 취업 자유)">F계열 비자 (자유 취업 및 장기 근속)</option>
                <option value="H-2 (방문취업 동포)">H-2 (방문취업 동포)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>접수 즉시 전담 매니저가 유선으로 연락드립니다.</span>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Send className="w-4 h-4" />
              <span>신청서 제출</span>
            </button>
          </div>
        </form>
      </section>

      {/* 2. 구직 중인 외국인 근로자 프로필 리스트 */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              외국인 인력 프로필 ({filteredWorkers.length}명)
            </h2>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="이름, 기술(CNC, 용접, 조립) 검색..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Solid Industrial Region & County Selector */}
        <RegionSelector
          selectedRegion={selectedRegion}
          onChangeRegion={setSelectedRegion}
          resultCount={filteredWorkers.length}
          label="지역 선택"
        />

        {/* Filter Bar - Clean two-tier responsive selector */}
        <div className="space-y-2 p-2.5 bg-slate-100 rounded-xl">
          {/* Nationality Row */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-0.5">
            <span className="text-xs font-bold text-slate-500 shrink-0 px-1">국적:</span>
            {[
              { id: 'all', label: '전체' },
              { id: '베트남', label: '🇻🇳 베트남' },
              { id: '우즈베키스탄', label: '🇺🇿 우즈벡' },
              { id: '몽골', label: '🇲🇳 몽골' },
              { id: '필리핀', label: '🇵🇭 필리핀' },
              { id: '캄보디아', label: '🇰🇭 캄보디아' },
              { id: '네팔', label: '🇳🇵 네팔' },
              { id: '미얀마', label: '🇲🇲 미얀마' },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setCountryFilter(c.id)}
                className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  countryFilter === c.id
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 active:bg-slate-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Visa Row */}
          <div className="flex items-center gap-2 pt-1 border-t border-slate-200/80 overflow-x-auto scrollbar-none">
            <span className="text-xs font-bold text-slate-500 shrink-0 px-1">비자:</span>
            {[
              { id: 'all', label: '전체 비자' },
              { id: 'E-9', label: 'E-9 (일반기능)' },
              { id: 'E-7', label: 'E-7 (숙련기능)' },
              { id: 'F-4', label: 'F-4 (재외동포)' },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setVisaFilter(v.id)}
                className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  visaFilter === v.id
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900 active:bg-slate-200'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Worker Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredWorkers.map((worker) => (
            <div
              key={worker.id}
              className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with Nationality, Visa, and Location */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl" role="img" aria-label={worker.country}>
                      {worker.flag}
                    </span>
                    <div>
                      <span className="text-xs font-semibold text-slate-500 block">
                        {worker.country} 국적
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 leading-tight">
                        {worker.name}
                      </h3>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                    {worker.gender} / {worker.age}세
                  </span>
                </div>

                {/* Worker Regional Location Badge */}
                <div className="flex items-center gap-1 text-[11px] text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-200/60 mb-2 font-medium">
                  <MapPin className="w-3 h-3 text-orange-600 shrink-0" />
                  <span className="truncate">{worker.location}</span>
                </div>

                {/* Unboxed Metadata list */}
                <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">비자 종류</span>
                    <span className="font-semibold text-slate-800">{worker.visa}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">희망 직종</span>
                    <span className="font-bold text-blue-700">{worker.desiredIndustry}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">한국어 수준</span>
                    <span className="font-medium text-slate-800 flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                      {worker.koreanLevel}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">기숙사 조건</span>
                    <span className="font-medium text-slate-700">
                      {worker.needsDormitory ? '기숙사 필요' : '자체 거주 가능'}
                    </span>
                  </div>
                </div>

                {/* Specialty and skills */}
                <div className="mt-3">
                  <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                    주요 특기 및 실무 경력 ({worker.experienceYears}년)
                  </span>
                  <p className="text-xs text-slate-800 font-medium leading-snug">
                    {worker.specialty}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {worker.topSkills.map((sk, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px] text-emerald-600 font-medium mb-2">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    {worker.availableDate}
                  </span>
                  <span className="text-slate-400">신원보증 완료</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    // Pre-fill company name if empty and open consultation modal
                    onOpenCounsel();
                  }}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>채용 인터뷰 제안하기</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredWorkers.length === 0 && (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl">
            <p className="text-sm font-semibold text-slate-600">조건에 부합하는 외국인 인력이 없습니다.</p>
            <p className="text-xs text-slate-400 mt-1">상단 필터를 조정하거나, 상단 신청서에 원하는 조건을 입력해 주시면 맞춤 인력을 발굴해 드립니다.</p>
            <button
              onClick={() => {
                setCountryFilter('all');
                setVisaFilter('all');
                setSelectedRegion({ province: '전국', county: '전체' });
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              지역 및 필터 전체 초기화
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
