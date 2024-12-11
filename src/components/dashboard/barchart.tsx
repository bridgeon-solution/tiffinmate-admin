import { BarChart } from '@mui/x-charts/BarChart';

const dataset = [
  { month: 'January', seoul: 30 },
  { month: 'February', seoul: 20 },
  { month: 'March', seoul: 50 },
  { month: 'April', seoul: 40 },
  { month: 'may', seoul: 40 },
  { month: 'June', seoul: 40 },
  { month: 'July', seoul: 40 },
  { month: 'Auguest', seoul: 40 },
  { month: 'Septembar', seoul: 40 },
  { month: 'October', seoul: 40 },
  { month: 'November', seoul: 40 },
  { month: 'December', seoul: 70 },
];

export default function Barchart() {
  return (
    <div style={{ width: '100%' }}>
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: 'band',
            dataKey: 'month',
            tickPlacement: 'middle', // Adjust based on preference
            tickLabelPlacement: 'middle',
          },
        ]}
        yAxis={[
          {
            label: 'Total revenue',
          },
        ]}
        series={[
          {
            dataKey: 'seoul',
            label: 'Total revenue',
            valueFormatter: (value: number | null) => (value !== null ? `${value} $` : ''),
          },
        ]}
        height={300}
        sx={{
          [`& .MuiChartsAxis-root.directionY .MuiChartsAxis-label`]: {
            transform: 'translateX(-10px)',
          },
        }}
      />
    </div>
  );
}
