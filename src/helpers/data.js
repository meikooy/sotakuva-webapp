export const normalize = data => {
  return Array.isArray(data)
    ? data.reduce((acc, cur) => ({...acc, [cur.objectID]: cur}), {})
    : data;
};
