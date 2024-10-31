// components/ProductOrderChart.js
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ProductOrderChart = ({ data }) => {
  const chartData = {
    labels: data.map((entry) => entry.product),
    datasets: [
      {
        label: 'Orders',
        data: data.map((entry) => entry.orders),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Product vs. Orders',
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default ProductOrderChart;
