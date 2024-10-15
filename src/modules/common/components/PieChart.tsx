'use client'
import React, { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, PieProps } from 'recharts';
import { ActiveShape } from 'recharts/types/util/types';


interface Props<T extends object> {
  data: T[]
  dataKey: keyof T,
  nameKey: keyof T,
}

const CustomPieChart = <T extends object>(props: Props<T>) => {
  const { data, dataKey, nameKey } = props;
  const [activeIndex, setActiveIndex] = useState<number[]>([0]);

  const onPointer = (_: unknown, index: number) => {
    setActiveIndex([index])
  }

  const renderActiveShape = (props: ActiveShape<PieProps['activeShape']>) => {
    const RADIAN = Math.PI / 180;
    // @ts-expect-error weird type
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" className='fill-chart-2 font-bold text-3xl' >
          {value}
        </text>
        <text x={cx} y={cy} dy={24} textAnchor="middle" className='fill-chart-2' >
          Jobs
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          className='stroke-white dark:stroke-black fill-chart-2 transition-all'
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} className='stroke-chart-2' fill="none" />
        <circle cx={ex} cy={ey} r={2} className='fill-chart-2' stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} className='fill-chart-2'>{payload[nameKey]}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} className='fill-chart-2'>
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart margin={{ top: 20, bottom: 20 }}>
        <Pie
          data={data}
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          className='fill-chart-2'
          cx="50%"
          cy="50%"
          innerRadius={100}
          outerRadius={130}
          dataKey={dataKey as string}
          onPointerMove={onPointer}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart;
