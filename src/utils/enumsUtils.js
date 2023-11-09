export function getEnumsMap(columns) {
  const nestedMap = {};
  columns.forEach((column) => {
    if (column.props && column.props.options) {
      const options = column.props.options;
      options.forEach(prop => {
        const key = `${column.dataIndex}${prop.value}`;
        nestedMap[key] = prop.label;
      });
    }

  })
  return nestedMap;
}
