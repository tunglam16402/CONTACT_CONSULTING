"use client";

import { memo } from "react";
import { useInView } from "react-intersection-observer";

const LazyRender = memo(({ children }: { children: React.ReactNode }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return <div ref={ref}>{inView ? children : null}</div>;
});

LazyRender.displayName = "LazyRender";

export default LazyRender;
