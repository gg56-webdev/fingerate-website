import { Box, Container, Grid } from '@chakra-ui/react';
import DashboardLayout from '../../components/Layout/DashboardLayout';

export default function Sots() {
  return <Box bg='green'>sots</Box>;
}

Sots.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
