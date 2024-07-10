class Element {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.originalX = x;
    this.originalY = y;
  }

  // 检查是否与另一个元素重叠
  isOverlap(other) {
    return !(this.x + this.w <= other.x ||
      this.x >= other.x + other.w ||
      this.y + this.h <= other.y ||
      this.y >= other.y + other.h);
  }

  // 计算到初始位置的距离
  distanceToOriginal() {
    return Math.sqrt(Math.pow(this.x - this.originalX, 2) + Math.pow(this.y - this.originalY, 2));
  }
}

// 模拟退火算法
function simulatedAnnealing(elements, canvasWidth, canvasHeight) {
  const temperature = 1000;
  const coolingRate = 0.03;

  let t = temperature;

  while (t > 1) {
    for (let i = 0; i < elements.length; i++) {
      let current = elements[i];

      // 生成一个新的随机位置
      let newX = current.x + (Math.random() - 0.5) * t;
      let newY = current.y + (Math.random() - 0.5) * t;

      // 确保新位置在画布范围内
      newX = Math.max(0, Math.min(newX, canvasWidth - current.w));
      newY = Math.max(0, Math.min(newY, canvasHeight - current.h));

      let newElement = new Element(newX, newY, current.w, current.h);

      // 检查新位置是否与其他元素重叠
      let overlap = false;
      for (let j = 0; j < elements.length; j++) {
        if (i !== j && newElement.isOverlap(elements[j])) {
          overlap = true;
          break;
        }
      }

      if (!overlap) {
        let currentDistance = current.distanceToOriginal();
        let newDistance = Math.sqrt(Math.pow(newX - current.originalX, 2) + Math.pow(newY - current.originalY, 2));

        // 根据距离和温度决定是否接受新位置
        if (newDistance < currentDistance || Math.random() < Math.exp((currentDistance - newDistance) / t)) {
          current.x = newX;
          current.y = newY;
        }
      }
    }

    // 降低温度
    t *= 1 - coolingRate;
  }

  return elements;
}

// 示例
const canvasWidth = 800;
const canvasHeight = 600;
const elements = [
  new Element(100, 100, 50, 50),
  new Element(110, 150, 50, 50),
  new Element(200, 200, 50, 50),
  new Element(250, 250, 50, 50),
];

const result = simulatedAnnealing(elements, canvasWidth, canvasHeight);

console.log(result);