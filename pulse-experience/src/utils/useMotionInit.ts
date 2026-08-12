import { useCallback, useEffect, useRef, useState } from 'react';

export type MotionMode = 'checking' | 'shake' | 'permission' | 'tap';

interface DeviceMotionEventWithPermission {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

const SHAKE_THRESHOLD = 22;
const SHAKE_COOLDOWN_MS = 1000;

/**
 * Decides the initialization affordance (shake / permission-gate / tap)
 * and listens for a shake gesture once armed.
 */
export function useMotionInit(onTrigger: () => void) {
  const [mode, setMode] = useState<MotionMode>('checking');
  const [permissionDenied, setPermissionDenied] = useState(false);
  const triggeredRef = useRef(false);
  const lastReading = useRef<{ x: number; y: number; z: number } | null>(null);
  const lastShakeAt = useRef(0);

  const fire = useCallback(() => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;
    onTrigger();
  }, [onTrigger]);

  const handleMotion = useCallback(
    (event: DeviceMotionEvent) => {
      const accel = event.acceleration?.x != null ? event.acceleration : event.accelerationIncludingGravity;
      if (!accel || accel.x == null || accel.y == null || accel.z == null) return;
      const now = Date.now();
      const prev = lastReading.current;
      lastReading.current = { x: accel.x, y: accel.y, z: accel.z };
      if (!prev) return;
      const delta = Math.abs(accel.x - prev.x) + Math.abs(accel.y - prev.y) + Math.abs(accel.z - prev.z);
      if (delta > SHAKE_THRESHOLD && now - lastShakeAt.current > SHAKE_COOLDOWN_MS) {
        lastShakeAt.current = now;
        fire();
      }
    },
    [fire],
  );

  useEffect(() => {
    const hasTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const hasDeviceMotion = typeof DeviceMotionEvent !== 'undefined';
    const needsPermission =
      hasDeviceMotion && typeof (DeviceMotionEvent as unknown as DeviceMotionEventWithPermission).requestPermission === 'function';

    if (!hasTouch || !hasDeviceMotion) {
      setMode('tap');
    } else if (needsPermission) {
      setMode('permission');
    } else {
      setMode('shake');
      window.addEventListener('devicemotion', handleMotion);
    }

    return () => window.removeEventListener('devicemotion', handleMotion);
  }, [handleMotion]);

  const requestMotionPermission = useCallback(async () => {
    const DME = DeviceMotionEvent as unknown as DeviceMotionEventWithPermission;
    if (typeof DME.requestPermission !== 'function') {
      setMode('shake');
      window.addEventListener('devicemotion', handleMotion);
      return;
    }
    try {
      const result = await DME.requestPermission();
      if (result === 'granted') {
        setMode('shake');
        window.addEventListener('devicemotion', handleMotion);
      } else {
        setPermissionDenied(true);
        setMode('tap');
      }
    } catch {
      setPermissionDenied(true);
      setMode('tap');
    }
  }, [handleMotion]);

  return { mode, permissionDenied, requestMotionPermission, triggerManually: fire };
}
