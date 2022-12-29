import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Day } from "../interfaces/interfaces";

const useD3 = (renderChartFn: Function, dependencies: Day[] | undefined) => {
  const ref = useRef<any>();

  useEffect(() => {
    renderChartFn(d3.select(ref.current));

    return () => {};
  }, [dependencies]);

  return ref;
};

export { useD3 };
