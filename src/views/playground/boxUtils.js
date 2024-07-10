function generateId() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000);
  return timestamp + random;
}

/**
 * BoxMeta class
 * @param {Object} obj
 * @param {Number} obj.cid - component id
 * @param {Number} obj.x - x position
 * @param {Number} obj.y - y position
 * @param {Number} obj.w - width
 * @param {Number} obj.h - height
 * @param {Object} obj.payload
 * @param {Number} obj.payload.id
 * @param {Number} obj.payload.x
 * @param {Number} obj.payload.y
 * @param {Number} obj.payload.width
 * @param {Number} obj.payload.height
 * @param {Object} obj.payload.style
 * @param {Object} obj.payload.options
 * @param {Object} obj.payload.preset
 * @returns {BoxMeta}
 */
export class BoxMeta {
  constructor(obj) {
    this.id = obj.id || generateId();
    this.x = obj.x || 0;
    this.y = obj.y || 0;
    this.w = obj.w || 70;
    this.h = obj.h || 70;
    if (obj.cid === undefined || obj.cid === null) {
      throw new Error('cid is required');
    }
    this.cid = obj.cid;
    Object.assign(this, obj.payload);
  }
}

/**
 * 
 * @param {Object} item 
 * @returns {BoxMeta}
 */
export function generateBoxMetaFromComp(item) {
  const {w, h} = item.box || {w: 70, h: 70};
  return new BoxMeta({
    cid: item.cid,
    w,
    h,
    payload: item.payload
  });
}