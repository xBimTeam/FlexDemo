import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AssetModelEntityState, AssetModelSelectors, NotificationsStateSelectors, ModelProcessingStatus, UploadModelFile } from '@xbim/flex-webkit';
import { Observable } from 'rxjs';
import { Model } from '@xbim/flex-api';
import { tap } from 'rxjs/operators';

export interface FileItem {
  file: File,
  revision: string,
  state: 'Uploaded' | ''
}

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

  //fileToUpload: File = null;
  filesToUpload: FileItem[] = [];
  assetName = '';

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {

    for (let i = 0; i < files.length; i++) {
      this.filesToUpload.push(<FileItem>{ file: files.item(i), revision: '' });
    }

  }

  upload() {
    this.filesToUpload.forEach(f => {
      // Upload the file using the store, and clear the file when complete
      this.store.dispatch(new UploadModelFile(f.file, this.assetName, undefined, f.revision))
        .pipe(tap(_ => {
          f.state = 'Uploaded';
          this.filesToUpload = [];
        }
        ));
    });
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
