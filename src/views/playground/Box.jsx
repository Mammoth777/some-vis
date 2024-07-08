import { useDrag } from "react-dnd"
import PropTypes from "prop-types"
import style from './box.module.css'

function Box({ data, children }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    item: data,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))
  console.log(isDragging, 'isDragging')
  if (isDragging) {
    return <div ref={drag}></div>
  }
  const leftValue = data.left + 'px'
  const topValue = data.top + 'px'

  return (
    <div className={style.box} ref={drag} style={{
      left: leftValue, top: topValue
    }}>
      <header>box</header>
      {children}
    </div>
  )
}

Box.propTypes = {
  children: PropTypes.node,
  data: PropTypes.object.isRequired
}

export default Box