import { useDrop } from "react-dnd"
import PropTypes from "prop-types"
import style from './stage.module.css'
import { useCallback } from "react"
import Box from "./Box"
import { generateBoxMetaFromComp }  from './boxUtils'

const LEFT_SIDE_WIDTH = 200

function Stage({boxes, setBoxes}) {
  const moveBox = useCallback((id, x, y) => {
    const box = boxes.find(box => box.id === id)
    if (box) {
      box.x = x
      box.y = y
      setBoxes([...boxes])
    }
  }, [boxes, setBoxes])

  const [, drop] = useDrop(() => {
    return {
      accept: 'box',
      drop: (item, monitor) => {
        if (item.isSideItem) {
          const box = generateBoxMetaFromComp(item)
          const { x, y } = monitor.getSourceClientOffset()
          box.x = x - LEFT_SIDE_WIDTH
          box.y = y
          setBoxes([...boxes, box])
        } else {
          const delta = monitor.getDifferenceFromInitialOffset()
          const x = Math.round(item.x + delta.x)
          const y = Math.round(item.y + delta.y)
          item.x = x
          item.y = y
          moveBox(item.id, x, y)
        }
      },
    }
  }, [boxes])
  return (
    <div className={style.stage} ref={drop}>
      {
        boxes.map(boxMeta => {
          return (
            <Box key={boxMeta.id} boxMeta={boxMeta}>
              { boxMeta.id }
            </Box>
          )
        })
      }
    </div>
  )
}

Stage.propTypes = {
  children: PropTypes.node,
  boxes: PropTypes.array.isRequired,
  setBoxes: PropTypes.func.isRequired
}

export default Stage