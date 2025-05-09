import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function StatusBarChart({ counts }: { counts: { Applied: number; Interview: number; Rejected: number; Offer: number } }) {
  const chartData = {
    labels: Object.keys(counts),
    datasets: [{
      label: "Status Count",
      data: Object.values(counts),
      backgroundColor: ['#42a5f5', '#66bb6a', '#ef5350', '#ffa726']
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Application Status',
        font: {
          size: 16
        }
      },
      legend: {
        display: false,
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
      <Bar data={chartData} options={options} />
    </div>
  );
}