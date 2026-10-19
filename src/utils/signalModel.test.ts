import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateTowerTelemetry, generateMockSha256 } from './signalModel.ts';

test('evaluateTowerTelemetry classifies legitimate cell tower as Genuine with high trust', () => {
  const result = evaluateTowerTelemetry({
    cellId: '0x1A4F',
    lac: '0x0289',
    frequencyMHz: 1805.2,
    rssiDbm: -78,
    cipher: 'EEA2',
    powerDeviationDb: 0.5,
    isRegisteredLac: true,
  });

  assert.equal(result.isRogue, false);
  assert.equal(result.verdict, 'Genuine');
  assert.ok(result.trustScore > 80, `Expected trust score > 80, got ${result.trustScore}`);
  assert.equal(result.reasons.length, 0);
});

test('evaluateTowerTelemetry detects rogue tower on cipher downgrade and unregistered LAC', () => {
  const rogueResult = evaluateTowerTelemetry({
    cellId: '0x99AA',
    lac: '0x4E12',
    frequencyMHz: 1805.2,
    rssiDbm: -45, // overpowered
    cipher: 'A5/0', // null cipher downgrade
    powerDeviationDb: 14,
    isRegisteredLac: false,
  });

  assert.equal(rogueResult.isRogue, true);
  assert.equal(rogueResult.verdict, 'Confirmed Rogue');
  assert.ok(rogueResult.totalRiskScore >= 50);
  assert.ok(rogueResult.ruleScore <= 70);
  assert.ok(rogueResult.anomalyScore <= 30);
  assert.ok(rogueResult.reasons.length >= 3);
});

test('generateMockSha256 produces formatted sha256 prefix and consistent output', () => {
  const h1 = generateMockSha256('test-string');
  const h2 = generateMockSha256('test-string');
  const h3 = generateMockSha256('different-string');

  assert.equal(h1, h2);
  assert.notEqual(h1, h3);
  assert.ok(h1.startsWith('sha256:'));
});
