import { useDrag } from "react-dnd"
import PropTypes from "prop-types"
import style from './box.module.css'
import EchartsBox from '../echartsBox/EchartsBox'
import React from "react"

const ParseMap = {
  0: {
    cid: 0,
    name: 'empty',
    element: null
  },
  1: {
    cid: 1,
    name: 'echarts',
    element: <EchartsBox />
  }
}

function Box({ data, children }) {
  const [{ isDragging }, drag] = useDrag(() => {
    return ({
      type: 'box',
      item: data,
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    })
  })
  const element = ParseMap[data.cid].element
  let zIndex = 0
  if (isDragging) {
    zIndex = 100
    return
  } else {
    zIndex = 1
  }
  const leftValue = data.left + 'px'
  const topValue = data.top + 'px'

  const innerEle = element ? React.cloneElement(element, { options: data.options, preset: data.preset }) : null

  return (
    <div className={style.box} ref={drag} style={{
      left: leftValue, top: topValue,
      ...data.style,
      zIndex
    }}>
      <header>box</header>
      {children}
      {
        innerEle
      }
    </div>
  )
}

Box.propTypes = {
  children: PropTypes.node,
  data: PropTypes.object.isRequired
}

export default Box