export const getComps = async () => {
  return [
    {
      cid: 1,
      name: 'comp1',
      type: 'box',
      isSideItem: true,
      payload: {
        preset: 'line', options: {}, style: {
          width: '300px',
          height: '300px'
        }
      }
    },
    {
      cid: 2,
      name: 'comp2',
      type: 'box',
      isSideItem: true,
      payload: { preset: 'line', options: {} }
    },
    {
      cid: 3,
      name: 'comp3',
      type: 'box',
      isSideItem: true,
      payload: { preset: 'line', options: {} }
    },
  ]
}