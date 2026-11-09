export type TabType = 'dashboard' | 'foreign' | 'choice' | 'jobs';

export type Language = 'ko' | 'en' | 'vi';

export interface ForeignWorker {
  id: string;
  name: string;
  country: string;
  flag: string;
  age: number;
  gender: '남' | '여';
  visa: string;
  desiredIndustry: string;
  koreanLevel: '기초' | '중급 (TOPIK 3~4)' | '고급 (TOPIK 5~6)' | '무관/일상단어';
  experienceYears: number;
  specialty: string;
  needsDormitory: boolean;
  availableDate: string;
  avatarSeed: string;
  topSkills: string[];
  location: string;
}

export interface ChoiceWorker {
  id: string;
  name: string;
  gender: '남' | '여';
  age: number;
  category: '목수' | '용접' | '철근' | '단순노무' | '전기/배관' | '지게차' | '타일/미장' | '조경/석공';
  experienceYears: number;
  workType: '당일일용' | '단기(1~3개월)' | '장기·정규';
  location: string;
  dailyRate: number; // KRW
  monthlyRate?: number;
  status: '출근대기' | '예약가능' | '작업중';
  rating: number;
  completedJobs: number;
  safetyCert: boolean; // 기초안전보건교육 이수증
  headline: string;
  skills: string[];
  phoneMasked: string;
}

export interface JobPosting {
  id: string;
  companyName: string;
  companyType: string;
  title: string;
  region: string;
  industry: '제조·생산' | '건설·토목' | '물류·운송' | '농축산·어업' | '서비스·식음료';
  jobType: '정규직' | '계약직' | '일당제';
  payType: '월급' | '일급' | '시급';
  payAmount: string;
  benefits: string[];
  deadline: string;
  isUrgent?: boolean;
  dormitoryProvided: boolean;
  foreignersWelcome: boolean;
  postedDate: string;
  views: number;
}

export type UserRole = 'jobseeker' | 'employer';

export interface UserProfile {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  businessNumber?: string;
  specialty?: string;
  experienceYears?: number;
  nationality?: string;
  visa?: string;
  isAvailable?: boolean;
}
