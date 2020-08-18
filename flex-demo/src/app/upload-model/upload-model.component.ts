import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AssetModelEntityState, AssetModelSelectors, NotificationsStateSelectors, ModelProcessingStatus, UploadModelFile } from '@xbim/flex-webkit';
import { Observable } from 'rxjs';
import { Model } from '@xbim/flex-api';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-upload-model',
  templateUrl: './upload-model.component.html',
  styleUrls: ['./upload-model.component.scss']
})
export class UploadModelComponent implements OnInit {

  @Select(AssetModelEntityState.latest) latestModel$: Observable<Model>;
  @Select(AssetModelSelectors.uploading) uploading$: Observable<boolean>;
  @Select(AssetModelSelectors.uploadPercentComplete) percentUploaded$: Observable<number>;
  @Select(NotificationsStateSelectors.processingModels) processing$: Observable<ModelProcessingStatus[]>;

  fileToUpload: File = null;
  assetName = '';

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    // TODO: Multi-select
    this.fileToUpload = files.item(0);
  }

  upload() {
    // Upload the file using the store, and clear the file when complete
    this.store.dispatch(new UploadModelFile(this.fileToUpload, this.assetName))
      .pipe(tap(_ => this.fileToUpload = undefined));
  }

  icon(state: ModelProcessingStatus): string {
    if (state.isComplete) {
      return 'check';
    }
    if (state.isFaulted) {
      return 'error';
    }
    if (state.isProcessing) {
      return 'hourglass_full';
    }
    return 'help_outline';
  }
}
