import { Language } from '../types';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  ko: {
    // Navbar
    'nav.home': '메인 홈',
    'nav.foreign': '외국인 매칭',
    'nav.choice': '초이스 매칭',
    'nav.jobs': '일반 구인구직',
    'nav.counsel': '긴급 인력 상담',
    'nav.counselShort': '상담',
    'nav.login': '로그인 · 회원가입',
    'nav.loginShort': '로그인',
    'nav.selectLang': '지원 언어 선택',
    'nav.counselPhone': '전화 간편상담 (1234-1234)',
    'nav.mypage': '마이페이지',
    'nav.jobseeker': '구직자',
    'nav.employer': '구인자',

    // Mobile Bottom Bar
    'bottom.home': '홈',
    'bottom.foreign': '외국인',
    'bottom.choice': '초이스',
    'bottom.jobs': '채용공고',

    // Dashboard Hero
    'hero.badge': '외국인 · 일용직 · 기술인력 전문 매칭',
    'hero.title1': '현장 인력, ',
    'hero.titleHighlight': '초이스 매칭',
    'hero.title2': '으로 바로 투입',
    'hero.sub': '합법 외국인 신청부터 당일 일용직 초이스까지 빠르고 안전하게 연결합니다.',
    'hero.placeholder': '직종(목수, 용접, 단순노무) 또는 지역 검색...',
    'hero.choiceBtn': '인력 초이스',
    'hero.assurance1': '합법 비자 100%',
    'hero.assurance2': '안전교육 이수 확인',
    'hero.assurance3': '노쇼 즉시 대체',

    // Categories
    'cat.title': '직종별 빠른 찾기',
    'cat.mfg': '제조·생산',
    'cat.const': '건설·토목',
    'cat.logistics': '물류·운송',
    'cat.agri': '농축산·어업',
    'cat.service': '서비스·식음',
    'cat.general': '단순노무',

    // Stats
    'stat.title': '실시간 매칭 현황',
    'stat.live': '실시간 집계',
    'stat.todayMatches': '오늘 일용직 매칭',
    'stat.completed': '건 완료',
    'stat.foreignWaiting': '외국인 인력 대기',
    'stat.peopleWaiting': '명 대기',
    'stat.avgTime': '평균 매칭 시간',
    'stat.minutes': '분',
    'stat.emergencyRate': '당일 긴급 배차율',
    'stat.matchDone': '완료',

    // 3 Core Services
    'service.title': '핵심 서비스 바로가기',
    'service.s1Badge': '기업 전용',
    'service.s1Title': '외국인 근로자 매칭',
    'service.s1Desc': '제조·건설·농축산 분야 맞춤형 합법 비자 인력 신청 및 배정',
    'service.s1Btn': '외국인 매칭 신청',
    'service.s2Direct': '다이렉트',
    'service.s2Badge': '실시간 즉시 배차',
    'service.s2Title': '일용직 & 장기 초이스',
    'service.s2Desc': '기술자 프로필 직접 확인 후 [초이스] 시 즉시 SMS 자동 매칭',
    'service.s2Btn': '근로자 초이스하기',
    'service.s3Badge': '채용 포털',
    'service.s3Title': '일반 구인구직',
    'service.s3Desc': '제조·물류·건설 정규직 및 계약직 표준 채용공고 지원 및 등록',
    'service.s3Btn': '채용공고 보기',

    // Bottom Banner & Footer
    'banner.title': '급한 인력이 필요하신가요?',
    'banner.desc': '상담 요청 시 10분 내 현장 투입 가능한 인력을 연결해 드립니다.',
    'banner.btn': '긴급 배차 상담',
    'footer.brand': '매칭온',
    'footer.terms': '이용약관',
    'footer.privacy': '개인정보처리방침',
    'footer.address': '전남광주특별시 서구 백운동',

    // Region Selector
    'region.label': '지역 선택',
    'region.allNation': '전국',
    'region.allCounty': '전체',
    'region.reset': '초기화',
    'region.filterCount': '건의 인력/공고',

    // Choice Tab
    'choice.title': '현장 출동 인력 초이스',
    'choice.sub': '원하는 기술자를 직접 선택하고 즉시 출동 배차를 요청하세요.',
    'choice.btn': '초이스 (배차요청)',
    'choice.dailyRate': '일당',
    'choice.experience': '경력',
    'choice.completed': '완료 건수',
    'choice.rating': '평점',
    'choice.safety': '기초안전보건 이수',
    'choice.statusReady': '출근대기',
    'choice.statusWorking': '작업중',

    // Foreign Tab
    'foreign.title': '외국인 근로자 맞춤 매칭 서비스',
    'foreign.sub': '한국어 수준과 기숙사 조건에 맞춘 합법 외국인 인력을 매칭합니다.',
    'foreign.visaVerified': '합법 비자 100% 검증',
    'foreign.koreanCheck': '한국어 수준 진단',
    'foreign.dormCheck': '기숙사·숙식 조율',
    'foreign.formTitle': '기업 매칭 신청서',
    'foreign.submitBtn': '신청서 제출',

    // Jobs Tab
    'jobs.title': '일반 채용공고',
    'jobs.sub': '제조, 건설, 물류 등 정규직·계약직 표준 채용공고입니다.',
    'jobs.postBtn': '공고 등록하기',
    'jobs.applyBtn': '지원하기',
    'jobs.urgent': '긴급채용',
  },

  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.foreign': 'Foreign Workers',
    'nav.choice': 'Choice Matching',
    'nav.jobs': 'Job Board',
    'nav.counsel': 'Emergency Counsel',
    'nav.counselShort': 'Counsel',
    'nav.login': 'Login · Sign Up',
    'nav.loginShort': 'Login',
    'nav.selectLang': 'Select Language',
    'nav.counselPhone': 'Quick Phone Counsel (1234-1234)',
    'nav.mypage': 'My Page',
    'nav.jobseeker': 'Job Seeker',
    'nav.employer': 'Employer',

    // Mobile Bottom Bar
    'bottom.home': 'Home',
    'bottom.foreign': 'Foreign',
    'bottom.choice': 'Choice',
    'bottom.jobs': 'Jobs',

    // Dashboard Hero
    'hero.badge': 'Matching Specialists for Foreign & Industrial Workforce',
    'hero.title1': 'Field Workforce, ',
    'hero.titleHighlight': 'Choice Matching',
    'hero.title2': ' for Instant Dispatch',
    'hero.sub': 'Fast and safe workforce matching from legal foreign workers to same-day dispatch.',
    'hero.placeholder': 'Search jobs (carpenter, welding, labor) or region...',
    'hero.choiceBtn': 'Find Workers',
    'hero.assurance1': '100% Legal Visa',
    'hero.assurance2': 'Safety Training Verified',
    'hero.assurance3': 'Instant No-Show Replacement',

    // Categories
    'cat.title': 'Quick Category Search',
    'cat.mfg': 'Manufacturing',
    'cat.const': 'Construction',
    'cat.logistics': 'Logistics',
    'cat.agri': 'Agri & Fishery',
    'cat.service': 'Service & Food',
    'cat.general': 'Manual Labor',

    // Stats
    'stat.title': 'Live Workforce Statistics',
    'stat.live': 'Live Data',
    'stat.todayMatches': 'Today\'s Daily Matches',
    'stat.completed': ' completed',
    'stat.foreignWaiting': 'Foreign Workers Ready',
    'stat.peopleWaiting': ' available',
    'stat.avgTime': 'Avg. Matching Time',
    'stat.minutes': ' min',
    'stat.emergencyRate': 'Emergency Dispatch Rate',
    'stat.matchDone': 'Done',

    // 3 Core Services
    'service.title': 'Core Workforce Services',
    'service.s1Badge': 'For Enterprises',
    'service.s1Title': 'Foreign Worker Placement',
    'service.s1Desc': 'Tailored recruitment & placement of verified legal visa holders for factories & sites',
    'service.s1Btn': 'Apply for Workers',
    'service.s2Direct': 'Direct',
    'service.s2Badge': 'Instant Dispatch',
    'service.s2Title': 'Daily & Long-Term Choice',
    'service.s2Desc': 'Review verified worker profiles and click [Choice] for immediate automated SMS dispatch',
    'service.s2Btn': 'Choice Worker Now',
    'service.s3Badge': 'Job Portal',
    'service.s3Title': 'General Job Board',
    'service.s3Desc': 'Verified full-time and contract jobs in manufacturing, logistics, and civil engineering',
    'service.s3Btn': 'View Job Postings',

    // Bottom Banner & Footer
    'banner.title': 'Need urgent workers on site?',
    'banner.desc': 'Request emergency counsel to connect available workforce within 10 minutes.',
    'banner.btn': 'Urgent Dispatch Call',
    'footer.brand': 'MatchingOn',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    'footer.address': 'Baekun-dong, Seo-gu, Gwangju, Korea',

    // Region Selector
    'region.label': 'Region',
    'region.allNation': 'All Nation',
    'region.allCounty': 'All Areas',
    'region.reset': 'Reset',
    'region.filterCount': ' workers/posts found',

    // Choice Tab
    'choice.title': 'On-Demand Field Worker Choice',
    'choice.sub': 'Select skilled technicians directly and request immediate dispatch.',
    'choice.btn': 'Choice (Dispatch)',
    'choice.dailyRate': 'Daily Rate',
    'choice.experience': 'Experience',
    'choice.completed': 'Completed Jobs',
    'choice.rating': 'Rating',
    'choice.safety': 'Safety Certified',
    'choice.statusReady': 'Available',
    'choice.statusWorking': 'On Job',

    // Foreign Tab
    'foreign.title': 'Foreign Worker Matching Service',
    'foreign.sub': 'Placement of legal foreign workers tailored to language skills and dormitory needs.',
    'foreign.visaVerified': '100% Verified Legal Visas',
    'foreign.koreanCheck': 'Korean Proficiency Tested',
    'foreign.dormCheck': 'Dormitory Arranged',
    'foreign.formTitle': 'Enterprise Matching Request',
    'foreign.submitBtn': 'Submit Request',

    // Jobs Tab
    'jobs.title': 'General Job Postings',
    'jobs.sub': 'Official job openings in manufacturing, construction, logistics, and more.',
    'jobs.postBtn': 'Post a Job',
    'jobs.applyBtn': 'Apply Now',
    'jobs.urgent': 'Urgent',
  },

  vi: {
    // Navbar
    'nav.home': 'Trang chủ',
    'nav.foreign': 'Lao động nước ngoài',
    'nav.choice': 'Ghép thợ tức thì',
    'nav.jobs': 'Tuyển dụng',
    'nav.counsel': 'Tư vấn khẩn cấp',
    'nav.counselShort': 'Tư vấn',
    'nav.login': 'Đăng nhập · Đăng ký',
    'nav.loginShort': 'Đăng nhập',
    'nav.selectLang': 'Chọn ngôn ngữ',
    'nav.counselPhone': 'Tư vấn nhanh qua điện thoại (1234-1234)',
    'nav.mypage': 'Trang cá nhân',
    'nav.jobseeker': 'Người tìm việc',
    'nav.employer': 'Nhà tuyển dụng',

    // Mobile Bottom Bar
    'bottom.home': 'Trang chủ',
    'bottom.foreign': 'Nước ngoài',
    'bottom.choice': 'Chọn thợ',
    'bottom.jobs': 'Việc làm',

    // Dashboard Hero
    'hero.badge': 'Dịch vụ kết nối lao động chuyên nghiệp & hợp pháp',
    'hero.title1': 'Nhân lực hiện trường, ',
    'hero.titleHighlight': 'Ghép thợ tức thì',
    'hero.title2': ' sẵn sàng làm việc ngay',
    'hero.sub': 'Kết nối an toàn và nhanh chóng từ lao động nước ngoài hợp pháp đến thợ trong ngày.',
    'hero.placeholder': 'Tìm theo nghề (thợ mộc, thợ hàn, lao động) hoặc khu vực...',
    'hero.choiceBtn': 'Chọn nhân lực',
    'hero.assurance1': '100% Visa hợp pháp',
    'hero.assurance2': 'Chứng chỉ an toàn lao động',
    'hero.assurance3': 'Đổi người ngay nếu vắng',

    // Categories
    'cat.title': 'Tìm nhanh theo ngành nghề',
    'cat.mfg': 'Sản xuất & Chế tạo',
    'cat.const': 'Xây dựng & Cầu đường',
    'cat.logistics': 'Kho vận & Vận tải',
    'cat.agri': 'Nông & Ngư nghiệp',
    'cat.service': 'Dịch vụ & Ăn uống',
    'cat.general': 'Lao động phổ thông',

    // Stats
    'stat.title': 'Tình trạng kết nối trực tiếp',
    'stat.live': 'Dữ liệu trực tiếp',
    'stat.todayMatches': 'Ghép thợ trong ngày',
    'stat.completed': ' việc hoàn thành',
    'stat.foreignWaiting': 'Lao động nước ngoài chờ việc',
    'stat.peopleWaiting': ' người sẵn sàng',
    'stat.avgTime': 'Thời gian ghép nối trung bình',
    'stat.minutes': ' phút',
    'stat.emergencyRate': 'Tỷ lệ điều động khẩn cấp',
    'stat.matchDone': 'Xong',

    // 3 Core Services
    'service.title': 'Dịch vụ cốt lõi',
    'service.s1Badge': 'Dành cho doanh nghiệp',
    'service.s1Title': 'Ghép lao động nước ngoài',
    'service.s1Desc': 'Đăng ký và bố trí nhân lực có visa hợp pháp trong ngành sản xuất, xây dựng, nông nghiệp',
    'service.s1Btn': 'Đăng ký tuyển lao động',
    'service.s2Direct': 'Trực tiếp',
    'service.s2Badge': 'Điều động tức thì',
    'service.s2Title': 'Ghép thợ ngày & dài hạn',
    'service.s2Desc': 'Xem hồ sơ thợ thực tế và bấm [Chọn] để ghép nối tự động tức thì qua tin nhắn SMS',
    'service.s2Btn': 'Chọn nhân lực ngay',
    'service.s3Badge': 'Cổng việc làm',
    'service.s3Title': 'Tuyển dụng chung',
    'service.s3Desc': 'Xem và ứng tuyển các vị trí chính thức và hợp đồng trong ngành sản xuất, vận tải, xây dựng',
    'service.s3Btn': 'Xem tin tuyển dụng',

    // Bottom Banner & Footer
    'banner.title': 'Bạn cần nhân lực gấp cho công trình?',
    'banner.desc': 'Yêu cầu tư vấn khẩn cấp để được điều động nhân lực sẵn sàng trong vòng 10 phút.',
    'banner.btn': 'Gọi tư vấn điều động',
    'footer.brand': 'MatchingOn',
    'footer.terms': 'Điều khoản sử dụng',
    'footer.privacy': 'Chính sách bảo mật',
    'footer.address': 'Baekun-dong, Seo-gu, Gwangju, Hàn Quốc',

    // Region Selector
    'region.label': 'Khu vực',
    'region.allNation': 'Toàn quốc',
    'region.allCounty': 'Tất cả',
    'region.reset': 'Đặt lại',
    'region.filterCount': ' nhân lực/tin đăng',

    // Choice Tab
    'choice.title': 'Chọn thợ hiện trường theo yêu cầu',
    'choice.sub': 'Xem trực tiếp hồ sơ tay nghề và yêu cầu điều động làm việc ngay.',
    'choice.btn': 'Chọn thợ (Điều động)',
    'choice.dailyRate': 'Lương ngày',
    'choice.experience': 'Kinh nghiệm',
    'choice.completed': 'Việc đã làm',
    'choice.rating': 'Đánh giá',
    'choice.safety': 'Chứng chỉ an toàn',
    'choice.statusReady': 'Chờ nhận việc',
    'choice.statusWorking': 'Đang làm việc',

    // Foreign Tab
    'foreign.title': 'Dịch vụ ghép lao động nước ngoài',
    'foreign.sub': 'Kết nối lao động hợp pháp phù hợp với trình độ tiếng Hàn và điều kiện ký túc xá.',
    'foreign.visaVerified': '100% Visa hợp pháp',
    'foreign.koreanCheck': 'Kiểm tra tiếng Hàn',
    'foreign.dormCheck': 'Hỗ trợ ký túc xá',
    'foreign.formTitle': 'Đơn đăng ký doanh nghiệp',
    'foreign.submitBtn': 'Gửi đơn đăng ký',

    // Jobs Tab
    'jobs.title': 'Tin tuyển dụng chung',
    'jobs.sub': 'Tin tuyển dụng chính thức ngành sản xuất, xây dựng, kho vận...',
    'jobs.postBtn': 'Đăng tin tuyển dụng',
    'jobs.applyBtn': 'Ứng tuyển ngay',
    'jobs.urgent': 'Tuyển gấp',
  },
};

export const getTranslation = (lang: Language, key: string): string => {
  return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['ko']?.[key] || key;
};
