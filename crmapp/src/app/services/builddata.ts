
export abstract class Builder {
  constructor() { }
  
  protected buildData(data: Array<any>) {
    var items = {};
    var toRemove = [];
    data.forEach((item) => {
      items[item.id] = {...item};
    });
    for (var k in items) {
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
    })
    return items;
  }
}