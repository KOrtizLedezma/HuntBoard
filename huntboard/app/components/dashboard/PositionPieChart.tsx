import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PositionPieChart({ data }: { data: { position: string; count: number }[] }) {
  const chartData = {
    labels: data.map(p => p.position),
    datasets: [{
      label: "Positions",
      data: data.map(p => p.count),
      backgroundColor: ['#42a5f5', '#66bb6a', '#ef5350', '#ffa726', '#ab47bc', '#26c6da']
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Position Distribution',
        font: {
          size: 16
        }
      },
      legend: {
        position: 'right' as const,
        align: 'center' as const,
      },
    },
  };

  return (
    <div className="chart-container" style={{ 
      width: '90%', 
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Pie data={chartData} options={options} />
    </div>
  );
}