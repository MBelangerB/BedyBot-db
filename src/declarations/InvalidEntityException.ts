export class InvalidEntityException extends Error {

  
  entityId: string | string[] | null;
  // entityIds: string[] | null;
  errorType: ErrorType;
  tableName: string;
  // static ErrorType: typeof ErrorType;

  constructor(entityId : string | string[], tableName : string, message : string, errorType = ErrorType.NONE) {
    super(message);

    this.entityId = entityId;
    // if (Array.isArray(entityId)) {
    //   this.entityId = null;
    //   this.entityIds = entityId;
    // } else {
    //   this.entityId = entityId;
    //   this.entityIds = null;
    // }

    this.errorType = errorType;
    this.tableName = tableName;
  }


  getInnerMessage() {
    let errMessage = this.message;
    switch (this.errorType) {
      case ErrorType.INVALID_PK:
        errMessage = `Error ${this.errorType} : Can't find primary key '${this.#getEntityId()}' in ${this.tableName}`;
        break;
    }

    return errMessage;
  }

  /**
   * Return a entity ID or list of entity ids
   * @returns Entity ID or ids
   */
  #getEntityId() {
    if (this.entityId != null && (Array.isArray(this.entityId) == false)) {
      return this.entityId;

    } else if (this.entityId != null && Array.isArray(this.entityId) && this.entityId.length > 0) {
      return `(${this.entityId.join(", ")})`;

    } else {
      return 'N/A'
    }
  }

}

export enum ErrorType {
  NONE = 0,
  /**
   * Primary key doesn't exist for this entity.
   */
  INVALID_PK = 100,
}

// InvalidEntityException.ErrorType = ErrorType;

// InvalidEntityException.ErrorType = {
//   NONE: 0,
//   /**
//    * Primary key doesn't exist for this entity.
//    */
//   INVALID_PK: 100,
// }