import { ModelMapping } from "@xbim/flex-api";
import { IEquatable } from "@xbim/flex-webkit";

export class ModelMappingComparer implements IEquatable<ModelMapping> {
    areEqual(left: ModelMapping, right: ModelMapping): boolean {
        return left.MappingId === right.MappingId;
    }
}