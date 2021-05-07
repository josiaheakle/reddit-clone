import {Model, ModelProprety} from "../classes"

/**
 * Used for 
 */
class CategoryModel extends Model {

    public _tableName = 'Categories';
    public property_name : ModelProprety = {
        columnName : 'name',
        rules : ['unique']
    };
    public property_description : ModelProprety = {
        columnName : 'description'
    };
    public property_private : ModelProprety = {
        columnName : 'private',
        value : false
    };
    public property_admin : ModelProprety = {
        columnName : 'admin'
    }

    /**
     * 
     * @param userId Current User's id
     */
    public createCategory ( userId : number ) {

        this.property_admin.value = userId;
        

    }


}