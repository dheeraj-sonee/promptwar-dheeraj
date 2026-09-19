import React from 'react';
import { AccessibilitySettings } from '../types';
import { speakText } from '../utils/speech';

interface PreferencesViewProps {
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
}

export const PreferencesView: React.FC<PreferencesViewProps> = ({
  settings,
  onUpdateSettings,
}) => {
  return (
    <div className="flex flex-col w-full text-[#0d1c2f] pb-36">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#cbd5e1] shadow-md mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-14 h-14 rounded-2xl bg-[#1d4ed8] text-white flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[34px]">settings_accessibility</span>
          </span>
          <div>
            <h1 className="text-[32px] sm:text-[38px] font-extrabold text-[#0d1c2f] leading-none">
              Preferences & Accessibility
            </h1>
            <span className="text-[17px] text-[#45464d] font-semibold mt-1 inline-block">
              Customized comfort, vision contrast, speech pitch, and safety settings
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            speakText(
              `Preferences settings for Eleanor. Text size is ${settings.fontScale} percent. Contrast theme is ${settings.theme}. Speech speed is ${settings.speechSpeed}x. Audio boost is ${settings.audioBoost ? 'active' : 'off'}.`
            );
          }}
          className="min-h-[52px] px-5 rounded-2xl bg-[#eff4ff] hover:bg-[#dde9ff] text-[#1d4ed8] font-bold text-[18px] flex items-center gap-2 border border-[#dde9ff]"
        >
          <span className="material-symbols-outlined text-[24px]">volume_up</span>
          <span>Read Current Settings</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Section 1: Visual & Text Size */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#cbd5e1] shadow-md">
          <h2 className="text-[24px] font-bold text-[#0d1c2f] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1d4ed8]">format_size</span>
            Text Size & Display Scale
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[100, 115, 130].map((scale) => (
              <button
                key={scale}
                type="button"
                onClick={() => {
                  onUpdateSettings({ fontScale: scale as any });
                  speakText(`Text size set to ${scale} percent.`);
                }}
                className={`min-h-[64px] p-4 rounded-2xl border-2 font-bold text-[20px] flex items-center justify-between transition-all ${
                  settings.fontScale === scale
                    ? 'border-[#1d4ed8] bg-[#eff4ff] text-[#1d4ed8] shadow-sm'
                    : 'border-[#cbd5e1] hover:bg-[#f8f9ff] text-[#0d1c2f]'
                }`}
              >
                <span>{scale === 100 ? 'Standard (100%)' : scale === 115 ? 'Large (115%)' : 'Extra Large (130%)'}</span>
                {settings.fontScale === scale && (
                  <span className="material-symbols-outlined text-[#1d4ed8]">check_circle</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Visual Themes & Contrast */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#cbd5e1] shadow-md">
          <h2 className="text-[24px] font-bold text-[#0d1c2f] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1d4ed8]">contrast</span>
            Visual Theme & Color Contrast
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => {
                onUpdateSettings({ theme: 'standard' });
                speakText('Standard comfort theme enabled.');
              }}
              className={`p-5 rounded-2xl border-2 text-left transition-all ${
                settings.theme === 'standard'
                  ? 'border-[#1d4ed8] bg-[#eff4ff]'
                  : 'border-[#cbd5e1] hover:bg-[#f8f9ff]'
              }`}
            >
              <span className="text-[20px] font-bold text-[#0d1c2f] block">Comfort Blue & White</span>
              <span className="text-[15px] text-[#45464d] block mt-1">
                Gentle soft daylight hues, optimal for daily reading
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                onUpdateSettings({ theme: 'high-contrast' });
                speakText('Sharp high contrast theme enabled.');
              }}
              className={`p-5 rounded-2xl border-2 text-left transition-all ${
                settings.theme === 'high-contrast'
                  ? 'border-[#1d4ed8] bg-[#eff4ff]'
                  : 'border-[#cbd5e1] hover:bg-[#f8f9ff]'
              }`}
            >
              <span className="text-[20px] font-bold text-[#0d1c2f] block">Sharp High Contrast</span>
              <span className="text-[15px] text-[#45464d] block mt-1">
                Bold 7:1 ratio dark borders and crisp dark navy backgrounds
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                onUpdateSettings({ theme: 'yellow-black' });
                speakText('Cataract yellow on black contrast enabled.');
              }}
              className={`p-5 rounded-2xl border-2 text-left transition-all ${
                settings.theme === 'yellow-black'
                  ? 'border-[#1d4ed8] bg-[#eff4ff]'
                  : 'border-[#cbd5e1] hover:bg-[#f8f9ff]'
              }`}
            >
              <span className="text-[20px] font-bold text-[#0d1c2f] block">Cataract Yellow on Black</span>
              <span className="text-[15px] text-[#45464d] block mt-1">
                Maximum visibility for macular degeneration and low-vision
              </span>
            </button>
          </div>
        </div>

        {/* Section 3: Speech & Hearing Aids */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#cbd5e1] shadow-md">
          <h2 className="text-[24px] font-bold text-[#0d1c2f] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#1d4ed8]">hearing</span>
            Speech Reading & Hearing Support
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#eff4ff] rounded-2xl border border-[#dde9ff] flex items-center justify-between">
              <div>
                <span className="text-[19px] font-bold text-[#0d1c2f] block">
                  Audio Boost 150%
                </span>
                <span className="text-[15px] text-[#45464d]">
                  Optimized for Bluetooth hearing aids and clearer consonants
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const nextVal = !settings.audioBoost;
                  onUpdateSettings({ audioBoost: nextVal });
                  speakText(nextVal ? 'Audio boost 150 percent turned on.' : 'Audio boost turned off.');
                }}
                className={`min-h-[48px] px-5 rounded-xl font-bold text-[17px] border transition-all ${
                  settings.audioBoost
                    ? 'bg-[#1d4ed8] text-white border-[#1d4ed8]'
                    : 'bg-white text-[#0d1c2f] border-[#cbd5e1]'
                }`}
              >
                {settings.audioBoost ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="p-4 bg-[#eff4ff] rounded-2xl border border-[#dde9ff] flex items-center justify-between">
              <div>
                <span className="text-[19px] font-bold text-[#0d1c2f] block">
                  Live Captions & Subtitles
                </span>
                <span className="text-[15px] text-[#45464d]">
                  Display real-time subtitles across all video calls and voice notes
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const nextVal = !settings.liveCaptions;
                  onUpdateSettings({ liveCaptions: nextVal });
                  speakText(nextVal ? 'Live captions turned on.' : 'Live captions turned off.');
                }}
                className={`min-h-[48px] px-5 rounded-xl font-bold text-[17px] border transition-all ${
                  settings.liveCaptions
                    ? 'bg-[#1d4ed8] text-white border-[#1d4ed8]'
                    : 'bg-white text-[#0d1c2f] border-[#cbd5e1]'
                }`}
              >
                {settings.liveCaptions ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: Emergency Contacts Chain */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#cbd5e1] shadow-md">
          <h2 className="text-[24px] font-bold text-[#0d1c2f] mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ba1a1a]">sos</span>
            Emergency SOS Dispatch Order
          </h2>
          <p className="text-[17px] text-[#45464d] mb-4">
            In the event of an emergency trigger, CompanionCare AI immediately dials in this order:
          </p>

          <ol className="space-y-3">
            <li className="p-4 bg-[#eff4ff] rounded-2xl flex items-center gap-4 border border-[#dde9ff]">
              <span className="w-9 h-9 rounded-full bg-[#1d4ed8] text-white flex items-center justify-center font-bold text-[18px]">
                1
              </span>
              <div>
                <span className="text-[19px] font-bold text-[#0d1c2f] block">
                  Local 911 Emergency Services
                </span>
                <span className="text-[15px] text-[#45464d]">
                  Transmits GPS address and current Eleanor Vance medical file
                </span>
              </div>
            </li>

            <li className="p-4 bg-[#eff4ff] rounded-2xl flex items-center gap-4 border border-[#dde9ff]">
              <span className="w-9 h-9 rounded-full bg-[#1d4ed8] text-white flex items-center justify-center font-bold text-[18px]">
                2
              </span>
              <div>
                <span className="text-[19px] font-bold text-[#0d1c2f] block">
                  Daughter Sarah Vance (Primary Caregiver)
                </span>
                <span className="text-[15px] text-[#45464d]">
                  Immediate high-priority breakthrough phone call and SMS alert
                </span>
              </div>
            </li>

            <li className="p-4 bg-[#eff4ff] rounded-2xl flex items-center gap-4 border border-[#dde9ff]">
              <span className="w-9 h-9 rounded-full bg-[#1d4ed8] text-white flex items-center justify-center font-bold text-[18px]">
                3
              </span>
              <div>
                <span className="text-[19px] font-bold text-[#0d1c2f] block">
                  Dr. Harrison Cardiology Clinic
                </span>
                <span className="text-[15px] text-[#45464d]">
                  On-call triage dispatch notified
                </span>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};
