import React from 'react';

import { Table } from 'antd';

interface Props {
  data: any;
  columns: any
}

const PropertyTable: React.FC<Props> = ({ data, columns }) => {
  return (
    <Table columns={columns} dataSource={data} />
  )
}

export default PropertyTable;