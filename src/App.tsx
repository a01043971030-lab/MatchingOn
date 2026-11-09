import React, { useState } from 'react';
import { TabType, Language, ChoiceWorker, JobPosting, UserProfile } from './types';
import { Navbar } from './components/Navbar';
import { DashboardTab } from './components/DashboardTab';
import { ForeignWorkersTab } from './components/ForeignWorkersTab';
import { ChoiceMatchingTab } from './components/ChoiceMatchingTab';
import { GeneralJobsTab } from './components/GeneralJobsTab';
import { ChoiceModal } from './components/ChoiceModal';
import { ForeignRequestModal } from './components/ForeignRequestModal';
import { JobApplyModal } from './components/JobApplyModal';
import { QuickCounselModal } from './components/QuickCounselModal';
import { NewJobModal } from './components/NewJobModal';
import { AuthModal } from './components/AuthModal';
import { UserProfileDrawer } from './components/UserProfileDrawer';
import { Footer } from './components/Footer';
import { Home, Users, UserCheck, Briefcase } from 'lucide-react';
import { getTranslation } from './data/translations';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [language, setLanguage] = useState<Language>('ko');
  const t = (key: string) => getTranslation(language, key);

  // User Auth State (구직자 / 구인자)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);

  // Modal States
  const [choiceModalWorker, setChoiceModalWorker] = useState<ChoiceWorker | null>(null);
  const [foreignRequestData, setForeignRequestData] = useState<any | null>(null);
  const [applyModalJob, setApplyModalJob] = useState<JobPosting | null>(null);
  const [counselModalOpen, setCounselModalOpen] = useState(false);
  const [newJobModalOpen, setNewJobModalOpen] = useState(false);

  // Tab change handler (scrolls smoothly to top)
  const handleTabChange = (tab: TabType) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Choice button click handler
  const handleSelectChoice = (worker: ChoiceWorker) => {
    setChoiceModalWorker(worker);
  };

  // Foreign enterprise matching request submission
  const handleForeignRequestSubmit = (data: any) => {
    setForeignRequestData(data);
  };

  // Auth Handlers
  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleToggleAvailability = () => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      isAvailable: !currentUser.isAvailable,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6FB] font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Navigation Bar with Dual Role Login Support */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleTabChange}
        language={language}
        onToggleLanguage={setLanguage}
        onOpenQuickCounsel={() => setCounselModalOpen(true)}
        currentUser={currentUser}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onOpenProfileDrawer={() => setProfileDrawerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-10">
        {currentTab === 'dashboard' && (
          <DashboardTab
            onNavigateTab={handleTabChange}
            onOpenCounsel={() => setCounselModalOpen(true)}
            language={language}
          />
        )}

        {currentTab === 'foreign' && (
          <ForeignWorkersTab
            onRequestSubmitted={handleForeignRequestSubmit}
            onOpenCounsel={() => setCounselModalOpen(true)}
            language={language}
          />
        )}

        {currentTab === 'choice' && (
          <ChoiceMatchingTab
            onSelectChoice={handleSelectChoice}
            onOpenCounsel={() => setCounselModalOpen(true)}
            language={language}
          />
        )}

        {currentTab === 'jobs' && (
          <GeneralJobsTab
            onApplyJob={(job) => setApplyModalJob(job)}
            onPostNewJob={() => setNewJobModalOpen(true)}
            language={language}
          />
        )}
      </main>

      {/* Footer with mobile bottom clearance */}
      <div className="pb-16 md:pb-0">
        <Footer
          onSelectTab={handleTabChange}
          onOpenCounsel={() => setCounselModalOpen(true)}
          language={language}
        />
      </div>

      {/* Mobile Sticky Bottom Tab Bar - Ergonomic 44px+ touch targets */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B1528]/95 backdrop-blur-md border-t border-slate-800 px-2 shadow-2xl flex justify-around items-center h-16"
        aria-label="모바일 하단 내비게이션"
      >
        <button
          onClick={() => handleTabChange('dashboard')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[10px] font-bold transition-all cursor-pointer min-w-[62px] min-h-[44px] active:scale-95 ${
            currentTab === 'dashboard' ? 'text-blue-400 font-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>{t('bottom.home')}</span>
        </button>

        <button
          onClick={() => handleTabChange('foreign')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[10px] font-bold transition-all cursor-pointer min-w-[62px] min-h-[44px] active:scale-95 ${
            currentTab === 'foreign' ? 'text-blue-400 font-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-5 h-5 mb-0.5" />
          <span>{t('bottom.foreign')}</span>
        </button>

        <button
          onClick={() => handleTabChange('choice')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[10px] font-bold transition-all cursor-pointer min-w-[62px] min-h-[44px] active:scale-95 ${
            currentTab === 'choice' ? 'text-orange-400 font-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          <div className="relative">
            <UserCheck className="w-5 h-5 mb-0.5" />
            <span className="w-2 h-2 bg-orange-500 rounded-full absolute -top-0.5 -right-0.5" />
          </div>
          <span>{t('bottom.choice')}</span>
        </button>

        <button
          onClick={() => handleTabChange('jobs')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[10px] font-bold transition-all cursor-pointer min-w-[62px] min-h-[44px] active:scale-95 ${
            currentTab === 'jobs' ? 'text-blue-400 font-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-5 h-5 mb-0.5" />
          <span>{t('bottom.jobs')}</span>
        </button>
      </nav>

      {/* --- Modals & Drawers --- */}
      {/* Dual Role Auth Modal (구직자 / 구인자 로그인 & 회원가입) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* User Profile / Status Drawer */}
      <UserProfileDrawer
        isOpen={profileDrawerOpen}
        onClose={() => setProfileDrawerOpen(false)}
        user={currentUser}
        onLogout={handleLogout}
        onToggleAvailability={handleToggleAvailability}
        onOpenNewJob={() => setNewJobModalOpen(true)}
      />

      {/* 1. Choice Matching Modal (Required Core SMS Dispatch) */}
      <ChoiceModal
        worker={choiceModalWorker}
        onClose={() => setChoiceModalWorker(null)}
      />

      {/* 2. Foreign Worker Matching Request Modal */}
      <ForeignRequestModal
        isOpen={!!foreignRequestData}
        onClose={() => setForeignRequestData(null)}
        requestData={foreignRequestData}
      />

      {/* 3. General Job Apply Modal */}
      <JobApplyModal
        job={applyModalJob}
        onClose={() => setApplyModalJob(null)}
      />

      {/* 4. Quick Counsel Modal */}
      <QuickCounselModal
        isOpen={counselModalOpen}
        onClose={() => setCounselModalOpen(false)}
      />

      {/* 5. New Job Post Modal */}
      <NewJobModal
        isOpen={newJobModalOpen}
        onClose={() => setNewJobModalOpen(false)}
        onJobCreated={() => {}}
      />
    </div>
  );
}
