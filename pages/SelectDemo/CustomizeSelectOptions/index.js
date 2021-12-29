import React, { useState } from 'react';
import { Select, Form, Button } from 'antd';

const { Option } = Select;
const { Item } = Form;

const options = [
  { username: '上海', userid: 'shanghai' },
  { username: '苏州', userid: 'suzhou' },
  { username: '深圳', userid: 'shenzhen' },
  { username: '杭州', userid: 'hangzhou' },
];

const Index = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState('shanghai');

  const handleChange = (value) => {
    console.log(`selected`, value);
    setValue(value);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form onFinish={onFinish}>
      <Item name="test" initialValue={[]}>
        <Select
          placeholder={'请选择'}
          mode={'multiple'}
          fieldNames={{ label: 'username', value: 'userid' }}
          options={options}
          // style={{ width: 120 }}
          // value={value}
          // onChange={handleChange}
        ></Select>
      </Item>
      <Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Item>
    </Form>
  );
};

export default Index;
