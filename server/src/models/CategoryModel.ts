import {Model, ModelProprety} from "../classes"
import { UserCategoryModel } from "./UserCategoryModel";
import {Category} from "../types/schemas";
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
     * Creates category in database
     * @param userId Current User's id
     */
    public async createCategory ( userId : number ) : Promise<false|Category> {
        this.property_admin.value = userId;
        const categoryId = await this.save();
        if (categoryId !== false) {
            const userCategoryModel = new UserCategoryModel();
            userCategoryModel.property_userId.value = userId;
            userCategoryModel.property_categoryId.value = categoryId;
            console.log ( { userCategory : await userCategoryModel.save() });
            const category = await this.getById(categoryId);
            return {
                admin : category['admin'],
                created : category['created'],
                description : category['description'],
                id : categoryId,
                name : category['name'],
                private : category['private']
            }
        } else return false;
    }

    public async getNameById ( id : number ) {
        const category = await this.getById<Category>(id);
        if (!category) return false;
        return category.name;
    }

}

export {CategoryModel};