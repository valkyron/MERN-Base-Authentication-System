import React, { useEffect, useState } from 'react'
import Layout from './../components/Layout/Layout';
import axios from 'axios';
import { Table, message } from 'antd';
import Spinner from './../components/Layout/Spinner';

const Proposals = () => {
  const [loading, setLoading] = useState(false);
  const [allProposals, setallProposals] = useState([]);

  const columns = [
    {
      title: 'PI Full name',
      dataIndex: 'fullname'
    },
    {
      title: 'Project Title',
      dataIndex: 'pTitle'
    },
    {
      title: 'Project Budget',
      dataIndex: 'budget'
    },
    {
      title: 'Project Committee',
      dataIndex: 'jury'
    },
  ]

  const getAllTransactions = async() => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true);
      // console.log(user._id);
      const res = await axios.post('/proposals/getproposals', {userid: user._id})
      setLoading(false);
      setallProposals(res.data);

      if(res.data===[]) {
        console.log("ALOOO");
      }
    } catch (error) {
      console.log(error);
      message.error('Couldn\'t find proposals');
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllTransactions();
  }, [])

  return (
      <Layout>
          {loading && <Spinner/>}
            <button onClick={getAllTransactions}>Get Proposals</button>

          <Table columns={columns} dataSource={allProposals} rowKey="_id"/>
      </Layout>
  )
}

export default Proposals