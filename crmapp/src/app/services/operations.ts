import { Builder } from './builddata';
import { Guid } from "guid-typescript";

export abstract class Operation extends Builder {
  protected name: string;
  
  constructor() {
    super();
    this.name = this.constructor.name;
  }
  
  public abstract call(nodes: Object): Object;
}

export class Create extends Operation {
  /** id: Guid / Primary key
   *    -- the temporary identifier
   *    -- for building tree and to
   *    -- keep the relations between
   *    -- existing and new nodes;
   *    -- after apply the changes
   *    -- to base id is substituted
   *    -- by real id from base
   */
  private id: any;
  /** parentId: Guid / Primary key
   *    -- the parent of new node
   */
  private parentId: any;
  /** value: string
   *    -- the value of new node
   */
  private value: string;
  
  constructor(parentId: any, value: string, id: any=null) {
    super();
    
    this.parentId = parentId;
    this.value = value;
    this.id = id;
  }
  
  public call(nodes: Object): Object {
    if (!this.id)
      this.id = Guid.raw();
    var newRawNode = {
      id: this.id,
      is_deleted: false,
      parent_id: this.parentId,
      value: this.value,
      relation: 0
    };
    nodes[this.id] = newRawNode;
    return nodes;
  }
}

export class Delete extends Operation {
  /** id: Guid / Primary key
   *    -- id of record to delete
   */
  private id: any;
  
  constructor(id: any) {
    super();
    
    this.id = id;
  }
  
  private static traverse(item, callback: (i) => void): void {
    callback(item);
    for (const k in item.children)
      Delete.traverse(item.children[k], callback);
  }
  
  public call(nodes: Object): Object {
    var toRemove = new Set([this.id]);
    var obj = this.build(nodes);
    
    for (const k in obj) {
      var item = obj[k];
      Delete.traverse(item, (a) => {
        if (a.id == this.id) {
          Delete.traverse(a, (b) => {
            toRemove.add(b.id);
          });
        }
      });
    }
    
    for (const k in obj) {
      var item = obj[k];
      if (toRemove.has(item.relation)) {
        Delete.traverse(item, (a) => {
          toRemove.add(a.id);
        });
      }
    }
    
    toRemove.forEach((id) => {
      nodes[id].is_deleted = true;
    });
    return nodes;
  }
}

export class Update extends Operation {
  /** id: Guid / Primary key
   *    -- id of record to update
   */
  private id: any;
  
  /** value: string
   *    -- new value of the node
   */
  private value: string;
  
  constructor(id: any, value: string) {
    super();
    
    this.id = id;
    this.value = value;
  }
  
  public call(nodes: Object): Object {
    nodes[this.id].value = this.value;
    return nodes;
  }
}

export class OperationFactory {
  public static get(cfg: Object): Operation {
    if (cfg['name'] == 'Create')
      return new Create(cfg['parentId'], cfg['value'], cfg['id']);
    else if (cfg['name'] == 'Delete')
      return new Delete(cfg['id']);
    else
      return new Update(cfg['id'], cfg['value']);
  }
}

