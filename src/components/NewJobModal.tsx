import React, { useState, useMemo } from 'react';
import { X, CheckCircle2, Building, Plus } from 'lucide-react';
import { KOREA_REGIONS } from '../data/regionsData';

interface NewJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated: (newJob: any) => void;
}

export const NewJobModal: React.FC<NewJobModalProps> = ({ isOpen, onClose, onJobCreated }) => {
  const [companyName, setCompanyName] = useState('');
  const [companyType, setCompanyType] = useState('우수 중소기업');
  const [title, setTitle] = useState('');
  const [prov, setProv] = useState('경기도');
  const [county, setCounty] = useState('화성시');
  const [detailLoc, setDetailLoc] = useState('');
  const [industry, setIndustry] = useState<'제조·생산' | '건설·토목' | '물류·운송' | '농축산·어업' | '서비스·식음료'>('제조·생산');
  const [jobType, setJobType] = useState<'정규직' | '계약직' | '일당제'>('정규직');
  const [payType, setPayType] = useState<'월급' | '일급' | '시급'>('월급');
  const [payAmount, setPayAmount] = useState('3,200,000원');
  const [dormitoryProvided, setDormitoryProvided] = useState(true);
  const [foreignersWelcome, setForeignersWelcome] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  // Available counties for selected province
  const availableCounties = useMemo(() => {
    const found = KOREA_REGIONS.find((p) => p.province === prov);
    return found ? found.counties.filter((c) => c !== '전체') : [];
  }, [prov]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullLoc = `${prov} ${county} ${detailLoc}`.trim();
    const createdJob = {
      id: `jp-${Date.now()}`,
      companyName,
      companyType,
      title,
      region: fullLoc,
      industry,
      jobType,
      payType,
      payAmount,
      benefits: dormitoryProvided ? ['기숙사 제공', '식사 지원', '4대보험'] : ['중식 제공', '4대보험'],
      deadline: 'D-14',
      isUrgent: false,
      dormitoryProvided,
      foreignersWelcome,
      postedDate: '2026.11.08',
      views: 1,
    };
    onJobCreated(createdJob);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
      >
        <div className="bg-slate-900 px-6 py-5 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-blue-400" />
            <h3 className="text-base font-bold">기업 채용 공고 간편 등록</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">공고가 성공적으로 등록되었습니다!</h4>
            <p className="text-xs text-slate-600">
              일반 구인구직 리스트 상단에 즉시 노출되며, 구직자의 지원서 접수 시 문자로 실시간 안내됩니다.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg cursor-pointer"
            >
              확인
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                기업명 (회사명) *
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="예: (주)한국오토텍"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                채용 공고 제목 *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="예: [화성/월 320만] 자동차 부품 조립 및 사출 OP 모집 (초보/외국인 가능)"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  근무 지역 (시·군 단위 설정) *
                </label>
                <div className="grid grid-cols-2 gap-2 mb-1.5">
                  <select
                    value={prov}
                    onChange={(e) => {
                      const newP = e.target.value;
                      setProv(newP);
                      const f = KOREA_REGIONS.find((p) => p.province === newP);
                      if (f && f.counties.length > 1) {
                        setCounty(f.counties[1]);
                      }
                    }}
                    className="w-full px-2.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-bold"
                  >
                    {KOREA_REGIONS.map((p) => (
                      <option key={p.province} value={p.province}>
                        {p.province}
                      </option>
                    ))}
                  </select>

                  <select
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-bold"
                  >
                    {availableCounties.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  value={detailLoc}
                  onChange={(e) => setDetailLoc(e.target.value)}
                  placeholder="상세 읍·면 또는 현장 주소 (예: 포승읍 원정리 물류단지)"
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  업종 분류
                </label>
                <select
                  value={industry}
                  onChange={(e: any) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="제조·생산">제조·생산</option>
                  <option value="건설·토목">건설·토목</option>
                  <option value="물류·운송">물류·운송</option>
                  <option value="농축산·어업">농축산·어업</option>
                  <option value="서비스·식음료">서비스·식음료</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  고용 형태
                </label>
                <select
                  value={jobType}
                  onChange={(e: any) => setJobType(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="정규직">정규직</option>
                  <option value="계약직">계약직</option>
                  <option value="일당제">일당제</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  급여 금액 (예: 3,400,000원)
                </label>
                <input
                  type="text"
                  required
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dormitoryProvided}
                  onChange={(e) => setDormitoryProvided(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span>기숙사 제공 (원룸/숙소)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={foreignersWelcome}
                  onChange={(e) => setForeignersWelcome(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span>외국인 근로자 지원 환영</span>
              </label>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs"
              >
                무료 공고 등록 완료
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
