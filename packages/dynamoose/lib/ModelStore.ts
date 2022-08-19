import CustomError from "./Error";
import {Model} from "./Model";
import {Item} from "./Item";
import Internal from "./Internal";
import {MethodsType} from "./General";
const {internalProperties} = Internal.General;


let models: {[name: string]: Model<Item>} = {};

const returnObject = <TItem extends Item, TMethods extends MethodsType>(input: Model<TItem, TMethods> | string): Model<TItem, TMethods> | never => {
	if (input instanceof Model) {
		models[input.name] = input;
		return input;
	} else if (typeof input === "string") {
		return models[input] as Model<TItem, TMethods>;
	} else {
		throw new CustomError.InvalidParameter("You must pass in a Model or model name as a string.");
	}
};
returnObject.clear = (): void => {
	models = {};
};
/**
 * This method will return all of the models that are linked to the given tableName passed in. It will return `undefined` if the tableName is not linked to any models.
 * @param tableName The name of the table to get the models for.
 * @returns Array of Models.
 */

// TODO: find a away to infer item and method types for model
returnObject.forTableName = (tableName: string): Model<Item>[] | undefined => {
	const modelsInTable = Object.values(models).filter((model) => model.getInternalProperties(internalProperties).table().name === tableName);

	return modelsInTable.length === 0 ? undefined : modelsInTable;
};

export default returnObject;
