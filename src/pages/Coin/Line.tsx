import * as d3 from "d3";
import { useEffect, useRef } from "react";

type LinePlotProps = {
  data: number[][];
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
};

export const LinePlot: React.FC<LinePlotProps> = ({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 60,
}) => {
  const prices = data.map((item) => item[1]);
  const date = data.map((item) => new Date(item[0]));
  const extentTime = d3.extent(date);
  const x = d3.scaleTime(extentTime as [Date, Date], [
    marginLeft,
    width - marginRight,
  ]);
  const extent = d3.extent(prices);
  const xAxisRef = useRef<SVGGElement>(null);
  const yAxisRef = useRef<SVGGElement>(null);
  const y = d3.scaleLinear(extent as [number, number], [
    height - marginBottom,
    marginTop,
  ]);
  const xAxis = d3
    .axisBottom(x)
    .ticks(7)
    .tickFormat((date) => d3.timeFormat("%d %b")(date as Date));
  const yAxis = d3
    .axisLeft(y)
    .ticks(7)
    .tickFormat((price) => `$${d3.format(",")(price)}`);
  useEffect(() => {
    if (extent[0] === undefined || extent[1] === undefined) {
      return;
    }
    if (xAxisRef.current) {
      d3.select(xAxisRef.current).call(xAxis);
    }

    if (yAxisRef.current) {
      d3.select(yAxisRef.current).call(yAxis);
    }
  }, [xAxis, yAxis, extent]);
  if (extent[0] === undefined || extent[1] === undefined) {
    return null;
  }

  const line = d3
    .line<number>()
    .x((_d, i) => {
      return x(date[i]);
    })
    .y((d) => y(d));

  return (
    <svg width={width} height={height} className="card">
      <g ref={xAxisRef} transform={`translate(0,${height - marginBottom})`} />
      <g ref={yAxisRef} transform={`translate(${marginLeft},0)`} />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(prices) ?? undefined}
      />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {prices.map((d, i) => (
          <circle key={i} cx={x(date[i])} cy={y(d)} r="2.5" />
        ))}
      </g>
    </svg>
  );
};
