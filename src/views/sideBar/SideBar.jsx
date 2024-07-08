import { useEffect, useState } from 'react'
import style from './sideBar.module.css'
import SideItem from './SideItem'
import { getComps } from '../../api/internal'

function SideBar() {
  const [comps, setComps] = useState([])
  useEffect(() => {
    getComps()
      .then(data => {
        setComps(data)
      })
  }, [])

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