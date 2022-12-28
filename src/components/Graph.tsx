import { useEffect, useState } from "react";
import * as d3 from "d3";
import { Data } from "../interfaces/interfaces";
import { getData } from "../services/apiRequest";
import { useD3 } from "../services/useD3";

export const Graph = () => {
  const [data, setData] = useState<Data>();

  useEffect(() => {
    getData(setData);
  }, []);

  console.log("data: ", data?.daily);

  const ref = useD3(
    (svg: any) => {
      const circle = (g: any) => {
        g.append("circle")
          .attr("cx", 50)
          .attr("cy", 50)
          .attr("r", 50)
          .attr("fill", "red");
      };

      svg.select(".circle").call(circle);
    },
    [data?.daily.length]
  );

  return (
    <>
      <div>{`tomorrow min: ${data?.daily[1].temp.min}°C, max: ${data?.daily[0].temp.max}°C`}</div>
      <svg
        ref={ref}
        style={{
          height: 700,
          width: 1000,
          margin: 10,
        }}
      >
        <g className="circle"></g>
      </svg>
    </>
  );
};
