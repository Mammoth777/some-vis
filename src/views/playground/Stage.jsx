import { useDrop } from "react-dnd"
import PropTypes from "prop-types"
import style from './stage.module.css'
import { useCallback, useState } from "react"
import Box from "./Box"

function Stage() {
  const [boxes, setBoxes] = useState([
    { id: 1, cid: 0, left: 10, top: 10 },
    { id: 2, cid: 0, left: 20, top: 20 },
    { id: 3, cid: 0, left: 30, top: 30 }
  ])

  const generateBox = (item) => {
    return {
      id: boxes.length + 1,
      left: 0,
      top: 0,
      cid: item.cid,
      ...item.payload
    }
  }
  const moveBox = useCallback((id, left, top) => {
    console.log(boxes, 'boxes callback')
    const box = boxes.find(box => box.id === id)
    if (box) {
      box.left = left
      box.top = top
      setBoxes([...boxes])
      console.log(box, 'box')
    }
  }, [boxes, setBoxes])

  const [, drop] = useDrop(() => {
    return {
      accept: 'box',
      drop: (item, monitor) => {
        if (item.isSideItem) {
          const box = generateBox(item)
          const { x, y } = monitor.getSourceClientOffset()
          box.left = x - 200
          box.top = y
          setBoxes([...boxes, box])
        } else {
          const delta = monitor.getDifferenceFromInitialOffset()
          const left = Math.round(item.left + delta.x)
          const top = Math.round(item.top + delta.y)
          item.left = left
          item.top = top
          moveBox(item.id, left, top)
        }
      },
    }
  }, [boxes])
  return (
    <div className={style.stage} ref={drop}>
      {
        boxes.map(box => {
          return (
            <Box key={box.id} data={box}>
              { box.id }
            </Box>
          )
        })
      }
    </div>
  )
}

Stage.propTypes = {
  children: PropTypes.node
}

export default Stage