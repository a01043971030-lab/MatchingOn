import React, { useMemo } from 'react';
import { KOREA_REGIONS } from '../data/regionsData';
import { Language } from '../types';
import { getTranslation } from '../data/translations';
import { MapPin, RotateCcw } from 'lucide-react';

export interface SelectedRegion {
  province: string; // '전국' or province name like '경기도', '전라남도'
  county: string;   // '전체' or county name like '화성시', '해남군'
}

interface RegionSelectorProps {
  selectedRegion: SelectedRegion;
  onChangeRegion: (region: SelectedRegion) => void;
  resultCount?: number;
  label?: string;
  compact?: boolean;
  language?: Language;
}

export const RegionSelector: React.FC<RegionSelectorProps> = ({
  selectedRegion,
  onChangeRegion,
  resultCount,
  label,
  language = 'ko',
}) => {
  const t = (key: string) => getTranslation(language, key);
  const displayLabel = label || t('region.label');
  // Available counties for currently selected province
  const availableCounties = useMemo(() => {
    if (selectedRegion.province === '전국') {
      return ['전체'];
    }
    const found = KOREA_REGIONS.find((r) => r.province === selectedRegion.province);
    return found ? found.counties : ['전체'];
  }, [selectedRegion.province]);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const prov = e.target.value;
    onChangeRegion({
      province: prov,
      county: '전체',
    });
  };

  const handleCountyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cnt = e.target.value;
    onChangeRegion({
      ...selectedRegion,
      county: cnt,
    });
  };

  const handleReset = () => {
    onChangeRegion({
      province: '전국',
      county: '전체',
    });
  };

  const handleQuickChip = (prov: string, cnt: string) => {
    onChangeRegion({
      province: prov,
      county: cnt,
    });
  };

  const isNationwide = selectedRegion.province === '전국' && selectedRegion.county === '전체';

  return (
    <div className="bg-white border-2 border-slate-800 rounded-xl p-3 shadow-xs text-slate-900">
      {/* Main Bar: Responsive layout for Desktop & Mobile */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
        {/* Left Section: Label and 2 Dropdown Selects */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1 min-w-0">
          <div className="flex items-center justify-between sm:justify-start gap-1.5 text-xs font-black text-slate-900 shrink-0">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center">
                <MapPin className="w-3.5 h-3.5 text-orange-400" />
              </div>
              <span className="whitespace-nowrap">{displayLabel}</span>
            </div>

            {/* Mobile-only selected badge next to title */}
            <div className="sm:hidden flex items-center gap-1 text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              <span className="text-blue-700 truncate max-w-[130px]">
                {isNationwide ? t('region.allNation') : `${selectedRegion.province.slice(0, 2)} ${selectedRegion.county}`}
              </span>
              {!isNationwide && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-slate-500 hover:text-slate-900 ml-1 p-0.5"
                  title={t('region.reset')}
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* 2 Dropdown Selectors - 2 cols on mobile, inline flex on desktop */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
            {/* Dropdown 1: 시·도 (17개 광역시도) */}
            <div className="relative w-full sm:w-[130px]">
              <select
                value={selectedRegion.province}
                onChange={handleProvinceChange}
                aria-label="시·도 선택"
                className="w-full px-2.5 py-2 sm:py-1.5 text-xs font-bold bg-slate-50 border-2 border-slate-300 hover:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer text-slate-900 h-10 sm:h-auto"
              >
                <option value="전국">전국 (전체)</option>
                {KOREA_REGIONS.map((r) => (
                  <option key={r.province} value={r.province}>
                    {r.province}
                  </option>
                ))}
              </select>
            </div>

            {/* Dropdown 2: 세부 시·군·구 (군 단위 전체 포함) */}
            <div className="relative w-full sm:w-[130px]">
              <select
                value={selectedRegion.county}
                onChange={handleCountyChange}
                disabled={selectedRegion.province === '전국'}
                aria-label="시·군·구 선택"
                className={`w-full px-2.5 py-2 sm:py-1.5 text-xs font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer h-10 sm:h-auto ${
                  selectedRegion.province === '전국'
                    ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                    : 'bg-white text-slate-900 border-slate-800 shadow-xs'
                }`}
              >
                {availableCounties.map((c) => (
                  <option key={c} value={c}>
                    {c === '전체' ? `${selectedRegion.province} 전체` : c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right Section: Desktop Selection Display & Reset */}
        <div className="hidden sm:flex items-center justify-end gap-2 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1.5 rounded-lg">
            <span className="text-[11px] text-slate-400 font-normal">선택:</span>
            <span className="text-blue-700 truncate max-w-[160px]">
              {isNationwide
                ? '전국 전체'
                : `${selectedRegion.province.replace('특별자치도', '').replace('광역시', '').replace('특별시', '')} ${selectedRegion.county !== '전체' ? selectedRegion.county : '전체'}`}
            </span>
            {resultCount !== undefined && (
              <span className="text-orange-600 font-mono tabular-nums">
                ({resultCount}건)
              </span>
            )}
          </div>

          {!isNationwide && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-lg transition-colors cursor-pointer shrink-0"
              title="전국 전체로 초기화"
            >
              <RotateCcw className="w-3 h-3" />
              <span>초기화</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick 1-Click Popular Counties - Touch-friendly swipeable on mobile */}
      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] overflow-x-auto scrollbar-none pb-0.5 -mx-1 px-1 sm:mx-0 sm:px-0 sm:flex-wrap">
        <span className="text-slate-400 font-semibold shrink-0">인기 군/시:</span>
        {[
          { prov: '전라남도', cnt: '해남군', label: '전남 해남군' },
          { prov: '전라남도', cnt: '영암군', label: '전남 영암군' },
          { prov: '경기도', cnt: '화성시', label: '경기 화성시' },
          { prov: '경기도', cnt: '양평군', label: '경기 양평군' },
          { prov: '충청북도', cnt: '진천군', label: '충북 진천군' },
          { prov: '충청남도', cnt: '예산군', label: '충남 예산군' },
          { prov: '경기도', cnt: '평택시', label: '경기 평택시' },
        ].map((item, idx) => {
          const isActive =
            selectedRegion.province === item.prov && selectedRegion.county === item.cnt;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleQuickChip(item.prov, item.cnt)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer border shrink-0 min-h-[30px] sm:min-h-0 flex items-center justify-center ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 font-bold'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300 active:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
