import React, { useState, useEffect } from 'react';
import { Checkbox, Tag } from 'antd';
import ChecboxMultiply from './ChecboxMultiply';

const CheckboxGroup = Checkbox.Group;
const colorList = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

function generateRandomColor() {
  // 生成 [n,m]，包含n和m的随机数
  const m = 10,
    n = 0;
  const randomIndex = parseInt(Math.random() * (m - n + 1) + n);
  return colorList[randomIndex];
}
// for (let i = 0; i < 10; i++) {
//   const randomColor = generateRandomColor();
//   console.log(`randomColor-${i}`, randomColor);
// }

const data = [
  {
    label: '学校',
    pid: 1,
    selected: false,
    children: [
      { label: '小学', value: 'primary school', selected: false, pid: 1 },
      { label: '中学', value: 'middle school', selected: false, pid: 1 },
      { label: '大学', value: 'university', selected: false, pid: 1 },
    ],
  },
  {
    label: '交通工具',
    pid: 2,
    selected: false,
    children: [
      { label: '自行车', value: 'bike', selected: false, pid: 2 },
      { label: '摩托车', value: 'motorcycle', selected: false, pid: 2 },
      { label: '汽车', value: 'car', selected: false, pid: 2 },
    ],
  },
  {
    label: '水果',
    pid: 3,
    selected: false,
    children: [
      { label: '苹果', value: 'apple', selected: false, pid: 3 },
      { label: '香蕉', value: 'banana', selected: false, pid: 3 },
      { label: '橘子', value: 'orange', selected: false, pid: 3 },
    ],
  },
];

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];

const Index = () => {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  // checbox list
  const [checkList, setCheckList] = useState(data);
  const [allcheckedList, setAllcheckedList] = useState(data);

  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  // 全选
  const handleCheckAllChange = (checked, pid) => {
    const list = [...checkList];
    if (checked) {
      const checkGroup = list.find((l) => l.pid === pid);
      checkGroup.children.forEach((c) => (c.selected = true));
      setCheckList([...list]);
    } else {
      const checkGroup = list.find((l) => l.pid === pid);
      checkGroup.children.forEach((c) => (c.selected = false));
      setCheckList([...list]);
    }
  };

  // 单选
  const handleCheckSingleChange = (checkedList, pid) => {
    const list = [...checkList];
    const checkGroup = list.find((l) => l.pid === pid);
    checkGroup.children.forEach((c) => {
      if (checkedList.includes(c.value)) {
        c.selected = true;
      } else {
        c.selected = false;
      }
    });
    setCheckList([...list]);
  };

  // 展示所有选中的项
  const showCheckedItems = () => {
    const data = [];
    checkList.forEach((item) => {
      if (item.children.length) {
        item.children.forEach((c) => {
          if (c.selected) {
            data.push(c);
          }
        });
      }
    });
    return data.map((d) => <Tag color={generateRandomColor()}>{d.value}</Tag>);
  };

  return (
    <>
      <section style={{ border: '1px solid blue', padding: '10px' }}>
        <h1>示例</h1>
        <div
          style={{
            border: '1px solid #E9E9E9',
            marginBottom: '20px',
            padding: '10px',
          }}
        >
          <div
            style={{ borderBottom: '1px solid #E9E9E9', marginBottom: '5px' }}
          >
            <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
            >
              Check all
            </Checkbox>
          </div>
          <CheckboxGroup
            options={plainOptions}
            value={checkedList}
            onChange={onChange}
          />
        </div>
      </section>
      <br />
      <section style={{ border: '1px solid orange', padding: '10px' }}>
        <h1>测试</h1>
        {checkList.map((item) => (
          <ChecboxMultiply
            key={item.value}
            checkboxItem={item}
            checkAllChange={handleCheckAllChange}
            checkSingleChange={handleCheckSingleChange}
          />
        ))}
      </section>
      <section>
        <h1>已选择的项</h1>
        {showCheckedItems()}
      </section>
    </>
  );
};

export default Index;
