export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface ProjectedPoint {
  x: number;
  y: number;
  z: number;
  scale: number;
  alpha: number;
  visible: boolean;
}

/**
 * Generate uniformly distributed points on a sphere using the Fibonacci lattice.
 */
export function generateFibonacciSpherePoints(count: number, radius: number = 1): Point3D[] {
  const points: Point3D[] = [];
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians (~2.39996)

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y)); // radius at y
    const theta = phi * i;

    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    points.push({
      x: x * radius,
      y: y * radius,
      z: z * radius,
    });
  }

  return points;
}

/**
 * Convert Latitude & Longitude in degrees to 3D Cartesian coordinates.
 */
export function latLngToVector3D(latDeg: number, lngDeg: number, radius: number = 1): Point3D {
  const phi = (90 - latDeg) * (Math.PI / 180);
  const theta = (lngDeg + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return { x, y, z };
}

/**
 * Project a 3D point onto a 2D canvas with yaw and tilt rotations.
 */
export function project3DTo2D(
  point: Point3D,
  yaw: number,
  tilt: number,
  sphereRadius: number,
  cx: number,
  cy: number
): ProjectedPoint {
  // Rotate around Y axis (yaw)
  const cosYaw = Math.cos(yaw);
  const sinYaw = Math.sin(yaw);
  const x1 = point.x * cosYaw - point.z * sinYaw;
  const z1 = point.x * sinYaw + point.z * cosYaw;
  const y1 = point.y;

  // Rotate around X axis (tilt)
  const cosTilt = Math.cos(tilt);
  const sinTilt = Math.sin(tilt);
  const y2 = y1 * cosTilt - z1 * sinTilt;
  const z2 = y1 * sinTilt + z1 * cosTilt;
  const x2 = x1;

  // Camera perspective
  const cameraDistance = sphereRadius * 3.2;
  const depth = cameraDistance + z2;
  const safeDepth = depth > 10 ? depth : 10;
  const perspectiveScale = cameraDistance / safeDepth;

  const canvasX = cx + x2 * perspectiveScale;
  const canvasY = cy + y2 * perspectiveScale;

  // Alpha based on depth: points facing viewer (z2 > 0) are brighter, back are dimmer
  const normalizedZ = (z2 + sphereRadius) / (sphereRadius * 2);
  const clampedZ = Math.max(0, Math.min(1, normalizedZ));
  const alpha = 0.15 + clampedZ * 0.85;

  return {
    x: canvasX,
    y: canvasY,
    z: z2,
    scale: perspectiveScale,
    alpha,
    visible: z2 > -sphereRadius * 0.45,
  };
}

/**
 * Compute an arc curve between two 3D points curving above the sphere.
 */
export function calculateGreatCircleArc(
  p1: Point3D,
  p2: Point3D,
  steps: number = 24,
  heightMultiplier: number = 0.28
): Point3D[] {
  const arc: Point3D[] = [];

  // Normalize inputs to get radius
  const r1 = Math.sqrt(p1.x * p1.x + p1.y * p1.y + p1.z * p1.z) || 1;
  const r2 = Math.sqrt(p2.x * p2.x + p2.y * p2.y + p2.z * p2.z) || 1;
  const baseRadius = (r1 + r2) / 2;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // Linear 3D interpolation
    const lx = p1.x + (p2.x - p1.x) * t;
    const ly = p1.y + (p2.y - p1.y) * t;
    const lz = p1.z + (p2.z - p1.z) * t;

    // Normalize and scale with parabolic arch
    const len = Math.sqrt(lx * lx + ly * ly + lz * lz) || 1;
    const arch = 4 * t * (1 - t); // 0 at edges, 1 at center
    const currentRadius = baseRadius * (1 + arch * heightMultiplier);

    arc.push({
      x: (lx / len) * currentRadius,
      y: (ly / len) * currentRadius,
      z: (lz / len) * currentRadius,
    });
  }

  return arc;
}
