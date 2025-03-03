import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { TimeSeriesData } from '../types';
import { format, parseISO } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM d');
    } catch (error) {
      return dateString;
    }
  };

  const chartData = {
    labels: data.map(item => formatDate(item.date)),
    datasets: [
      {
        label: 'Positive',
        data: data.map(item => item.positive),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Negative',
        data: data.map(item => item.negative),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Neutral',
        data: data.map(item => item.neutral),
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Sentiment Trends Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Tweets',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  return (
    <div className="h-full">
      <h3 className="text-lg font-semibold mb-2">Tren Sentiment</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TimeSeriesChart;