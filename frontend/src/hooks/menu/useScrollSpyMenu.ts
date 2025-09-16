"use client"

import { Section } from "@/types/menu/scrollSpyMenu";
import { useEffect, useRef, useState } from "react";

export const useScrollSpyMenu = (sections: Section[]) => {
	const [activeId, setActiveId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
    const handleObserve = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObserve, {
      root: null,
      rootMargin: "0px 0px -50% 0px",
      threshold: 0.1,
    });

    sections.forEach((section) => {
      const el = document.getElementById(section.id);

      if (el) observer.current?.observe(el);
    });

    return () => observer.current?.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

	return {
		activeId,
		handleClick,
	}
}