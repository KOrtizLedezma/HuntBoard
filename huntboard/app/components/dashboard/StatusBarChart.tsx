import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement);

export function StatusBarChart({ counts }: { counts: { Applied: number; Interview: number; Rejected: number; Offer: number } }) {
  const chartData = {
    labels: Object.keys(counts),
    datasets: [{
      label: "Status Count",
      data: Object.values(counts),
      backgroundColor: ['#42a5f5', '#66bb6a', '#ef5350', '#ffa726']
    }]
  };

  return <Bar data={chartData} />;
}
