export const getComps = async () => {
  return [
    {
      id: 1,
      cid: 1,
      name: '折线图',
      type: 'box',
      isSideItem: true,
      box: {
        w: 400,
        h: 250,
      },
      payload: {
        preset: 'line', options: {}
      }
    },
    {
      id: 2,
      cid: 1,
      name: '柱状图',
      type: 'box',
      isSideItem: true,
      box: {
        w: 400,
        h: 250
      },
      payload: {
        preset: 'bar', options: {}
      }
    },
    {
      id: 3,
      cid: 1,
      name: '饼图',
      type: 'box',
      isSideItem: true,
      box: {
        w: 400,
        h: 250
      },
      payload: {
        preset: 'pie', options: {}
      }
    },
    {
      id: 4,
      cid: 0,
      name: '容器',
      isSideItem: true,
      box: {
        w: 400,
        h: 400
      },
      payload: {
        preset: 'container', style: {
          width: '400px',
          height: '400px'
        }
      }
    }
  ]
}