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

/**
 * 1. 越左上角， 优先级越高， 优先放置
 * 2. 从左到右， 从上到下， 依次放置
 * 3. 如果无法放置， 保持原始位置
 * 4. 返回放置后的元素数组
 * 
 * @param {Element[]} elements 
 * @param {number} canvasWidth 
 * @param {number} canvasHeight 
 * @param {number} gridSize 
 * @param {number} gapX
 * @param {number} gapY
 * @param {object} padding
 * @param {number} padding.top
 * @param {number} padding.right
 * @param {number} padding.bottom
 * @param {number} padding.left
 * @returns 
 */
export function gridLayout(elements, canvasWidth, canvasHeight, gridSize = 10, gapX = 5, gapY = 5, padding = { top: 25, right: 5, bottom: 5, left: 25 }) {
  elements = sortElements(elements);
  console.log(elements, 'elements in gridLayout')
  const rows = Math.floor((canvasHeight - padding.top - padding.bottom) / (gridSize + gapY));
  const cols = Math.floor((canvasWidth - padding.left - padding.right) / (gridSize + gapX));
  const grid = Array(rows).fill(null).map(() => Array(cols).fill(null));

  elements.forEach((element, index) => {
    let placed = false;

    // 尝试将元素放置在当前网格单元
    for (let r = 0; r < rows && !placed; r++) {
      for (let c = 0; c < cols && !placed; c++) {
        const cellX = padding.left + c * (gridSize + gapX);
        const cellY = padding.top + r * (gridSize + gapY);

        // 边界检查
        if (cellX >= padding.left && cellY >= padding.top && cellX + element.w <= canvasWidth - padding.right && cellY + element.h <= canvasHeight - padding.bottom) {
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

function sortElements(elements) {
  return elements.sort((a, b) => {
    if (a.y === b.y) {
      return a.x - b.x;
    }
    return a.y - b.y;
  })
}