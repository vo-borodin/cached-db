import { Guid } from "guid-typescript";

enum OperationEnum {
  Create,
  Delete,
  Update
}

export abstract class Operation {
  protected name: string;
  
  constructor() {
    this.name = this.constructor.name;
  }
  
  public abstract call(nodes: Array<any>): Array<any>;
  
  protected traverse(item, callback: (i) => void) {
    callback(item)
    for (let k in item.children)
      this.traverse(item.children[k], callback);
  }
}

export class Create extends Operation {
  /** id: Guid
   *    -- the temporary identifier
   *    -- for building tree and to
   *    -- keep the relations between
   *    -- existing and new nodes
   */
  private id: any = null;
  /** parentId: Primary key
   *    -- the parent of new node
   */
  private parentId: any;
  /** value: string
   *    -- the value of new node
   */
  private value: string;
  
  constructor(parentId: any, value: string) {
    super();
    
    this.parentId = parentId;
    this.value = value;
  }
  
  public call(nodes: Array<any>): Array<any> {
    if (!this.id)
      this.id = Guid.raw();
    var newRawNode = {
      id: this.id,
      is_deleted: false,
      parent_id: this.parentId,
      children: {},
      value: this.value
    };
    /*nodes.forEach((item) => {
      this.traverse(item,
        (a) => {
          if (a.id == this.parentId)
            a.children[this.id] = newRawNode;
        }
      );
    });*/
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
    nodes.forEach((item) => {
      /*this.traverse(item, (a) => {
        if (a.id == this.id) {
          this.traverse(a, (b) => {
            b.is_deleted = true;
          });
        }
      });*/
      if (item.id == this.id)
        item.is_deleted = true;
    });
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
      /*this.traverse(item,
        (a) => {
          if (a.id == this.id)
            a.value = this.value;
        }
      );*/
      if (item.id == this.id)
        item.value = this.value;
    });
    return nodes;
  }
}
