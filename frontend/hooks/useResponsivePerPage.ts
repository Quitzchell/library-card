import { useEffect, useState } from "react";

export function useResponsivePerPage(
  configs: { query: string; value: number }[],
  defaultValue: number,
): number {
  const [value, setValue] = useState<number>(defaultValue);

  useEffect(() => {
    const mqls = configs.map((config) => ({
      ...config,
      mql: window.matchMedia(config.query),
    }));

    const evaluate = () => {
      const match = mqls.find((c) => c.mql.matches);
      setValue(match ? match.value : defaultValue);
    };

    evaluate(); // initial check

    mqls.forEach(({ mql }) => mql.addEventListener("change", evaluate));

    return () => {
      mqls.forEach(({ mql }) => mql.removeEventListener("change", evaluate));
    };
  }, [configs, defaultValue]);

  return value;
}
