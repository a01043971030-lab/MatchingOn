import React, { useState } from 'react';
import { ChoiceWorker } from '../types';
import { CheckCircle2, MessageSquare, Phone, ShieldCheck, X, Copy, Check, Clock, MapPin } from 'lucide-react';

interface ChoiceModalProps {
  worker: ChoiceWorker | null;
  onClose: () => void;
}

export const ChoiceModal: React.FC<ChoiceModalProps> = ({ worker, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [siteAddress, setSiteAddress] = useState('경기 화성시 남양읍 현대연구소 인근 현장');
  const [smsSentNotice, setSmsSentNotice] = useState(false);

  if (!worker) return null;

  const fullPhone = worker.phoneMasked.replace('****', '7842');

  const handleCopy = () => {
    navigator.clipboard.writeText(fullPhone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendSiteInfo = () => {
    setSmsSentNotice(true);
    setTimeout(() => setSmsSentNotice(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 px-5 sm:px-6 py-4 sm:py-5 text-white shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 shrink-0">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-blue-200">
                  다이렉트 초이스 완료
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  인력 자동 매칭 접수
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
          {/* Main Required Alert Message */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-bold text-emerald-900">
                  근로자와 업체 담당자에게 연락처가 포함된 자동 매칭 SMS가 발송되었습니다.
                </p>
                <p className="text-xs text-emerald-700 mt-1">
                  선택하신 근로자의 휴대폰으로 귀사의 매칭 요청 건이 실시간 전달되었습니다.
                </p>
              </div>
            </div>
          </div>

          {/* Matched Worker Brief */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <span>{worker.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>경력 {worker.experienceYears}년</span>
                  <span aria-hidden="true">·</span>
                  <span>{worker.location}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  {worker.name} 기술자 ({worker.age}세, {worker.gender})
                </h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">희망 일당</span>
                <span className="text-base font-bold text-blue-700 tabular-nums">
                  {worker.dailyRate.toLocaleString()}원
                </span>
              </div>
            </div>

            {/* Certifications and status */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 pt-2 border-t border-slate-200">
              {worker.safetyCert && (
                <span className="inline-flex items-center gap-1 text-blue-700 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  기초안전보건교육 이수 검증완료
                </span>
              )}
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                현장 즉시 출동 대기중
              </span>
            </div>
          </div>

          {/* SMS Notification Preview Box */}
          <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-100/70 text-xs font-mono space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-[11px] font-sans">
              <span className="font-semibold text-slate-700">발송된 SMS 미리보기</span>
              <span className="text-blue-600 font-medium">통신 3사 실시간 전송완료</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 text-slate-700 leading-relaxed font-sans text-xs">
              <p className="font-semibold text-slate-900 mb-1">[매칭온 다이렉트 초이스 알림]</p>
              <p className="text-slate-600">
                - 선택 인력: {worker.name} ({worker.category} {worker.experienceYears}년차)<br />
                - 근로자 연락처: <strong className="text-slate-900">{fullPhone}</strong><br />
                - 업체 연락처: 010-5844-3291 (현장 소장님)<br />
                - 전달 안내: 안전장구 착용 및 현장 집결 시간 유선 통화 확인 요망.
              </p>
            </div>
          </div>

          {/* Direct Actions */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <a
                href={`tel:${fullPhone}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm rounded-xl shadow-sm transition-colors text-center cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>근로자에게 바로 전화 걸기</span>
              </a>
              <button
                onClick={handleCopy}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-xl border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="연락처 복사"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? '복사됨' : '번호 복사'}</span>
              </button>
            </div>

            {/* Optional Site Address Quick Dispatch */}
            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                현장 주소 및 집결 안내 추가 전송 (선택)
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={siteAddress}
                    onChange={(e) => setSiteAddress(e.target.value)}
                    placeholder="현장 상세 주소를 입력하세요"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={handleSendSiteInfo}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg whitespace-nowrap cursor-pointer"
                >
                  위치 전송
                </button>
              </div>
              {smsSentNotice && (
                <p className="text-xs text-blue-600 mt-1 font-medium animate-in fade-in">
                  ✓ 현장 주소 문자가 근로자에게 추가 발송되었습니다.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>매칭 취소 및 변경 문의: 1234-1234</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
