import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { performanceData, departmentData } from '../../data/mockData';
import { motion } from 'framer-motion';

const ChartCard = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ height: 300 }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  </motion.div>
);

const PerformanceCharts = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <ChartCard title="Performance & Attendance Trends">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="performance"
                stroke="#8884d8"
                strokeWidth={2}
                name="Performance %"
              />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#82ca9d"
                strokeWidth={2}
                name="Attendance %"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>

      <Grid item xs={12} md={6}>
        <ChartCard title="Department Distribution">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>

      <Grid item xs={12}>
        <ChartCard title="Monthly Performance Overview">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="performance"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </Grid>
    </Grid>
  );
};

export default PerformanceCharts;
