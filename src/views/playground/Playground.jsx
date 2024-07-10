import { DndProvider } from "react-dnd"
import Stage from './Stage.jsx'
import { HTML5Backend } from "react-dnd-html5-backend"
import SideBar from "../sideBar/SideBar.jsx"
import style from './playground.module.css'
import ToolBar from "./ToolBar.jsx"
import { useState } from "react"
import { BoxMeta } from "./boxUtils.js"

function Playground() {
  const [boxes, setBoxes] = useState([
    new BoxMeta({ cid: 0, x: 10, y: 10, w: 100, h: 100 }),
    new BoxMeta({ cid: 0, x: 20, y: 20, w: 100, h: 100 }),
    new BoxMeta({ cid: 0, x: 30, y: 30, w: 100, h: 100 })
  ])
  return (
    <div className={style.playground}>
      <ToolBar boxes={boxes} setBoxes={setBoxes} />
      <DndProvider backend={HTML5Backend}>
        <SideBar></SideBar>
        <Stage boxes={boxes} setBoxes={setBoxes}></Stage>
      </DndProvider>
    </div>
  )
}

export default Playground
