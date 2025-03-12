import * as React from "react";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Carousel = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (ref.current) {
      ref.current.scrollBy({ left: -window.innerWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (ref.current) {
      ref.current.scrollBy({ left: window.innerWidth, behavior: "smooth" });
    }
  };

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      <button onClick={scrollLeft} className="absolute left-2 top-1/2 z-10">
        <ChevronLeft className="w-10 h-10 bg-white p-2 rounded-full shadow-md" />
      </button>
      <div
        ref={ref}
        className="flex w-full h-full overflow-x-auto scroll-smooth"
      >
        {children}
      </div>
      <button onClick={scrollRight} className="absolute right-2 top-1/2 z-10">
        <ChevronRight className="w-10 h-10 bg-white p-2 rounded-full shadow-md" />
      </button>
    </div>
  );
};

export const CarouselContent = ({
  children,
}: {
  children: React.ReactNode;
}) => <div className="flex w-full h-full">{children}</div>;

export const CarouselItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`w-full h-full flex-shrink-0 ${className}`}>{children}</div>
);
