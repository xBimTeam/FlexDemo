import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { FileResponse, FloorplansClient, Level, Region, Space, SvgGenerationConfig, SvgStylingLayer } from '@xbim/flex-api';
import { Tenant } from '@xbim/flex-identity-api';
import { TenantEntityState } from '@xbim/flex-webkit';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LevelIndexState } from '../level-index/level-state';
import { SpaceIndexState } from '../space-index/spaces-state';

@Component({
  selector: 'app-floorplan',
  templateUrl: './floorplan.component.html',
  styleUrls: ['./floorplan.component.scss']
})
export class FloorplanComponent implements OnInit, OnDestroy {

  @ViewChild('imageElement', { static: false }) imageElement: ElementRef;
  @Select(LevelIndexState.activeId) activeLevel$: Observable<string>;
  @Select(SpaceIndexState.activeId) activeSpace$: Observable<string>;
  @Input() typeOfFloorplan = "level" as "level" | "space";

  private destroy$ = new Subject<void>();
  public loadedImage = false;
  private floorplanStyling = new SvgGenerationConfig(
    {
      "EnvelopeStyle": new SvgStylingLayer({
        "FillingColour": "#0E1C43",
        "StrokeColour": "#000000",
        "StrokeWidth": 2,
      }),
      "SpacesStyle": new SvgStylingLayer({
        "FillingColour": "#c0f0f0f0",
        "StrokeColour": "#f00000",
        "StrokeWidth": 4,
      }),
      "WindowsAndDoorsStyle": new SvgStylingLayer({
        "FillingColour": "#8257fa",
        "StrokeColour": "#8257fa",
        "StrokeWidth": 10,
      }),
      "ComponentsStyle": new SvgStylingLayer({
        "FillingColour": "#00ff00",
        "StrokeColour": "#000000",
        "StrokeWidth": 1,
      }),
      "TextStyle": new SvgStylingLayer({
        "FillingColour": "#202020",
        "FontSize": 270,
        "FontFamily": "Arial"
      }),
      "DisplaySpaceNames": true,
      "DisplaySpaceSize": true
    }
  );
  
  constructor(private floorplanClient: FloorplansClient, private store: Store) { }

  ngOnInit(): void {
    if (this.typeOfFloorplan === "level") this.subscribeToLevels();
    if (this.typeOfFloorplan === "space") this.subscribeToSpaces();
  }

  subscribeToLevels(){
    this.activeLevel$.pipe(takeUntil(this.destroy$)).subscribe(levelId => {
      if(levelId){
        const level = this.store.selectSnapshot<Level[]>(LevelIndexState.entities)
          .find(l => l.EntityId === parseInt(levelId));
        const activeTenant = this.store.selectSnapshot<Tenant>(TenantEntityState.active);
        
        this.floorplanClient.postLevel(activeTenant.tenantId, level.AssetModelId, level.EntityId, <Region>activeTenant.regionCode, this.floorplanStyling)
          .toPromise().then(svg => this.displayImage(svg));
      }
    });
  }

  subscribeToSpaces(){
    this.activeSpace$.pipe(takeUntil(this.destroy$)).subscribe(spaceId => {
      if(spaceId){
        const space = this.store.selectSnapshot<Space[]>(SpaceIndexState.entities)
          .find(l => l.EntityId === parseInt(spaceId));
        const activeTenant = this.store.selectSnapshot<Tenant>(TenantEntityState.active);
        
        this.floorplanClient.postSpace(activeTenant.tenantId, space.AssetModelId, space.EntityId, <Region>activeTenant.regionCode, this.floorplanStyling)
          .toPromise().then(svg => this.displayImage(svg));
      }
    });
  }

  displayImage(file: FileResponse){
    var fr = new FileReader();
    fr.onload = () => this.imageElement.nativeElement.src = fr.result;
    fr.readAsDataURL(file.data);

    this.loadedImage = true;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
