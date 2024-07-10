class Element {
  constructor(x, y, w, h) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.originalX = x;
      this.originalY = y;
      this.dx = 0; // 位置变化量
      this.dy = 0; // 位置变化量
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

// 力导向算法
function forceDirected(elements, canvasWidth, canvasHeight, iterations = 1000, repulsionForce = 100, attractionForce = 0.1) {
  for (let iter = 0; iter < iterations; iter++) {
      // 初始化力
      elements.forEach(element => {
          element.dx = 0;
          element.dy = 0;
      });

      // 计算排斥力
      for (let i = 0; i < elements.length; i++) {
          for (let j = i + 1; j < elements.length; j++) {
              let e1 = elements[i];
              let e2 = elements[j];
              
              let dx = e1.x + e1.w / 2 - (e2.x + e2.w / 2);
              let dy = e1.y + e1.h / 2 - (e2.y + e2.h / 2);
              let distance = Math.sqrt(dx * dx + dy * dy);
              if (distance < (e1.w + e2.w) / 2) {
                  let force = repulsionForce / (distance * distance);
                  e1.dx += force * dx / distance;
                  e1.dy += force * dy / distance;
                  e2.dx -= force * dx / distance;
                  e2.dy -= force * dy / distance;
              }
          }
      }

      // 计算引力
      elements.forEach(element => {
          let dx = element.originalX - element.x;
          let dy = element.originalY - element.y;
          element.dx += attractionForce * dx;
          element.dy += attractionForce * dy;
      });

      // 更新位置并检测边界
      elements.forEach(element => {
          element.x += element.dx;
          element.y += element.dy;

          // 确保新位置在画布范围内
          element.x = Math.max(0, Math.min(element.x, canvasWidth - element.w));
          element.y = Math.max(0, Math.min(element.y, canvasHeight - element.h));
      });
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

const result = forceDirected(elements, canvasWidth, canvasHeight);

console.log(result);