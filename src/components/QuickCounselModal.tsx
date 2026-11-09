import React, { useState } from 'react';
import { PhoneCall, Clock, CheckCircle2, X, ShieldCheck, MapPin } from 'lucide-react';

interface QuickCounselModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickCounselModal: React.FC<QuickCounselModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('경기 화성/평택');
  const [workerNeedType, setWorkerNeedType] = useState('당일 급출동 일용직');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col"
        role="dialog"
      >
        <div className="bg-orange-600 px-5 sm:px-6 py-4 sm:py-5 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-orange-200 font-medium">실시간 빠른 배차 핫라인</span>
              <h3 className="text-base font-bold text-white">긴급 인력 매칭 상담</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-4 overflow-y-auto flex-1">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-slate-900">상담 신청이 접수되었습니다!</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              관할 지역 배차 매니저가 <strong>5분 이내</strong>에 유선({phone || '입력하신 번호'})으로 긴급 연락드립니다.<br />
              급한 현장의 경우 아래 직통 전화로 바로 전화주셔도 됩니다.
            </p>
            <a
              href="tel:1234-1234"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>대표번호 1234-1234 즉시 전화</span>
            </a>
            <div>
              <button
                onClick={onClose}
                className="mt-2 text-xs text-slate-500 hover:text-slate-800 underline cursor-pointer"
              >
                창 닫기
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
              <Clock className="w-4 h-4 text-amber-700 shrink-0" />
              <span>평균 매칭 소요시간 11분! 당일 새벽 현장 투입부터 장기 인력까지 즉시 조율 가능합니다.</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                업체명 또는 현장명 <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="예: 현대건설 송도 2공구 또는 (주)대성정밀"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                현장 소장 / 담당자 연락처 <span className="text-orange-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-0000-0000"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  현장 위치
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full pl-8 pr-2 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  필요 인력 유형
                </label>
                <select
                  value={workerNeedType}
                  onChange={(e) => setWorkerNeedType(e.target.value)}
                  className="w-full px-2 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="당일 급출동 일용직">당일 긴급 일용직</option>
                  <option value="외국인 근로자 채용">외국인 인력 채용</option>
                  <option value="특기 기술자 (목수/용접)">특기 기술자 (목수/용접)</option>
                  <option value="장기 고용 계약직">장기 고용 계약직</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2 text-[11px] text-slate-600">
              <ShieldCheck className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
              <span>노쇼 발생 시 100% 즉시 대체 인력 보장 시스템 운영</span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                닫기
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
              >
                5분 내 상담 요청
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
