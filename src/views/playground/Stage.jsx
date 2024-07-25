import { useDrop } from "react-dnd"
import PropTypes from "prop-types"
import style from './stage.module.css'
import { useCallback } from "react"
import Box from "./Box"
import { generateBoxMetaFromComp } from './boxUtils'

// const LEFT_SIDE_WIDTH = 200

function Stage({ boxes, setBoxes, zoom }) {
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
        const stageDom = document.querySelector(`.${style.stage}`)
        const { x: stageX, y: stageY } = stageDom.getBoundingClientRect()
        const { x: itemX, y: itemY } = monitor.getClientOffset()
        console.log(
          {
            clientOffset: monitor.getClientOffset(),
            differenceFromInitialOffset: monitor.getDifferenceFromInitialOffset(),
            dropResult: monitor.getDropResult(),
            initialClientOffset: monitor.getInitialClientOffset(),
            initialSourceClientOffset: monitor.getInitialSourceClientOffset(),
            sourceClientOffset: monitor.getSourceClientOffset(),
          },
          'item, monitor')
        console.log({
          item,
          stageX,
          stageY,
          itemX,
          itemY,
          x: (itemX - stageX) / zoom,
          y: (itemY - stageY) / zoom
        })
        console.log({
          x: monitor.getDifferenceFromInitialOffset().x + item.x,
          y: monitor.getDifferenceFromInitialOffset().y + item.y
        })

        if (item.isSideItem) {
          const box = generateBoxMetaFromComp(item)
          // box.x = (itemX - stageX - (item.box.w * zoom / 2))
          // box.y = (itemY - stageY - (item.box.h * zoom / 2))
          box.x = (itemX - stageX)
          box.y = (itemY - stageY)
          setBoxes([...boxes, box])
        } else {
          const offset = monitor.getDifferenceFromInitialOffset()
          const x = ((offset.x / zoom) + item.x)
          const y = ((offset.y / zoom) + item.y)
          item.x = x
          item.y = y
          moveBox(item.id, x, y)
        }
      },
    }
  }, [boxes, zoom])

  return (
    <div className={style.stageContainer}>
      <div className={style.stage} style={{
        transform: `scale(${zoom})`,
      }} ref={drop}>
        {
          boxes.map(boxMeta => {
            return (
              <Box key={boxMeta.id} boxMeta={boxMeta} zoom={zoom}>
                {boxMeta.id}
              </Box>
            )
          })
        }
      </div>
    </div>
  )
}

Stage.propTypes = {
  children: PropTypes.node,
  boxes: PropTypes.array.isRequired,
  setBoxes: PropTypes.func.isRequired,
  zoom: PropTypes.number.isRequired,
}

export default Stage