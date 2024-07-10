import PropTypes from 'prop-types';
import style from './toolbar.module.css'
import { gridLayout } from '../../layouts/grid';
import { Element } from '../../layouts/grid';


function ToolBar({ boxes, setBoxes }) {
  const elements = boxes.map(box => new Element(box.x, box.y, box.w, box.h, box))
  const autoLayout = () => {
    console.log('auto layout')
    console.log(boxes, 'boxes in toolbar')
    const result = gridLayout(elements, 800, 600, 10)
    setBoxes(result.map(element => {
      const box = element._origin
      box.x = element.x
      box.y = element.y
      return box
    }))
  }
  return (
    <div className={style.toolBar}>
      <button onClick={autoLayout}>auto layout</button>
      {/* <button>Undo</button>
      <button>Redo</button> */}
    </div>
  );
}

ToolBar.propTypes = {
  boxes: PropTypes.array.isRequired,
  setBoxes: PropTypes.func.isRequired
}

export default ToolBar;