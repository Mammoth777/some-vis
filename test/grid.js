class Element {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.originalX = x;
    this.originalY = y;
  }

  // 计算到初始位置的距离
  distanceToOriginal() {
    return Math.sqrt(Math.pow(this.x - this.originalX, 2) + Math.pow(this.y - this.originalY, 2));
  }

  // 检查是否与另一个元素重叠
  overlapsWith(otherElement) {
    return !(
      this.x + this.w <= otherElement.x ||
      this.x >= otherElement.x + otherElement.w ||
      this.y + this.h <= otherElement.y ||
      this.y >= otherElement.y + otherElement.h
    );
  }
}

function gridLayout(elements, canvasWidth, canvasHeight, gridSize = 50) {
  const rows = Math.floor(canvasHeight / gridSize);
  const cols = Math.floor(canvasWidth / gridSize);
  const grid = Array(rows).fill(null).map(() => Array(cols).fill(null));

  elements.forEach(element => {
    let closestCell = null;
    let minDistance = Infinity;

    // 找到最近的空网格单元
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === null) {
          const cellX = c * gridSize + gridSize / 2 - element.w / 2;
          const cellY = r * gridSize + gridSize / 2 - element.h / 2;

          // 边界检查
          if (cellX >= 0 && cellY >= 0 && cellX + element.w <= canvasWidth && cellY + element.h <= canvasHeight) {
            // 重叠检查
            let overlaps = false;
            for (const placedElement of elements) {
              if (placedElement !== element && placedElement.overlapsWith(new Element(cellX, cellY, element.w, element.h))) {
                overlaps = true;
                break;
              }
            }

            if (!overlaps) {
              const distance = Math.sqrt(Math.pow(cellX - element.originalX, 2) + Math.pow(cellY - element.originalY, 2));
              if (distance < minDistance) {
                minDistance = distance;
                closestCell = { x: cellX, y: cellY, r: r, c: c };
              }
            }
          }
        }
      }
    }

    if (closestCell) {
      element.x = closestCell.x;
      element.y = closestCell.y;
      grid[closestCell.r][closestCell.c] = element;
    }
  });

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
  new Element(300, 300, 50, 50),
  new Element(350, 350, 50, 50),
];

const result = gridLayout(elements, canvasWidth, canvasHeight);

console.log(result);
