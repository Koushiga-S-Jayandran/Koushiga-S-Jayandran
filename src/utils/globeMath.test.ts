import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateFibonacciSpherePoints,
  latLngToVector3D,
  project3DTo2D,
  calculateGreatCircleArc,
} from './globeMath.ts';

test('generateFibonacciSpherePoints produces expected count and radius bounds', () => {
  const count = 100;
  const radius = 200;
  const points = generateFibonacciSpherePoints(count, radius);

  assert.equal(points.length, count);

  for (const pt of points) {
    const dist = Math.sqrt(pt.x * pt.x + pt.y * pt.y + pt.z * pt.z);
    assert.ok(Math.abs(dist - radius) < 1e-4, `Expected dist ~${radius}, got ${dist}`);
  }
});

test('latLngToVector3D calculates correct 3D point on sphere', () => {
  // Coimbatore coordinates approx 11.0° N, 76.9° E
  const coimbatore = latLngToVector3D(11.0168, 76.9558, 150);
  const dist = Math.sqrt(coimbatore.x * coimbatore.x + coimbatore.y * coimbatore.y + coimbatore.z * coimbatore.z);
  assert.ok(Math.abs(dist - 150) < 1e-4);
});

test('project3DTo2D transforms and projects points correctly', () => {
  const pt = { x: 0, y: 0, z: 100 };
  const proj = project3DTo2D(pt, 0, 0, 100, 300, 300);

  assert.equal(typeof proj.x, 'number');
  assert.equal(typeof proj.y, 'number');
  assert.ok(proj.alpha > 0);
  assert.ok(proj.visible);
});

test('calculateGreatCircleArc creates step count with bowed peak', () => {
  const p1 = { x: 100, y: 0, z: 0 };
  const p2 = { x: 0, y: 100, z: 0 };
  const steps = 10;
  const arc = calculateGreatCircleArc(p1, p2, steps, 0.3);

  assert.equal(arc.length, steps + 1);

  // Peak at middle should have greater radius than endpoints
  const midPoint = arc[5];
  const midRadius = Math.sqrt(midPoint.x * midPoint.x + midPoint.y * midPoint.y + midPoint.z * midPoint.z);
  assert.ok(midRadius > 100, `Midpoint should bow outwards: ${midRadius} > 100`);
});
