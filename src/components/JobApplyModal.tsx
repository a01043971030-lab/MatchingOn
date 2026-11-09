import React, { useState } from 'react';
import { JobPosting } from '../types';
import { CheckCircle2, Building2, Send, X, ShieldAlert } from 'lucide-react';

interface JobApplyModalProps {
  job: JobPosting | null;
  onClose: () => void;
}

export const JobApplyModal: React.FC<JobApplyModalProps> = ({ job, onClose }) => {
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [experience, setExperience] = useState('신입 / 관련 경력 없음');
  const [koreanLevel, setKoreanLevel] = useState('한국어 능통 (내국인 또는 TOPIK 5급 이상)');
  const [memo, setMemo] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col"
        role="dialog"
      >
        <div className="bg-slate-900 px-5 sm:px-6 py-4 sm:py-5 text-white flex justify-between items-start shrink-0">
          <div>
            <span className="text-[11px] text-orange-400 font-semibold tracking-wide uppercase">
              1초 간편 입사지원
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white mt-0.5 line-clamp-1">
              {job.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-slate-300" />
              <span>{job.companyName}</span>
              <span aria-hidden="true">·</span>
              <span>{job.region}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 sm:p-8 text-center space-y-4 overflow-y-auto flex-1">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900">지원이 정상적으로 완료되었습니다!</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                <strong>{job.companyName}</strong> 채용 담당자에게 지원서와 연락처가 전달되었습니다.<br />
                서류 검토 후 입력하신 휴대폰(<strong>{applicantPhone || '010-XXXX-XXXX'}</strong>)으로 개별 연락이 진행됩니다.
              </p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500">
              지원 내역은 [마이페이지 &gt; 내 지원 현황]에서 언제든 열람할 수 있습니다.
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors"
            >
              확인 및 채용공고 목록으로 돌아가기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
            {/* Pay and benefits brief */}
            <div className="p-3.5 bg-blue-50/70 border border-blue-100 rounded-xl flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500 block">제시 급여</span>
                <span className="text-sm font-bold text-blue-700 tabular-nums">
                  {job.payType} {job.payAmount}
                </span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">마감</span>
                <span className="font-semibold text-orange-600">{job.deadline}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                지원자 이름 <span className="text-orange-500">*</span>
              </label>
              <input
                type="text"
                required
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="예: 홍길동 또는 Nguyen Van Tuan"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                연락처 (휴대폰 번호) <span className="text-orange-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={applicantPhone}
                onChange={(e) => setApplicantPhone(e.target.value)}
                placeholder="010-0000-0000"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  관련 분야 경력
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="신입 / 관련 경력 없음">신입 / 관련 경력 없음</option>
                  <option value="1년 미만">1년 미만</option>
                  <option value="1년 ~ 3년">1년 ~ 3년</option>
                  <option value="3년 ~ 5년">3년 ~ 5년</option>
                  <option value="5년 이상 베테랑">5년 이상 베테랑</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  한국어 소통 능력
                </label>
                <select
                  value={koreanLevel}
                  onChange={(e) => setKoreanLevel(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="한국어 능통 (내국인 또는 TOPIK 5급 이상)">한국어 모국어 / 능통</option>
                  <option value="업무 지시 이해 가능 (TOPIK 3~4급)">업무 지시 이해 가능</option>
                  <option value="기초 대화 가능 (TOPIK 1~2급)">기초 대화 가능</option>
                  <option value="한국어 불가 / 번역기 사용">한국어 서툼</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                자격증 및 어필 사항 (선택)
              </label>
              <textarea
                rows={2}
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="예: 지게차 면허 소지, 통근버스 이용 희망, 성실하게 일하겠습니다."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <div className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600">
              <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0" />
              <span>지원서 제출 시 지원자의 연락처가 해당 공고 등록 기업에 즉시 전달됩니다.</span>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                취소
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>즉시 입사지원 제출</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
