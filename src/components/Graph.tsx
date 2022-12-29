import * as d3 from "d3";
import { useEffect, useState } from "react";
import { Data, Day } from "../interfaces/interfaces";
import { getData } from "../services/apiRequest";
import { useD3 } from "../services/useD3";
import "./Graph.scss";

export const Graph = () => {
  const [data, setData] = useState<Data>();

  useEffect(() => {
    getData(setData);
  }, []);

  console.log("data: ", data);

  const ref = useD3((svg: any) => {
    if (data) {
      const date: Date = new Date(data?.daily[0].dt * 1000);
      console.log(date);

      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const height = 600;
      const width = 900;

      const graph = svg
        .append("g")
        .attr(
          "transform",
          "translate(" + margin.left + ", " + margin.top + ")"
        );
      const groupX = graph
        .append("g")
        .attr("transform", "translate(0, " + height + ")");
      const groupY = graph.append("g");

      const x = d3
        .scaleLinear()
        .domain([
          d3.min(data.daily, (d: any) => d.dt),
          d3.max(data.daily, (d: any) => d.dt),
        ])
        .range([0, width]);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data.daily, (d: any) => d.temp.max)])
        .range([height, 0]);

      const axeY = d3.axisLeft(y).ticks(15);
      groupY.call(axeY).style("font-size", "13px");

      const axeX = d3.axisBottom(x).ticks(7);
      groupX.call(axeX).style("font-size", "14px");
      groupX
        .selectAll("text")
        .attr("transform", "rotate(-30) translate(0,10)")
        .attr("text-anchor", "end");

      const maxTemp = d3
        .line()
        .x((d: any) => x(d.dt))
        .y((d: any) => y(d.temp.max));

      const minTemp = d3
        .line()
        .x((d: any) => x(d.dt))
        .y((d: any) => y(d.temp.min));

      const d: any = data.daily;

      graph.append("path").attr("class", "temp max").attr("d", maxTemp(d));
      graph.append("path").attr("class", "temp min").attr("d", minTemp(d));
    }
  }, data?.daily);

  return (
    <>
      {data && data.daily.length && (
        <svg
          ref={ref}
          style={{
            height: 700,
            width: 1000,
          }}
        ></svg>
      )}
    </>
  );
};
