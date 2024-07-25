import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';
import style from './sideBar.module.css';
function SideItem({ data }) {
  const [, drag] = useDrag(() => ({
    type: 'box',
    item: data,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))
  return (
    <li ref={drag} className={style.item}>
      <p>
        { data.name }
      </p>
    </li>
  );
}

SideItem.propTypes = {
  data: PropTypes.object.isRequired
}

export default SideItem;