import PropTypes from 'prop-types'
import ReactECharts from 'echarts-for-react'
import presets from './presets';

/**
 * 自适应echarts组件
 * @returns 
 */
function EchartsBox({ options, preset }) {
  if (presets[preset]) {
    options = presets[preset];
  }
  return <ReactECharts option={options} />;
}

EchartsBox.propTypes = {
  options: PropTypes.object,
  preset: PropTypes.string
}

export default EchartsBox