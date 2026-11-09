import React, { useState } from 'react';
import { UserRole, UserProfile } from '../types';
import { 
  X, 
  User, 
  Building2, 
  CheckCircle2, 
  Lock, 
  Mail, 
  Phone, 
  ShieldCheck, 
  ArrowRight,
  HardHat,
  Sparkles
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [role, setRole] = useState<UserRole>('jobseeker');
  const [isSignUp, setIsSignUp] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [specialty, setSpecialty] = useState('형틀목수');

  if (!isOpen) return null;

  // Preset 1-Click Demo Logins for fast evaluation
  const handleDemoLogin = (demoRole: UserRole, demoType: string) => {
    if (demoRole === 'jobseeker') {
      if (demoType === 'kim') {
        onLoginSuccess({
          id: 'user-kim',
          role: 'jobseeker',
          name: '김*철',
          email: 'kim.worker@matchingon.kr',
          phone: '010-8291-7842',
          specialty: '형틀목수 (14년차)',
          experienceYears: 14,
          nationality: '대한민국',
          isAvailable: true,
        });
      } else {
        onLoginSuccess({
          id: 'user-tuan',
          role: 'jobseeker',
          name: '응우옌 반 뚜안 (Nguyen)',
          email: 'tuan.vn@matchingon.kr',
          phone: '010-3849-1120',
          specialty: 'CNC 선반 가공 (4년차)',
          experienceYears: 4,
          nationality: '베트남 🇻🇳',
          visa: 'E-9 (비전문취업)',
          isAvailable: true,
        });
      }
    } else {
      if (demoType === 'hyundai') {
        onLoginSuccess({
          id: 'comp-hyundai',
          role: 'employer',
          name: '박진호 소장',
          email: 'jinho.park@hyundaiconst.com',
          phone: '010-5844-3291',
          companyName: '현대건설 송도 2공구 현장',
          businessNumber: '101-81-49201',
        });
      } else {
        onLoginSuccess({
          id: 'comp-daesung',
          role: 'employer',
          name: '이수민 인사부장',
          email: 'sm.lee@daesungmetal.co.kr',
          phone: '010-9281-0034',
          companyName: '(주)대성정밀엔지니어링',
          businessNumber: '214-88-09124',
        });
      }
    }
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      role,
      name: name || (role === 'jobseeker' ? (email.split('@')[0] || '구직자회원') : '기업담당자'),
      email: email || 'user@matchingon.kr',
      phone: phone || '010-1234-1234',
      companyName: role === 'employer' ? (companyName || '등록 기업') : undefined,
      businessNumber: role === 'employer' ? businessNumber : undefined,
      specialty: role === 'jobseeker' ? specialty : undefined,
      isAvailable: true,
    };
    onLoginSuccess(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col"
        role="dialog"
      >
        {/* Header Ribbon */}
        <div className={`px-5 sm:px-6 py-4 sm:py-5 text-white shrink-0 ${role === 'jobseeker' ? 'bg-gradient-to-r from-orange-600 to-amber-700' : 'bg-gradient-to-r from-blue-700 to-slate-900'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                {role === 'jobseeker' ? <HardHat className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
              </div>
              <div>
                <span className="text-[11px] text-white/80 font-medium tracking-wide">
                  매칭온 통합 인증 센터
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {role === 'jobseeker' ? '구직자(개인회원) ' : '구인자(기업회원) '}
                  {isSignUp ? '회원가입' : '로그인'}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Role Switcher Tabs inside header */}
          <div className="mt-3 sm:mt-4 grid grid-cols-2 p-1 bg-black/20 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setRole('jobseeker')}
              className={`py-1.5 sm:py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                role === 'jobseeker'
                  ? 'bg-white text-orange-700 shadow-sm font-bold'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>구직자 (일용·외국인)</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('employer')}
              className={`py-1.5 sm:py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                role === 'employer'
                  ? 'bg-white text-blue-900 shadow-sm font-bold'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>구인자 (기업·소장)</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {/* 1-Click Instant Demo Login Strip */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                빠른 1초 데모 계정 체험
              </span>
              <span className="text-[10px] text-slate-400 font-normal">비밀번호 입력 불필요</span>
            </div>

            {role === 'jobseeker' ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('jobseeker', 'kim')}
                  className="p-2 bg-white hover:bg-orange-50 border border-slate-200 hover:border-orange-300 rounded-lg text-left text-xs transition-colors cursor-pointer group"
                >
                  <span className="font-bold text-slate-900 block group-hover:text-orange-700">
                    김*철 (목수 14년)
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">내국인 베테랑 기술자</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('jobseeker', 'tuan')}
                  className="p-2 bg-white hover:bg-orange-50 border border-slate-200 hover:border-orange-300 rounded-lg text-left text-xs transition-colors cursor-pointer group"
                >
                  <span className="font-bold text-slate-900 block group-hover:text-orange-700">
                    응우옌 (CNC가공)
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">외국인 E-9 숙련공</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('employer', 'hyundai')}
                  className="p-2 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg text-left text-xs transition-colors cursor-pointer group"
                >
                  <span className="font-bold text-slate-900 block group-hover:text-blue-700">
                    현대건설 박 소장
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">건설현장 인력 관리자</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('employer', 'daesung')}
                  className="p-2 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg text-left text-xs transition-colors cursor-pointer group"
                >
                  <span className="font-bold text-slate-900 block group-hover:text-blue-700">
                    대성정밀 이 부장
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">제조공장 채용 담당</span>
                </button>
              </div>
            )}
          </div>

          {/* Login / Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {role === 'jobseeker' ? '이름 (실명)' : '담당자 성함'} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={role === 'jobseeker' ? '예: 김철수 또는 응우옌' : '예: 홍길동 소장'}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {isSignUp && role === 'employer' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  회사명 또는 현장명 *
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="예: 현대건설 3공구 또는 (주)한국정밀"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {isSignUp && role === 'jobseeker' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  주요 특기 / 직종
                </label>
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="형틀목수">🔨 형틀목수</option>
                  <option value="용접·배관">🔥 용접·배관</option>
                  <option value="철근공">🏗️ 철근공</option>
                  <option value="단순노무">📦 단순노무</option>
                  <option value="지게차운전">🚜 지게차운전</option>
                  <option value="CNC·사출">⚙️ CNC·사출</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                아이디 또는 이메일 *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                비밀번호 *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {isSignUp && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  휴대폰 번호 (매칭 SMS 수신용) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-0000-0000"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-2.5 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                role === 'jobseeker'
                  ? 'bg-orange-600 hover:bg-orange-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <span>{isSignUp ? '무료 회원가입 완료' : '로그인'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Social / Simple Auth notice */}
          <div className="pt-2 text-center text-xs text-slate-500">
            {isSignUp ? (
              <p>
                이미 계정이 있으신가요?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  로그인하기
                </button>
              </p>
            ) : (
              <p>
                아직 매칭온 회원이 아니신가요?{' '}
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className="text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  간편 회원가입
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            암호화 안전 로그인 보장
          </span>
          <span>고객센터 1234-1234</span>
        </div>
      </div>
    </div>
  );
};
