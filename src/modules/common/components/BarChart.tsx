'use client'
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, BarProps } from 'recharts';

// Custom Bar Shape with Rounded Corners
const RoundedBar = (props: BarProps) => {
  const { x, y, width, height } = props;

  // Set the radius for the rounded corners
  const radius = 5; // Adjust as needed

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        className='fill-chart-2'
        rx={radius} // Set the horizontal radius
        ry={radius} // Set the vertical radius
      />
    </g>
  );
};

// Custom tick component to prevent word wrapping
const CustomYAxisTick = (props: { x: number; y: number, payload: Record<string, string | number> }) => {
  const { x, y, payload } = props;

  return (
    <text
      x={x}
      y={y}
      dy={5}
      className='fill-chart-2'
      textAnchor="end"
      style={{ whiteSpace: 'nowrap' }} // Prevent word wrapping
    >
      {payload.value}
    </text>
  );
};

interface Props<T extends object> {
  data: T[];
  dataKey: keyof T;
  nameKey: keyof T;
  layout?: 'horizontal' | 'vertical';
}

const SimpleBarChart = <T extends object>(props: Props<T>) => {
  const { dataKey, nameKey, data, layout = 'vertical' } = props;
  const [margin, setMargin] = useState({ left: 70, right: 50 });

  useEffect(() => {
    const maxLabelWidth = getMaxLabelWidth(data.map(item => item[nameKey] as string)); // Add some padding
    setMargin(prev => ({ ...prev, left: maxLabelWidth }));
  }, [data, nameKey]);

  // Function to get the maximum label width
  const getMaxLabelWidth = (labels: string[]) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if(!context) return 0;
    context.font = '12px sans-serif'; // Use the same font style as your YAxis
    return Math.max(...labels.map(label => context.measureText(label).width));
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart margin={margin} layout={layout} data={data}>
        <XAxis type='number' strokeOpacity={0.3} dataKey={dataKey as string} />
        <YAxis 
          tick={CustomYAxisTick} 
          interval={0} 
          type='category' 
          strokeOpacity={0} 
          dataKey={nameKey as string} 
        />
        <Bar shape={RoundedBar} label={{ position: 'right' }} dataKey={dataKey as string} fill="black" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleBarChart;
