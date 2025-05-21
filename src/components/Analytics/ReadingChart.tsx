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
  Filler,
} from 'chart.js';
import { useTheme } from '../../contexts/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ReadingChartProps {
  data: Array<{
    day: string;
    minutesRead: number;
    pagesRead: number;
    wordsRead: number;
  }>;
  period: 'week' | 'month';
  dataType: 'minutes' | 'pages' | 'words';
}

const ReadingChart: React.FC<ReadingChartProps> = ({ data, period, dataType }) => {
  const { theme } = useTheme();
  
  const chartData = {
    labels: data.map(item => item.day),
    datasets: [
      {
        label: dataType === 'minutes' ? 'Reading Time (mins)' : 
               dataType === 'pages' ? 'Pages Read' : 'Words Read',
        data: data.map(item => 
          dataType === 'minutes' ? item.minutesRead : 
          dataType === 'pages' ? item.pagesRead : item.wordsRead
        ),
        borderColor: dataType === 'pages' ? '#2563eb' : '#3b82f6',
        backgroundColor: dataType === 'pages' 
          ? 'rgba(37, 99, 235, 0.1)' 
          : 'rgba(59, 130, 246, 0.1)',
        borderWidth: dataType === 'pages' ? 3 : 2,
        pointBackgroundColor: dataType === 'pages' ? '#2563eb' : '#3b82f6',
        pointBorderColor: theme === 'dark' ? '#1f2937' : '#ffffff',
        pointRadius: dataType === 'pages' ? 5 : 4,
        pointHoverRadius: dataType === 'pages' ? 7 : 6,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: theme === 'dark' ? '#374151' : 'rgba(255, 255, 255, 0.9)',
        titleColor: theme === 'dark' ? '#f9fafb' : '#111827',
        bodyColor: theme === 'dark' ? '#d1d5db' : '#374151',
        borderColor: theme === 'dark' ? '#4b5563' : '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          title: function(context: any) {
            return context[0].label;
          },
          label: function(context: any) {
            const value = context.raw;
            if (dataType === 'minutes') {
              return `Reading time: ${value} minutes`;
            } else if (dataType === 'pages') {
              return `Pages read: ${value}`;
            } else {
              return `Words read: ${value.toLocaleString()}`;
            }
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
          font: {
            size: 10,
          },
        },
      },
      y: {
        grid: {
          color: theme === 'dark' ? '#374151' : '#f3f4f6',
          drawBorder: false,
        },
        ticks: {
          color: theme === 'dark' ? '#9ca3af' : '#6b7280',
          font: {
            size: 10,
          },
          padding: 8,
        },
        beginAtZero: true,
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    elements: {
      line: {
        borderWidth: dataType === 'pages' ? 3 : 2,
      },
      point: {
        hitRadius: 8,
      },
    },
  };

  return (
    <div className="rounded-xl bg-white dark:bg-gray-800 shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {period === 'week' ? 'Weekly' : 'Monthly'} Reading Progress
        </h3>
        
        <div className="flex gap-2">
          <button 
            className={`px-2 py-1 text-xs rounded-md ${
              dataType === 'pages' 
                ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-400 font-medium' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Pages
          </button>
          <button 
            className={`px-2 py-1 text-xs rounded-md ${
              dataType === 'words' 
                ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-400' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Words
          </button>
          <button 
            className={`px-2 py-1 text-xs rounded-md ${
              dataType === 'minutes' 
                ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-400' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Time
          </button>
        </div>
      </div>
      
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ReadingChart;