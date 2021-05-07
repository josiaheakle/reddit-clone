import {Model} from "../classes"

/**
 * Used for relating users and categories
 */
class UserCategoryModel extends Model {

    public _tableName = 'UserCategories';
    public property_userId : number;
    public proprety_categoryId : number;

    

}