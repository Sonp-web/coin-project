import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { formatPrice } from "../../utils/formatPrice";
import "./Line.css";

type LinePlotProps = {
  data: number[][];
};

type ChartProps = LinePlotProps & {
  width: number;
};

const marginTop = 8;
const marginRight = 8;
const marginBottom = 24;

const formatDay = (date: Date) =>
  date
    .toLocaleDateString("ru-RU", { day: "numeric", month: "short" })
    .replace(".", "");

const formatTick = (price: number) =>
  (price >= 1000 ? price.toLocaleString("ru-RU") : formatPrice(price)) + " $";

const formatCompactTick = (price: number) => {
  if (price >= 1000000) {
    return (
      (price / 1000000).toLocaleString("ru-RU", { maximumFractionDigits: 1 }) +
      "M"
    );
  }
  if (price >= 1000) {
    return (
      (price / 1000).toLocaleString("ru-RU", { maximumFractionDigits: 1 }) + "k"
    );
  }
  return formatPrice(price);
};

const Chart: React.FC<ChartProps> = ({ data, width }) => {
  const narrow = width < 480;
  const height = narrow ? 220 : width < 700 ? 300 : 360;
  const bottom = height - marginBottom;

  const prices = data.map((item) => item[1]);
  const dates = data.map((item) => new Date(item[0]));

  const y = d3
    .scaleLinear(d3.extent(prices) as [number, number], [bottom, marginTop])
    .nice(5);
  const yTicks = y.ticks(narrow ? 4 : 5);
  const yLabels = yTicks.map(narrow ? formatCompactTick : formatTick);
  const marginLeft =
    Math.max(...yLabels.map((label) => label.length)) * 6.5 + 8;

  const x = d3.scaleTime(d3.extent(dates) as [Date, Date], [
    marginLeft,
    width - marginRight,
  ]);
  const maxTicks = Math.floor((width - marginLeft - marginRight) / 70);
  const xTicks = x.ticks(Math.max(2, Math.min(7, maxTicks)));

  const line = d3
    .line<number[]>()
    .x((d) => x(d[0]))
    .y((d) => y(d[1]))
    .curve(d3.curveMonotoneX);
  const area = d3
    .area<number[]>()
    .x((d) => x(d[0]))
    .y0(bottom)
    .y1((d) => y(d[1]))
    .curve(d3.curveMonotoneX);
  const last = data[data.length - 1];

  return (
    <svg
      className="line-plot-svg"
      height={height}
      role="img"
      aria-label="График цены за 7 дней"
    >
      {yTicks.map((tick, i) => (
        <g key={tick}>
          <line
            className="line-plot-grid"
            x1={marginLeft}
            x2={width - marginRight}
            y1={y(tick)}
            y2={y(tick)}
          />
          <text
            className="line-plot-label"
            x={marginLeft - 8}
            y={y(tick)}
            dy="0.32em"
            textAnchor="end"
          >
            {yLabels[i]}
          </text>
        </g>
      ))}
      {xTicks.map((tick) => (
        <text
          className="line-plot-label"
          key={tick.getTime()}
          x={x(tick)}
          y={height - 6}
          textAnchor={x(tick) > width - 30 ? "end" : "middle"}
        >
          {formatDay(tick)}
        </text>
      ))}
      <path className="line-plot-area" d={area(data) ?? undefined} />
      <path className="line-plot-line" d={line(data) ?? undefined} />
      <circle className="line-plot-dot" cx={x(last[0])} cy={y(last[1])} r="4" />
    </svg>
  );
};

export const LinePlot: React.FC<LinePlotProps> = ({ data }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) {
      return;
    }
    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.floor(entry.contentRect.width));
    });
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="card line-plot-wrapper">
      <p className="card-title">История цены, 7 дней</p>
      <div ref={wrapperRef} className="line-plot">
        {width > 0 && data.length > 1 ? (
          <Chart data={data} width={width} />
        ) : null}
      </div>
    </div>
  );
};
