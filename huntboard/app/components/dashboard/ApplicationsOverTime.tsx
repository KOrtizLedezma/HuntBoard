"use client";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function ApplicationsOverTime({ data }: { data: { date: string; count: number }[] }) {
  const [colors, setColors] = useState({
    line: '#000',
    pointFill: '#000',
    pointBorder: '#000'
  });

  useEffect(() => {
    const root = getComputedStyle(document.documentElement);
    setColors({
      line: root.getPropertyValue('--color-title').trim(),
      pointFill: root.getPropertyValue('--color-title').trim(),
      pointBorder: root.getPropertyValue('--color-title').trim(),
    });
  }, []);

  const chartData = {
    labels: data.map(d => d.date),
    datasets: [{
      label: "Applications",
      data: data.map(d => d.count),
      borderColor: colors.line,
      backgroundColor: colors.line,
      pointBackgroundColor: colors.pointFill,
      pointBorderColor: colors.pointBorder,
      pointRadius: 5,
      tension: 0.3,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Applications Over Time',
        font: {
          size: 16
        }
      },
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Line data={chartData} options={options} />
    </div>
  );
}
