import React, { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import {
  evaluateTowerTelemetry,
  TelemetryReading,
  DualEngineResult,
} from '../utils/signalModel';
import { useElementScrollProgress } from '../utils/useScrollProgress';
import {
  Smartphone,
  Radio,
  ShieldAlert,
  ShieldCheck,
  Activity,
  AlertTriangle,
  FileCheck2,
  Send,
  Zap,
  Sliders,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

type AttackType = 'normal' | 'cipher_downgrade' | 'rogue_lac_power';

export const SignalStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeStage, setActiveStage] = useState<number>(1);
  const [selectedAttack, setSelectedAttack] = useState<AttackType>('cipher_downgrade');
  const [complaintSubmitted, setComplaintSubmitted] = useState<boolean>(false);
  const [showEvidenceModal, setShowEvidenceModal] = useState<boolean>(false);

  // Track scroll through section to scrub stages 1 to 4
  const scrollRatio = useElementScrollProgress(containerRef, 0.1, 0.9);

  useEffect(() => {
    const computedStage = Math.min(4, Math.max(1, Math.ceil(scrollRatio * 4)));
    setActiveStage(computedStage);
  }, [scrollRatio]);

  // Handle horizontal mouse scrub over scene on desktop
  const handleSceneMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const stage = Math.min(4, Math.max(1, Math.ceil(ratio * 4)));
    setActiveStage(stage);
  };

  // Telemetry simulations
  const telemetryDataMap: Record<AttackType, TelemetryReading> = {
    normal: {
      cellId: '0x1A4F',
      lac: '0x0289',
      frequencyMHz: 1805.2,
      rssiDbm: -78,
      cipher: 'EEA2',
      powerDeviationDb: 0.4,
      isRegisteredLac: true,
    },
    cipher_downgrade: {
      cellId: '0x32D1',
      lac: '0x4E12',
      frequencyMHz: 1805.2,
      rssiDbm: -58,
      cipher: 'A5/0',
      powerDeviationDb: 6.2,
      isRegisteredLac: true,
    },
    rogue_lac_power: {
      cellId: '0x99AA',
      lac: '0x90F1',
      frequencyMHz: 1805.2,
      rssiDbm: -42,
      cipher: 'A5/0',
      powerDeviationDb: 14.5,
      isRegisteredLac: false,
    },
  };

  const currentReading = telemetryDataMap[selectedAttack];
  const engineResult: DualEngineResult = evaluateTowerTelemetry(currentReading);

  return (
    <section
      id="signal-story"
      ref={containerRef}
      className="relative min-h-[220vh] bg-[#000000] border-t border-white/5 py-16 px-6 md:px-12"
    >
      {/* Sticky Story Board pinned while scrolling */}
      <div className="sticky top-20 max-w-7xl mx-auto w-full pt-4 pb-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111113] border border-white/10 text-xs font-mono tracking-widest text-[#7FA6E0] uppercase mb-3">
              <Activity className="w-3.5 h-3.5" />
              <span>Scroll-Scrubbed Signal Story</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-white mb-2">
              {PORTFOLIO_DATA.triShield.title}
            </h2>
            <p className="text-sm md:text-base text-[#9AA3AF]">
              {PORTFOLIO_DATA.triShield.subtitle}{' '}
              <span className="text-[#7FA6E0] font-mono text-xs">
                [{PORTFOLIO_DATA.triShield.badge}]
              </span>
            </p>
          </div>

          {/* Illustrative Disclaimer Notice */}
          <div className="px-4 py-2 rounded-xl bg-[#111113] border border-white/8 text-[11px] text-[#9AA3AF] max-w-sm">
            {PORTFOLIO_DATA.triShield.disclaimer}
          </div>
        </div>

        {/* 4-Stage Scrub Indicator Tabs */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-8">
          {PORTFOLIO_DATA.triShield.stages.map((stg) => {
            const isActive = activeStage === stg.id;
            const isPassed = activeStage > stg.id;
            return (
              <button
                key={stg.id}
                type="button"
                onClick={() => setActiveStage(stg.id)}
                className={`py-3 px-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#111113] border-[#7FA6E0] shadow-md shadow-[#7FA6E0]/10'
                    : isPassed
                    ? 'bg-[#0A0A0B] border-white/20 text-[#F2F4F7]'
                    : 'bg-[#0A0A0B]/60 border-white/5 text-[#9AA3AF]/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#7FA6E0]">
                    Stage 0{stg.id}
                  </span>
                  {isPassed && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div
                  className={`text-xs sm:text-sm font-medium ${
                    isActive ? 'text-white' : 'text-[#9AA3AF]'
                  }`}
                >
                  {stg.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Signal Flow Canvas / Diagram Container */}
        <div
          onMouseMove={handleSceneMouseMove}
          className="relative bg-[#0A0A0B] rounded-3xl border border-white/10 p-6 sm:p-10 mb-8 overflow-hidden"
        >
          {/* Path Signal Line: Phone -> Cell Tower -> Shield */}
          <div className="relative py-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
            {/* 1. Phone Node */}
            <div className="flex flex-col items-center text-center z-10">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 border ${
                  activeStage >= 1
                    ? 'bg-[#111113] border-[#7FA6E0] text-[#7FA6E0] shadow-lg shadow-[#7FA6E0]/20'
                    : 'bg-[#0A0A0B] border-white/10 text-[#9AA3AF]'
                }`}
              >
                <Smartphone className="w-8 h-8" />
              </div>
              <span className="text-xs font-mono mt-3 text-white">Mobile Terminal</span>
              <span className="text-[10px] text-[#9AA3AF]">Baseband RF Modem</span>
            </div>

            {/* Connecting Signal Beam 1 */}
            <div className="flex-1 w-full md:w-auto h-1 md:h-1 bg-white/10 relative overflow-hidden rounded-full">
              <div
                className={`h-full transition-all duration-700 rounded-full ${
                  activeStage >= 2
                    ? 'w-full bg-gradient-to-r from-[#7FA6E0] to-[#F0B15A]'
                    : activeStage === 1
                    ? 'w-3/4 bg-[#7FA6E0] animate-pulse'
                    : 'w-0'
                }`}
              />
            </div>

            {/* 2. Cell Tower Node (Turns Amber on Stage 2 / Rogue Alert) */}
            <div className="flex flex-col items-center text-center z-10">
              <div
                className={`w-18 h-18 rounded-2xl flex items-center justify-center transition-all duration-500 border ${
                  activeStage >= 2
                    ? 'bg-[#1a140c] border-[#F0B15A] text-[#F0B15A] shadow-xl shadow-[#F0B15A]/20 scale-105'
                    : activeStage === 1
                    ? 'bg-[#111113] border-[#7FA6E0]/50 text-[#7FA6E0]'
                    : 'bg-[#0A0A0B] border-white/10 text-[#9AA3AF]'
                }`}
              >
                <Radio className="w-9 h-9" />
              </div>
              <span className="text-xs font-mono mt-3 text-white">
                Cell Tower (BTS)
              </span>
              <span
                className={`text-[10px] font-mono ${
                  activeStage >= 2 ? 'text-[#F0B15A] font-semibold' : 'text-[#9AA3AF]'
                }`}
              >
                {activeStage >= 2 ? 'Intercept Candidate' : '1805.2 MHz Beacon'}
              </span>
            </div>

            {/* Connecting Signal Beam 2 */}
            <div className="flex-1 w-full md:w-auto h-1 md:h-1 bg-white/10 relative overflow-hidden rounded-full">
              <div
                className={`h-full transition-all duration-700 rounded-full ${
                  activeStage >= 4
                    ? 'w-full bg-[#7FA6E0]'
                    : activeStage === 3
                    ? 'w-1/2 bg-[#7FA6E0] animate-pulse'
                    : 'w-0'
                }`}
              />
            </div>

            {/* 3. Shield Node */}
            <div className="flex flex-col items-center text-center z-10">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 border ${
                  activeStage === 4
                    ? 'bg-[#101b2b] border-[#7FA6E0] text-[#7FA6E0] shadow-xl shadow-[#7FA6E0]/30 scale-110'
                    : activeStage === 3
                    ? 'bg-[#111113] border-[#7FA6E0]/50 text-[#7FA6E0]'
                    : 'bg-[#0A0A0B] border-white/10 text-[#9AA3AF]'
                }`}
              >
                {activeStage === 4 ? (
                  <ShieldCheck className="w-8 h-8 text-[#7FA6E0]" />
                ) : (
                  <ShieldAlert className="w-8 h-8 text-[#9AA3AF]" />
                )}
              </div>
              <span className="text-xs font-mono mt-3 text-white">TriShield Engine</span>
              <span className="text-[10px] text-[#9AA3AF]">
                {activeStage === 4 ? 'Tamper Proof Sealed' : 'Dual-Engine Model'}
              </span>
            </div>
          </div>

          {/* Stage Detail Display Panel */}
          <div className="mt-8 pt-8 border-t border-white/8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 text-left">
              {/* Question Banner on Stage 2 */}
              {activeStage === 2 && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#F0B15A]/15 border border-[#F0B15A]/40 text-[#F0B15A] text-xs font-semibold mb-4 animate-pulse">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Is this tower genuine or rogue?</span>
                </div>
              )}

              <h4 className="text-xl font-display font-medium text-white mb-2">
                {PORTFOLIO_DATA.triShield.stages[activeStage - 1].title}
              </h4>
              <p className="text-sm text-[#F2F4F7] leading-relaxed mb-4">
                {PORTFOLIO_DATA.triShield.stages[activeStage - 1].description}
              </p>
              <div className="p-3.5 rounded-xl bg-[#111113] border border-white/5 text-xs font-mono text-[#9AA3AF] leading-relaxed">
                {PORTFOLIO_DATA.triShield.stages[activeStage - 1].technicalDetails}
              </div>

              {/* Action for Stage 4 */}
              {activeStage === 4 && (
                <div className="mt-5 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setShowEvidenceModal(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7FA6E0] text-[#000000] text-xs font-semibold hover:bg-[#9BBDF2] transition-colors cursor-pointer"
                  >
                    <FileCheck2 className="w-4 h-4" />
                    <span>View Evidence & File Complaint</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right: Technical Telemetry & Scores */}
            <div className="md:col-span-5 bg-[#111113] rounded-2xl border border-white/8 p-5 text-left">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#7FA6E0]">
                  Telemetry Inspector
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#9AA3AF]">
                  RF Band 3 (1.8 GHz)
                </span>
              </div>

              {/* Stage 3/4 Dual Engine Scoring Visualization */}
              {activeStage >= 3 ? (
                <div className="space-y-4 mb-4">
                  {/* Rule-based 70 pts */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#F2F4F7]">1. Rule-Based Checks</span>
                      <span className="font-mono text-[#7FA6E0]">
                        {engineResult.ruleScore} / 70 pts
                      </span>
                    </div>
                    <div className="h-2 w-full bg-black rounded-full overflow-hidden border border-white/10">
                      <div
                        className="h-full bg-[#7FA6E0] transition-all duration-500"
                        style={{ width: `${(engineResult.ruleScore / 70) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Isolation Forest 30 pts */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#F2F4F7]">2. Isolation Forest Anomaly Model</span>
                      <span className="font-mono text-[#7FA6E0]">
                        {engineResult.anomalyScore} / 30 pts
                      </span>
                    </div>
                    <div className="h-2 w-full bg-black rounded-full overflow-hidden border border-white/10">
                      <div
                        className="h-full bg-[#3F78DB] transition-all duration-500"
                        style={{ width: `${(engineResult.anomalyScore / 30) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Total Index */}
                  <div className="pt-3 border-t border-white/10 flex justify-between items-center">
                    <div>
                      <div className="text-xs text-[#9AA3AF]">Computed Risk Score</div>
                      <div className="text-xl font-display font-semibold text-white">
                        {engineResult.totalRiskScore} / 100
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-mono font-medium border ${
                        engineResult.isRogue
                          ? 'bg-[#F0B15A]/15 text-[#F0B15A] border-[#F0B15A]/40'
                          : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40'
                      }`}
                    >
                      {engineResult.verdict}
                    </div>
                  </div>
                </div>
              ) : (
                /* Stage 1 & 2 Metrics */
                <div className="space-y-3">
                  {PORTFOLIO_DATA.triShield.stages[activeStage - 1].metrics?.map((m, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center py-1.5 border-b border-white/5 text-xs"
                    >
                      <span className="text-[#9AA3AF]">{m.label}</span>
                      <span className="font-mono text-white">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feature List & Interactive Attack Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Features */}
          <div className="lg:col-span-7 bg-[#0A0A0B] rounded-2xl border border-white/8 p-6 text-left">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#7FA6E0] mb-4">
              Core Architectural Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PORTFOLIO_DATA.triShield.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[#111113] border border-white/5 text-xs text-[#F2F4F7]"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7FA6E0]" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Attack Simulation Sandbox */}
          <div className="lg:col-span-5 bg-[#0A0A0B] rounded-2xl border border-white/8 p-6 text-left">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#7FA6E0]" />
                <h4 className="text-xs font-mono uppercase tracking-wider text-white">
                  Attack Sandbox
                </h4>
              </div>
              <span className="text-[10px] font-mono text-[#9AA3AF]">Interactive</span>
            </div>

            <p className="text-xs text-[#9AA3AF] mb-4">
              Simulate baseband telemetry injects to test TriShield’s rule engine & Isolation Forest:
            </p>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedAttack('normal');
                  setActiveStage(3);
                }}
                className={`w-full p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer flex justify-between items-center ${
                  selectedAttack === 'normal'
                    ? 'bg-[#111113] border-[#7FA6E0] text-white'
                    : 'bg-[#111113]/50 border-white/5 text-[#9AA3AF]'
                }`}
              >
                <span>Legitimate Tower (LTE / 4G)</span>
                <span className="text-[10px] font-mono text-emerald-400">Genuine</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedAttack('cipher_downgrade');
                  setActiveStage(3);
                }}
                className={`w-full p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer flex justify-between items-center ${
                  selectedAttack === 'cipher_downgrade'
                    ? 'bg-[#111113] border-[#F0B15A] text-white'
                    : 'bg-[#111113]/50 border-white/5 text-[#9AA3AF]'
                }`}
              >
                <span>Cipher Downgrade (A5/0 Null)</span>
                <span className="text-[10px] font-mono text-[#F0B15A]">Rogue Alert</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedAttack('rogue_lac_power');
                  setActiveStage(3);
                }}
                className={`w-full p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer flex justify-between items-center ${
                  selectedAttack === 'rogue_lac_power'
                    ? 'bg-[#111113] border-[#F0B15A] text-white'
                    : 'bg-[#111113]/50 border-white/5 text-[#9AA3AF]'
                }`}
              >
                <span>Spoofed BTS + Power Spike</span>
                <span className="text-[10px] font-mono text-[#F0B15A]">+14dBm Overpower</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tamper-Proof Evidence & File Complaint Modal */}
      {showEvidenceModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0A0A0B] border border-white/15 rounded-3xl max-w-lg w-full p-6 sm:p-8 text-left shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-[#F0B15A]" />
                <h3 className="text-lg font-medium text-white">
                  TriShield Security Dossier
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowEvidenceModal(false)}
                className="text-[#9AA3AF] hover:text-white p-1 text-sm font-mono cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            <p className="text-xs text-[#9AA3AF] leading-relaxed mb-4">
              Cryptographically signed baseband telemetry ready for transmission to the national
              cybercrime reporting repository.
            </p>

            <div className="p-4 rounded-xl bg-[#111113] border border-white/8 space-y-2 mb-6 font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-[#9AA3AF]">Target Cell ID:</span>
                <span className="text-white">{currentReading.cellId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9AA3AF]">Commanded Cipher:</span>
                <span className="text-[#F0B15A]">{currentReading.cipher}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9AA3AF]">RF Power Delta:</span>
                <span className="text-white">+{currentReading.powerDeviationDb} dBm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9AA3AF]">Tamper Seal:</span>
                <span className="text-[#7FA6E0] truncate max-w-[220px]">
                  {engineResult.reportHash}
                </span>
              </div>
            </div>

            {complaintSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Evidence packet compiled and dispatched to regulatory reporting channel.</span>
              </div>
            ) : (
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEvidenceModal(false)}
                  className="px-4 py-2 rounded-full bg-[#111113] text-[#9AA3AF] text-xs hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setComplaintSubmitted(true)}
                  className="px-5 py-2 rounded-full bg-[#7FA6E0] text-black text-xs font-semibold hover:bg-[#9BBDF2] flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Complaint</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
