import { DndProvider } from "react-dnd"
import Stage from './Stage.jsx'
import { HTML5Backend } from "react-dnd-html5-backend"
import SideBar from "../sideBar/SideBar.jsx"
import style from './playground.module.css'

function Playground() {
  return (
    <div className={style.playground}>
      <span>
      </span>
      <DndProvider backend={HTML5Backend}>
        <SideBar></SideBar>
        <Stage></Stage>
      </DndProvider>
    </div>
  )
}

export default Playground