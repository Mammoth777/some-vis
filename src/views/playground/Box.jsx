import { useDrag } from "react-dnd"
import PropTypes from "prop-types"
import style from './box.module.css'
import React from "react"
import GroupBox from "../boxes/groupBox/GroupBox"
import EchartsBox from '../boxes/echartsBox/EchartsBox'
import EmptyBox from '../boxes/emptyBox/EmptyBox'
import { BoxMeta } from "./boxUtils"

const ParseMap = {
  0: {
    cid: 0,
    name: 'empty',
    element: <GroupBox />
  },
  1: {
    cid: 1,
    name: 'echarts',
    element: <EchartsBox />
  }
}

function Box({ boxMeta }) {
  const [{ isDragging }, drag] = useDrag(() => {
    return ({
      type: 'box',
      item: boxMeta,
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    })
  })
  console.log('box')
  const element = ParseMap[boxMeta.cid].element
  let zIndex = 0
  let hide = false
  if (isDragging) {
    zIndex = 100
    hide = true
  } else {
    zIndex = 1
    hide = false
  }
  const leftValue = boxMeta.x + 'px'
  const topValue = boxMeta.y + 'px'
  const widthValue = boxMeta.w + 'px'
  const heightValue = boxMeta.h + 'px'

  const innerEle = element ? React.cloneElement(element, { options: boxMeta.options, preset: boxMeta.preset }) : <EmptyBox />

  return (
    <div className={`${style.box} ${hide ? style.hide : ''}`} ref={drag} style={{
      left: leftValue, top: topValue,
      width: widthValue, height: heightValue,
      zIndex
    }}>
      {
        innerEle
      }
    </div>
  )
}

Box.propTypes = {
  children: PropTypes.node,
  boxMeta: PropTypes.instanceOf(BoxMeta).isRequired
}

export default Box