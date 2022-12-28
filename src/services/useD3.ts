import React, { useEffect, useRef } from "react";

import * as d3 from "d3";
import { Data } from "../interfaces/interfaces";

export const useD3 = (renderChartFn: Function, dependencies: any[]) => {
  const ref = useRef<any>();

  useEffect(() => {
    renderChartFn(d3.select(ref.current));

    return () => {};
  }, dependencies);

  return ref;
};
