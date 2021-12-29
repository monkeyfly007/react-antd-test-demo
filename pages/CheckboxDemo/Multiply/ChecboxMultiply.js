import React, { useState, useMemo } from 'react';
import { Checkbox } from 'antd';

//注意：option 的字段定义，只要存在 label 和 value 即可。
// interface IOption {
//   label: string;
//   value: string;
//   disabled?: boolean;
// }

const CheckboxGroup = Checkbox.Group;

const ChecboxMultiply = (props) => {
  const { checkboxItem, checkAllChange, checkSingleChange } = props;
  const { label, pid, children: options } = checkboxItem;
  // 英[ˌɪndɪˈtɜːmɪnət] adj.	模糊的; 不确定的; 难以识别的;
  // checkbox 的未选中状态，只负责样式控制
  const [indeterminate, setIndeterminate] = useState(false);
  // 是否全选
  const [checkAll, setCheckAll] = React.useState(false);

  const getCheckedList = () => {
    let values = [];
    options.forEach((c) => {
      if (c.selected) {
        values.push(c.value);
      }
    });
    // console.log(values, 'values');
    return values;
  };

  // 全选
  const onCheckAllChange = (e) => {
    const checked = e.target.checked;
    // setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(checked);
    checkAllChange(checked, pid);
  };

  // 单选
  const onCheckSingleChange = (list) => {
    setIndeterminate(!!list.length && list.length < options.length);
    setCheckAll(list.length === options.length);
    checkSingleChange(list, pid);
  };

  return (
    <div
      style={{
        border: '1px solid #E9E9E9',
        marginBottom: '20px',
        padding: '10px',
      }}
    >
      <div style={{ borderBottom: '1px solid red', marginBottom: '5px' }}>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          {label}
        </Checkbox>
      </div>
      <CheckboxGroup
        options={options} // 指定可选项 string[] | Option[]
        value={getCheckedList()} // 指定选中的选项，string[]
        onChange={onCheckSingleChange}
      />
    </div>
  );
};
export default ChecboxMultiply;
