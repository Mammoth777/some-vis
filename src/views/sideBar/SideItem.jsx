import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';

function SideItem({ data }) {
  const [, drag] = useDrag(() => ({
    type: 'box',
    item: data,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }))
  return (
    <div ref={drag}>
      <p>
        { data.name }
      </p>
    </div>
  );
}

SideItem.propTypes = {
  data: PropTypes.object.isRequired
}

export default SideItem;