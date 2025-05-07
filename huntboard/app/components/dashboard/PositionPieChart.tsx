import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement } from 'chart.js';

ChartJS.register(ArcElement);

export function PositionPieChart({ data }: { data: { position: string; count: number }[] }) {
  const chartData = {
    labels: data.map(p => p.position),
    datasets: [{
      label: "Positions",
      data: data.map(p => p.count),
      backgroundColor: ['#42a5f5', '#66bb6a', '#ef5350', '#ffa726', '#ab47bc', '#26c6da']
    }]
  };

  return <Pie data={chartData} />;
}
