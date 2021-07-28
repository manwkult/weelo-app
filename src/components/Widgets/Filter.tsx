import React from 'react';

import { Input } from 'antd';
const { Search } = Input;

interface Props {
  onSearch: (value: any) => void;
}

const Filter: React.FC<Props> = (props) => {
  return (
    <Search placeholder="Search..." onSearch={props.onSearch} allowClear enterButton />
  );
};

export default Filter;