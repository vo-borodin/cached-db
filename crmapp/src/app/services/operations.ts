enum OperationEnum {
  Create,
  Delete,
  Update
}

export abstract class Operation {
  public abstract call(nodes: Node[]): Node[];
}

export class Create extends Operation {
  /** parent_id: Primary key | null
   *    -- the parent of new node
   */
  private _parentId: any;
  /** value: string
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
    return nodes;
  }
}

export class Delete extends Operation {
  /** id: Primary key
   *    -- id of record to delete
   */
  private _id: any;
  
  constructor(id: any) {
    super();
    
    this._id = id;
  }
  
  public call(nodes: Array<any>): Array<any> {
    console.log("Delete pre-applyed");
    return nodes;
  }
}

export class Update extends Operation {
  /** id: Primary key
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
    return nodes;
  }
}

