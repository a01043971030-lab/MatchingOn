import React from 'react';
import { UserProfile } from '../types';
import { 
  X, 
  User, 
  Building2, 
  HardHat, 
  LogOut, 
  ShieldCheck, 
  Phone, 
  Mail, 
  CheckCircle, 
  FileText,
  Clock
} from 'lucide-react';

interface UserProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onLogout: () => void;
  onToggleAvailability?: () => void;
  onOpenNewJob?: () => void;
}

export const UserProfileDrawer: React.FC<UserProfileDrawerProps> = ({
  isOpen,
  onClose,
  user,
  onLogout,
  onToggleAvailability,
  onOpenNewJob,
}) => {
  if (!isOpen || !user) return null;

  const isJobSeeker = user.role === 'jobseeker';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col"
        role="dialog"
      >
        {/* Header */}
        <div className={`px-5 sm:px-6 py-4 sm:py-5 text-white shrink-0 ${isJobSeeker ? 'bg-gradient-to-r from-orange-600 to-amber-700' : 'bg-gradient-to-r from-blue-700 to-slate-900'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                {isJobSeeker ? <HardHat className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
              </div>
              <div>
                <span className="text-[11px] text-white/80 font-medium">
                  {isJobSeeker ? '구직자(개인회원) 마이페이지' : '구인자(기업회원) 마이페이지'}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {user.name} 님
                </h3>
              </div>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {/* Status Badge & Toggle */}
          {isJobSeeker && (
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-orange-800 font-bold block">현재 출근 상태</span>
                <span className="text-sm font-extrabold text-orange-950 flex items-center gap-1.5 mt-0.5">
                  <span className={`w-2.5 h-2.5 rounded-full ${user.isAvailable ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                  {user.isAvailable ? '오늘 즉시 출근 대기중' : '현재 작업중 / 휴식중'}
                </span>
              </div>
              <button
                type="button"
                onClick={onToggleAvailability}
                className="px-3 py-1.5 bg-white border border-orange-300 hover:bg-orange-100 text-orange-900 text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                상태 변경
              </button>
            </div>
          )}

          {/* User Details */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-700">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-slate-500">회원 유형</span>
              <span className="font-bold text-slate-900">
                {isJobSeeker ? '개인 구직자' : '기업 구인자'}
              </span>
            </div>

            {user.companyName && (
              <div className="flex justify-between items-center">
                <span className="text-slate-500">기업/현장명</span>
                <span className="font-bold text-slate-900">{user.companyName}</span>
              </div>
            )}

            {user.specialty && (
              <div className="flex justify-between items-center">
                <span className="text-slate-500">주요 특기</span>
                <span className="font-bold text-blue-700">{user.specialty}</span>
              </div>
            )}

            {user.nationality && (
              <div className="flex justify-between items-center">
                <span className="text-slate-500">국적 / 비자</span>
                <span className="font-medium text-slate-900">{user.nationality} {user.visa ? `(${user.visa})` : ''}</span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="text-slate-500">연락처</span>
              <span className="font-mono text-slate-900">{user.phone}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-slate-500">이메일 계정</span>
              <span className="font-mono text-slate-900">{user.email}</span>
            </div>
          </div>

          {/* Activity Metrics */}
          <div className="grid grid-cols-2 gap-3 text-center">
            {isJobSeeker ? (
              <>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[11px] text-slate-500 block">받은 초이스 제안</span>
                  <span className="text-lg font-bold text-orange-600 font-mono">2건</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[11px] text-slate-500 block">안전교육증 검증</span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center justify-center gap-1 mt-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    인증완료
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[11px] text-slate-500 block">초이스 발송 건수</span>
                  <span className="text-lg font-bold text-blue-600 font-mono">3건</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[11px] text-slate-500 block">등록 채용공고</span>
                  <span className="text-lg font-bold text-slate-900 font-mono">2건</span>
                </div>
              </>
            )}
          </div>

          {!isJobSeeker && onOpenNewJob && (
            <button
              onClick={() => {
                onClose();
                onOpenNewJob();
              }}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>새 채용공고 등록하기</span>
            </button>
          )}

          {/* Logout Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-slate-500" />
              <span>로그아웃</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
