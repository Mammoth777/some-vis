import { DndProvider } from "react-dnd"
import Stage from './Stage.jsx'
import { HTML5Backend } from "react-dnd-html5-backend"
import SideBar from "../sideBar/SideBar.jsx"
import style from './playground.module.css'
import ToolBar from "./toolBar/ToolBar.jsx"
import { useState } from "react"
import { BoxMeta } from "./boxUtils.js"

function Playground() {
  const [boxes, setBoxes] = useState([
    new BoxMeta({ cid: 0, x: 10, y: 10, w: 100, h: 100 }),
    new BoxMeta({ cid: 0, x: 20, y: 20, w: 100, h: 100 }),
    new BoxMeta({ cid: 0, x: 30, y: 30, w: 100, h: 100 })
  ])
  const [zoom, setZoom] = useState(1)
  const onStageLarger = () => {
    console.log('stage larger')
    setZoom(zoom + 0.1)
  }
  const onStageSmaller = () => {
    console.log('stage smaller')
    setZoom(zoom - 0.1)
  }
  return (
    <div className={style.playground}>
      <ToolBar boxes={boxes} setBoxes={setBoxes} onStageLarger={onStageLarger} onStageSmaller={onStageSmaller} />
      <DndProvider backend={HTML5Backend}>
        <SideBar></SideBar>
        <Stage boxes={boxes} setBoxes={setBoxes} zoom={zoom}></Stage>
      </DndProvider>
    </div>
  )
}

export default Playground
