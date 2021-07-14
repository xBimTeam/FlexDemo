import { inject, InjectionToken } from "@angular/core";
import { AttributesClient, ModelMapping, ModelMappingClient } from "@xbim/flex-api";
import { AimODataService, ContextService } from "@xbim/flex-webkit";


export type ModelMappingRepository = AimODataService<ModelMapping, ModelMappingClient>;

export const ModelMappingService = new InjectionToken<ModelMappingRepository>('ModelMappings', {
    factory: () => new AimODataService<ModelMapping, ModelMappingClient>(inject(ModelMappingClient), inject(AttributesClient), inject(ContextService))
});