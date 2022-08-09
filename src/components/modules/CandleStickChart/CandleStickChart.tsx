import React, { useRef } from 'react';
import { COLOR_THEME, DEFAULT_THEME } from 'src/constants';
import { TickerPrice } from 'src/types';
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import {
  CandlestickSeries,
  Chart,
  ChartCanvas,
  CrossHairCursor,
  CurrentCoordinate,
  discontinuousTimeScaleProviderBuilder,
  EdgeIndicator,
  elderRay,
  ElderRaySeries,
  ema,
  lastVisibleItemBasedZoomAnchor,
  LineSeries,
  MouseCoordinateX,
  MouseCoordinateY,
  MovingAverageTooltip,
  OHLCTooltip,
  SingleValueTooltip,
  XAxis,
  YAxis,
} from 'react-financial-charts';
import { Text } from 'src/components/elements';

interface CandleStickChartProps {
  prices?: TickerPrice[];
}

export const CandleStickChart: React.FC<CandleStickChartProps> = React.memo(
  ({ prices }) => {
    const parentRef = useRef<HTMLDivElement>(null);

    const height = 400;
    console.log('render');
    const ScaleProvider =
      discontinuousTimeScaleProviderBuilder().inputDateAccessor(
        (d) => new Date(d.date),
      );
    const margin = { left: 0, right: 52, top: 0, bottom: 36 };

    const ema12 = ema()
      .id(1)
      .options({ windowSize: 12 })
      .merge((d: any, c: any) => {
        d.ema12 = c;
      })
      .accessor((d: any) => d.ema12);

    const ema26 = ema()
      .id(2)
      .options({ windowSize: 26 })
      .merge((d: any, c: any) => {
        d.ema26 = c;
      })
      .accessor((d: any) => d.ema26);

    const formatData =
      prices?.map(
        ({ date, openPrice, closePrice, maxPrice, minPrice, totalVolume }) => ({
          date,
          open: openPrice,
          close: closePrice,
          low: minPrice,
          high: maxPrice,
          volume: totalVolume,
        }),
      ) || [];

    const elder = elderRay();
    elder(ema26(ema12(formatData)));

    const { data, xScale, xAccessor, displayXAccessor } =
      ScaleProvider(formatData);

    const pricesDisplayFormat = format('.2f');
    const max = xAccessor(data[data.length - 1]);
    const min = xAccessor(data[Math.max(0, data.length - 100)]);
    const xExtents = [min + 4, max + 4];

    const gridHeight = height - margin.top - margin.bottom;

    const elderRayHeight = 100;
    const elderRayOrigin = (_: any, h: any) => [0, h - elderRayHeight];
    const chartHeight = gridHeight - elderRayHeight;

    const dateTimeFormat = '%d/%m/%y';
    const timeDisplayFormat = timeFormat(dateTimeFormat);

    const candleChartExtents = (data: any) => {
      return [data?.high, data?.low];
    };

    const yEdgeIndicator = (data: any) => {
      return data?.close;
    };

    const openCloseColor = (data: any) => {
      return data?.close > data?.open
        ? COLOR_THEME[DEFAULT_THEME].successColor
        : COLOR_THEME[DEFAULT_THEME].errorColor;
    };

    return (
      <div
        style={{ backgroundColor: '#fff', minHeight: height }}
        ref={parentRef}
      >
        <ChartCanvas
          height={height}
          ratio={4}
          width={parentRef?.current?.clientWidth || 675}
          margin={margin}
          data={data}
          displayXAccessor={displayXAccessor}
          seriesName="Data"
          xScale={xScale}
          xAccessor={xAccessor}
          xExtents={xExtents}
          zoomAnchor={lastVisibleItemBasedZoomAnchor}
        >
          <Chart id={3} height={chartHeight} yExtents={candleChartExtents}>
            <XAxis
              fontFamily="Roboto, sans-serif"
              showGridLines
              showTickLabel={false}
            />
            <YAxis
              fontFamily="Roboto, sans-serif"
              showGridLines
              tickFormat={pricesDisplayFormat}
            />
            <CandlestickSeries />
            <LineSeries
              yAccessor={ema26.accessor()}
              strokeStyle={ema26.stroke()}
            />
            <CurrentCoordinate
              yAccessor={ema26.accessor()}
              fillStyle={ema26.stroke()}
            />
            <LineSeries
              yAccessor={ema12.accessor()}
              strokeStyle={ema12.stroke()}
            />
            <CurrentCoordinate
              yAccessor={ema12.accessor()}
              fillStyle={ema12.stroke()}
            />
            <MouseCoordinateY
              rectWidth={margin.right}
              displayFormat={pricesDisplayFormat}
            />
            <EdgeIndicator
              itemType="last"
              rectWidth={margin.right}
              fill={openCloseColor}
              lineStroke={openCloseColor}
              displayFormat={pricesDisplayFormat}
              yAccessor={yEdgeIndicator}
            />
            <MovingAverageTooltip
              origin={[8, 24]}
              options={[
                {
                  yAccessor: ema26.accessor(),
                  type: 'EMA',
                  stroke: ema26.stroke(),
                  windowSize: ema26.options().windowSize,
                },
                {
                  yAccessor: ema12.accessor(),
                  type: 'EMA',
                  stroke: ema12.stroke(),
                  windowSize: ema12.options().windowSize,
                },
              ]}
            />

            <OHLCTooltip
              origin={[8, 16]}
              fontSize={14}
              labelFill="#000"
              textFill={openCloseColor}
              fontWeight={500}
            />
          </Chart>
          <Chart
            id={4}
            height={elderRayHeight}
            yExtents={[0, elder.accessor()]}
            origin={elderRayOrigin}
            padding={{ top: 8, bottom: 8 }}
          >
            <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
            <YAxis ticks={4} tickFormat={pricesDisplayFormat} />

            <MouseCoordinateX displayFormat={timeDisplayFormat} />
            <MouseCoordinateY
              rectWidth={margin.right}
              displayFormat={pricesDisplayFormat}
            />

            <ElderRaySeries yAccessor={elder.accessor()} />

            <SingleValueTooltip
              yAccessor={elder.accessor()}
              yLabel="Elder Ray"
              yDisplayFormat={(d: any) =>
                `${pricesDisplayFormat(d.bullPower)}, ${pricesDisplayFormat(
                  d.bearPower,
                )}`
              }
              origin={[8, 94]}
            />
          </Chart>
          <CrossHairCursor />
        </ChartCanvas>
      </div>
    );
  },
);
