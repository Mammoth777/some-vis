import { useState } from 'react'
import style from './sideBar.module.css'
import SideItem from './SideItem'

function SideBar() {
  const [comps] = useState([
    { cid: 1, name: 'comp1', type: 'box', isSideItem: true },
    { cid: 2, name: 'comp2', type: 'box', isSideItem: true },
    { cid: 3, name: 'comp3', type: 'box', isSideItem: true }, 
  ])

  return (
    <div className={style.sidebar}>
      <p>list</p>
      <ul>
        {
          comps.map(comp => {
            return (
              <SideItem key={comp.cid} data={comp} />
            )
          })
        }
      </ul>
    </div>
  )
}

export default SideBar