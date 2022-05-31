import { Box, Container, Grid } from '@chakra-ui/react';
import Head from 'next/head';
import DashboardLayout from '../../components/Layout/DashboardLayout';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Box>user main</Box>
    </>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
