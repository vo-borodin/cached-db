
export abstract class Builder {
  constructor() { }
  
  protected build(items: Object): Object {
    var toRemove = [];
    for (const k in items) {
      var parentId = items[k].parent_id;
      if (parentId in items) {
        if ('children' in items[parentId])
          items[parentId].children[k] = items[k];
        else
          items[parentId].children = {k: items[k]};
        toRemove.push(k)
      }
      if (!('children' in items[k]))
          items[k].children = {};
    }
    toRemove.forEach((id) => {
      delete items[id];
    });
    return items;
  }
}