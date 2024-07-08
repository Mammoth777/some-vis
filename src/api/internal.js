export const getComps = async () => {
  return [
    {
      id: 1,
      cid: 1,
      name: '折线图',
      type: 'box',
      isSideItem: true,
      payload: {
        preset: 'line', options: {}, style: {
          width: '400px',
          height: '350px'
        }
      }
    },
    {
      id: 2,
      cid: 1,
      name: '柱状图',
      type: 'box',
      isSideItem: true,
      payload: {
        preset: 'bar', options: {}, style: {
          width: '400px',
          height: '350px'
        }
      }
    },
    {
      id: 3,
      cid: 1,
      name: '饼图',
      type: 'box',
      isSideItem: true,
      payload: {
        preset: 'pie', options: {}, style: {
          width: '400px',
          height: '350px'
        }
      }
    },
  ]
}