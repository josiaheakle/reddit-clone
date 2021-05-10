import {Model, ModelProprety} from "../classes"

/**
 * Used for relating users and categories
 */
class UserCategoryModel extends Model {

    public _tableName = 'UserCategories';
    public property_userId : ModelProprety = {
        columnName : 'userId'
    };
    public property_categoryId : ModelProprety = {
        columnName : 'categoryId'
    };

}

export {UserCategoryModel};