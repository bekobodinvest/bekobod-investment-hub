'use client';

import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

interface Props {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 2000,
  className = '',
}: Props) {
  const { count, ref } = useAnimatedCounter(target, duration);

  return (
    <div ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}
