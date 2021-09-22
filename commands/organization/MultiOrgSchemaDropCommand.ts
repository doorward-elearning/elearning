import MultiOrgDbOperationCommand from './MultiOrgDbOperationCommand';
import { SchemaDropCommand } from '../SchemaDropCommand';

export default class MultiOrgSchemaDropCommand extends MultiOrgDbOperationCommand(SchemaDropCommand) {}
