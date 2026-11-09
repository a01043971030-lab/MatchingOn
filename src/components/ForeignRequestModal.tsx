import React from 'react';
import { CheckCircle2, Building2, PhoneCall, ShieldCheck, X } from 'lucide-react';

interface ForeignRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestData: {
    companyName: string;
    contactPhone: string;
    region: string;
    industry: string;
    headcount: number;
    koreanLevel: string;
    dormitory: string;
    visaPreference: string;
  } | null;
}

export const ForeignRequestModal: React.FC<ForeignRequestModalProps> = ({
  isOpen,
  onClose,
  requestData,
}) => {
  if (!isOpen || !requestData) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 px-6 py-5 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <span className="text-xs text-blue-200 font-medium">외국인 인력 맞춤 신청</span>
                <h3 className="text-lg font-bold text-white">매칭 신청서 접수 완료</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm font-bold text-blue-950 mb-1">
              외국인 인력 전문 전담 매니저가 배정되었습니다.
            </p>
            <p className="text-xs text-blue-800 leading-relaxed">
              입력하신 업종 및 근무 조건(기숙사, 한국어 수준, 비자 요건)에 부합하는 합법 외국인 근로자 3~5명의 상세 프로필을 <strong>30분 이내에 정리하여 연락</strong>드립니다.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5 text-xs text-slate-700">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 font-medium">
              <span className="flex items-center gap-1.5 text-slate-900">
                <Building2 className="w-4 h-4 text-slate-500" />
                {requestData.companyName || '신청 기업'}
              </span>
              <span className="text-slate-500">{requestData.contactPhone || '연락처 미입력'}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <div>
                <span className="text-slate-400 block">근무 지역</span>
                <span className="font-semibold text-slate-800">{requestData.region}</span>
              </div>
              <div>
                <span className="text-slate-400 block">업종</span>
                <span className="font-semibold text-slate-800">{requestData.industry}</span>
              </div>
              <div>
                <span className="text-slate-400 block">요청 인원</span>
                <span className="font-semibold text-slate-800">{requestData.headcount}명</span>
              </div>
              <div>
                <span className="text-slate-400 block">요구 한국어</span>
                <span className="font-semibold text-slate-800">{requestData.koreanLevel}</span>
              </div>
              <div>
                <span className="text-slate-400 block">기숙사 지원</span>
                <span className="font-semibold text-slate-800">{requestData.dormitory}</span>
              </div>
              <div>
                <span className="text-slate-400 block">선호 비자</span>
                <span className="font-semibold text-slate-800">{requestData.visaPreference}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              매칭온은 출입국관리법 및 고용허가제 규정을 100% 준수한 <strong>합법 체류 비자 인력만 알선</strong>합니다.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs">
          <a
            href="tel:1234-1234"
            className="flex items-center gap-1 text-blue-700 hover:text-blue-900 font-semibold"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>대표 직통 상담 1234-1234</span>
          </a>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg cursor-pointer"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
