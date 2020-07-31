import React from 'react';
import Table from './CollapsibleTable';
import Header from './Header';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';

function Dashboard() {
  return (
    <>
      <Header />
      <div className='p-12 text-3xl'>
        <DashboardRoundedIcon color='primary' fontSize='large' className='mr-3' />
        Dashboard</div>
      <div className='px-12'>
        <Table />
      </div>
    </>
  )
}

export default Dashboard;
