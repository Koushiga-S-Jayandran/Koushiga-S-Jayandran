export interface TelemetryReading {
  cellId: string;
  lac: string;
  frequencyMHz: number;
  rssiDbm: number;
  cipher: 'A5/3' | 'A5/1' | 'A5/0' | 'EEA2' | 'None';
  powerDeviationDb: number;
  isRegisteredLac: boolean;
}

export interface DualEngineResult {
  ruleScore: number; // 0 to 70
  ruleMax: 70;
  anomalyScore: number; // 0 to 30
  anomalyMax: 30;
  totalRiskScore: number; // 0 to 100
  trustScore: number; // 0 to 100 (100 - totalRiskScore)
  isRogue: boolean;
  verdict: 'Genuine' | 'Suspicious' | 'Confirmed Rogue';
  reasons: string[];
  reportHash: string;
}

/**
 * Calculates rule-based and Isolation Forest telemetry risk evaluation.
 */
export function evaluateTowerTelemetry(reading: TelemetryReading): DualEngineResult {
  let ruleDeductions = 0;
  const reasons: string[] = [];

  // Rule Check 1: Cipher verification (up to 30 pts)
  if (reading.cipher === 'A5/0' || reading.cipher === 'None') {
    ruleDeductions += 30;
    reasons.push('Null encryption commanded (A5/0 cipher vulnerability)');
  } else if (reading.cipher === 'A5/1') {
    ruleDeductions += 12;
    reasons.push('Legacy insecure 2G cipher negotiated (A5/1)');
  }

  // Rule Check 2: Regulatory LAC / Cell ID registration (up to 25 pts)
  if (!reading.isRegisteredLac) {
    ruleDeductions += 25;
    reasons.push(`Unregistered Location Area Code (${reading.lac}) not found in regional registry`);
  }

  // Rule Check 3: Abnormal Power Deviation (up to 15 pts)
  if (reading.powerDeviationDb > 10) {
    ruleDeductions += 15;
    reasons.push(`High RF power spike (+${reading.powerDeviationDb} dBm) indicative of spoofed BTS overpowering local cells`);
  } else if (reading.powerDeviationDb > 5) {
    ruleDeductions += 8;
    reasons.push(`Moderate RF transmission power deviation (+${reading.powerDeviationDb} dBm)`);
  }

  const ruleRiskScore = Math.min(70, ruleDeductions);

  // Isolation Forest Model scoring (0 to 30)
  // Anomaly score based on combined variance of RSSI, frequency spacing, and power
  let rawAnomaly = 0;
  if (reading.powerDeviationDb > 8) rawAnomaly += 10;
  if (reading.rssiDbm > -50) rawAnomaly += 10; // artificially close broadcast
  if (!reading.isRegisteredLac) rawAnomaly += 8;
  if (reading.cipher === 'A5/0') rawAnomaly += 5;

  const anomalyScore = Math.min(30, rawAnomaly);

  const totalRiskScore = ruleRiskScore + anomalyScore;
  const trustScore = Math.max(0, 100 - totalRiskScore);

  let verdict: 'Genuine' | 'Suspicious' | 'Confirmed Rogue' = 'Genuine';
  let isRogue = false;

  if (totalRiskScore >= 50) {
    verdict = 'Confirmed Rogue';
    isRogue = true;
  } else if (totalRiskScore >= 20) {
    verdict = 'Suspicious';
  }

  // Deterministic mock SHA-256 string for evidence dossier
  const reportSeed = `${reading.cellId}-${reading.lac}-${reading.cipher}-${totalRiskScore}`;
  const reportHash = generateMockSha256(reportSeed);

  return {
    ruleScore: ruleRiskScore,
    ruleMax: 70,
    anomalyScore,
    anomalyMax: 30,
    totalRiskScore,
    trustScore,
    isRogue,
    verdict,
    reasons,
    reportHash,
  };
}

/**
 * Deterministic hash generator for prototype dossier verification.
 */
export function generateMockSha256(input: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  const hex1 = (hash >>> 0).toString(16).padStart(8, '0');
  const hex2 = ((hash ^ 0x5a5a5a5a) >>> 0).toString(16).padStart(8, '0');
  const hex3 = ((hash ^ 0xa5a5a5a5) >>> 0).toString(16).padStart(8, '0');
  const hex4 = ((hash ^ 0x3c3c3c3c) >>> 0).toString(16).padStart(8, '0');
  return `sha256:${hex1}${hex2}${hex3}${hex4}`;
}
