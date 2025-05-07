import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function ApplicationsOverTime({ data }: { data: { date: string; count: number }[] }) {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [{
      label: "Applications",
      data: data.map(d => d.count),
      borderColor: 'var(--color-title)',
      backgroundColor: 'var(--color-hover)',
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
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Line data={chartData} options={options} />
    </div>
  );
}