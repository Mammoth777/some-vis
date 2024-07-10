export class Element {
  constructor(x, y, w, h, origin) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.originalX = x;
    this.originalY = y;
    this._origin = origin;
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


export function gridLayout(elements, canvasWidth, canvasHeight, gridSize = 50) {
  const rows = Math.floor(canvasHeight / gridSize);
  const cols = Math.floor(canvasWidth / gridSize);
  const grid = Array(rows).fill(null).map(() => Array(cols).fill(null));

  elements.forEach((element, index) => {
    let placed = false;

    // 尝试将元素放置在当前网格单元
    for (let r = 0; r < rows && !placed; r++) {
      for (let c = 0; c < cols && !placed; c++) {
        const cellX = c * gridSize;
        const cellY = r * gridSize;

        // 边界检查
        if (cellX >= 0 && cellY >= 0 && cellX + element.w <= canvasWidth && cellY + element.h <= canvasHeight) {
          // 重叠检查
          let overlaps = false;
          for (let i = 0; i < index; i++) {
            const placedElement = elements[i];
            if (placedElement.overlapsWith(new Element(cellX, cellY, element.w, element.h))) {
              overlaps = true;
              break;
            }
          }

          if (!overlaps) {
            element.x = cellX;
            element.y = cellY;
            grid[r][c] = element;
            placed = true;
          }
        }
      }
    }

    // 如果无法放置，保持原始位置
    if (!placed) {
      element.x = element.originalX;
      element.y = element.originalY;
    }
  });

  return elements;
}