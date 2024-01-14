class InvalidEntityException extends Error {

  constructor(entityId, tableName, message, errorType = InvalidEntityException.ErrorType.NONE) {
    super(message);
    if (Array.isArray(entityId)) {
      this.entityId = null;
      this.entityIds = entityId;
    } else {
      this.entityId = entityId;
    }

    this.errorType = errorType;
    this.tableName = tableName;
  }


  getInnerMessage() {
    let errMessage = this.message;
    switch (this.errorType) {
      case InvalidEntityException.ErrorType.INVALID_PK:
        errMessage = `Error ${this.errorType} : Can't find primary key '${this.#getEntityId()}' in ${this.tableName}`;
        break;

      case InvalidEntityException.entityId.NULL_ENTITY:
        errMessage = `Error ${this.errorType} : Entity object is null or undefined`;
        break;

      case InvalidEntityException.ErrorType.INVALID_PARAM_BIGINT:
        errMessage = `Error ${this.errorType} : Parametre '${this.#getEntityId()}'  isn't valid. Entity object is require.`;
        break;

    }

    return errMessage;
  }

  /**
   * Return a entity ID or list of entity ids
   * @returns Entity ID or ids
   */
  #getEntityId() {
    if (this.entityId != null) {
      return this.entityId;
    } else if (this.entityIds != null && this.entityIds.length > 0) {
      return `(${this.entityIds.join(', ')})`;
    } else {
      return 'N/A';
    }
  }

}

InvalidEntityException.ErrorType = {
  NONE: 0,
  /**
   * Primary key doesn't exist for this entity.
   */

  INVALID_PK: 100,

  /**
   * Used entity is null
   */
  NULL_ENTITY: 200,

  /**
   *
   */
  INVALID_PARAM_BIGINT: 201,
};

module.exports = InvalidEntityException;