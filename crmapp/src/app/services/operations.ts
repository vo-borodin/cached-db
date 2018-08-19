import { Guid } from "guid-typescript";

enum OperationEnum {
  Create,
  Delete,
  Update
}

export abstract class Operation {
  public abstract call(nodes: Array<any>): Array<any>;
}

export class Create extends Operation {
  /** _id: Guid
   *    -- the temporary identifier
   *    -- for building tree
   */
  private _id: any = null;
  /** _parentId: Primary key
   *    -- the parent of new node
   */
  private _parentId: any;
  /** _value: string
   *    -- the value of new node
   */
  private _value: string;
  
  constructor(parentId: any, value: string) {
    super();
    
    this._parentId = parentId;
    this._value = value;
  }
  
  public call(nodes: Array<any>): Array<any> {
    console.log("Create pre-applyed");
    if (!this._id)
      this._id = Guid.raw();
    var newRawNode = {
      id: this._id,
      is_deleted: false,
      parent_id: this._parentId,
      value: this._value
    };
    nodes.push(newRawNode);
    return nodes;
  }
}

export class Delete extends Operation {
  /** _id: Primary key
   *    -- id of record to delete
   */
  private _id: any;
  
  constructor(id: any) {
    super();
    
    this._id = id;
  }
  
  public call(nodes: Array<any>): Array<any> {
    console.log("Delete pre-applyed");
    var traverse = (id) => {
      nodes.forEach((item) => {
        if (item.id == id)
          item.is_deleted = true;
        if (item.parent_id == id)
          traverse(item.id);
      });
    };
    traverse(this._id);
    return nodes;
  }
}

export class Update extends Operation {
  /** _id: Primary key
   *    -- id of record to update
   */
  private _id: any;
  
  /** value: string
   *    -- new value of the node
   */
  private _value;
  
  constructor(id: any, value: string) {
    super();
    
    this._id = id;
    this._value = value;
  }
  
  public call(nodes: Array<any>): Array<any> {
    console.log("Update pre-applyed");
    nodes.forEach((item) => {
      if (item.id == this._id)
        item.value = this._value;
    });
    return nodes;
  }
}

