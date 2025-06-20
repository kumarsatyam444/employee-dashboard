export const mockEmployees = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@company.com',
    position: 'Software Engineer',
    department: 'Engineering',
    salary: 75000,
    hireDate: '2022-01-15',
    performance: 85,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    status: 'Active',
    attendance: 95,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    position: 'Product Manager',
    department: 'Product',
    salary: 90000,
    hireDate: '2021-08-20',
    performance: 92,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    status: 'Active',
    attendance: 98,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    position: 'UX Designer',
    department: 'Design',
    salary: 70000,
    hireDate: '2022-03-10',
    performance: 88,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    status: 'Active',
    attendance: 92,
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    position: 'HR Manager',
    department: 'Human Resources',
    salary: 80000,
    hireDate: '2020-11-05',
    performance: 90,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    status: 'Active',
    attendance: 96,
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@company.com',
    position: 'DevOps Engineer',
    department: 'Engineering',
    salary: 85000,
    hireDate: '2021-06-12',
    performance: 87,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    status: 'Active',
    attendance: 94,
  },
];

export const performanceData = [
  { month: 'Jan', performance: 85, attendance: 92 },
  { month: 'Feb', performance: 88, attendance: 94 },
  { month: 'Mar', performance: 82, attendance: 89 },
  { month: 'Apr', performance: 90, attendance: 96 },
  { month: 'May', performance: 87, attendance: 93 },
  { month: 'Jun', performance: 92, attendance: 97 },
];

export const departmentData = [
  { name: 'Engineering', value: 45, color: '#8884d8' },
  { name: 'Product', value: 20, color: '#82ca9d' },
  { name: 'Design', value: 15, color: '#ffc658' },
  { name: 'HR', value: 10, color: '#ff7300' },
  { name: 'Marketing', value: 10, color: '#00ff00' },
];

export const attendanceEvents = [
  {
    id: 1,
    title: 'John Doe - Present',
    date: '2024-01-15',
    color: 'green',
  },
  {
    id: 2,
    title: 'Jane Smith - Present',
    date: '2024-01-15',
    color: 'green',
  },
  {
    id: 3,
    title: 'Mike Johnson - Absent',
    date: '2024-01-15',
    color: 'red',
  },
];

export const kanbanTasks = {
  todo: [
    { id: '1', title: 'Employee Onboarding', description: 'Complete onboarding for new hires' },
    { id: '2', title: 'Performance Review', description: 'Quarterly performance reviews' },
  ],
  inProgress: [
    { id: '3', title: 'Training Program', description: 'Develop training materials' },
    { id: '4', title: 'Policy Update', description: 'Update HR policies' },
  ],
  done: [
    { id: '5', title: 'Salary Review', description: 'Annual salary adjustments' },
  ],
};
