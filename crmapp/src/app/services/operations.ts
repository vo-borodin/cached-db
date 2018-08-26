import { Guid } from "guid-typescript";
import { Builder } from './builddata';

export abstract class Operation extends Builder {
  protected name: string;
  
  constructor() {
    super();
    this.name = this.constructor.name;
  }
  
  public abstract call(nodes: Array<any>): Array<any>;
}

export class Create extends Operation {
  /** id: Guid
   *    -- the temporary identifier
   *    -- for building tree and to
   *    -- keep the relations between
   *    -- existing and new nodes
   */
  private id: any;
  /** parentId: Primary key
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
  
  public call(nodes: Array<any>): Array<any> {
    if (!this.id)
      this.id = Guid.raw();
    var newRawNode = {
      id: this.id,
      is_deleted: false,
      parent_id: this.parentId,
      value: this.value,
      way_to_root: 0
    };
    nodes.push(newRawNode);
    return nodes;
  }
}

export class Delete extends Operation {
  /** id: Primary key
   *    -- id of record to delete
   */
  private id: any;
  
  constructor(id: any) {
    super();
    
    this.id = id;
  }
  
  public call(nodes: Array<any>): Array<any> {
    /*nodes.forEach((item) => {
      if (item.id == this.id || item.way_to_root.indexOf(this.id) != -1)
        item.is_deleted = true;
    });*/
    var obj = this.buildData(nodes);
    console.log(obj);
    return nodes;
  }
}

export class Update extends Operation {
  /** id: Primary key
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
  
  public call(nodes: Array<any>): Array<any> {
    nodes.forEach((item) => {
      if (item.id == this.id)
        item.value = this.value;
    });
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

