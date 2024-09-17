import {Injectable} from '@angular/core';
import {
  downloadData,
  DownloadDataWithPathOutput,
  getUrl,
  GetUrlWithPathOutput,
  remove,
  RemoveWithPathOutput,
  uploadData,
  UploadDataWithPathOutput
} from "aws-amplify/storage"
import {catchError, from, Observable, of} from "rxjs";


export interface UploadData {
  blob: Blob,
  path: string
}

@Injectable({
  providedIn: 'root'
})
export class SimpleStorageService {

  constructor() {
  }

  public downloadFile(path: string): Observable<DownloadDataWithPathOutput> {
    return of(downloadData({
      path: path,
      options: {
        bucket: {
          bucketName: 'onepiece-files',
          region: 'sa-east-1'
        }
      }
    })).pipe(
      catchError((error) => {
        console.error('Erro no downloadFile:', error);
        throw error;
      })
    );
  }

  public uploadFile(data: UploadData): Observable<UploadDataWithPathOutput> {
    return of(uploadData({
      path: data.path,
      data: data.blob,
      options: {
        bucket: {
          bucketName: 'onepiece-files',
          region: 'sa-east-1'
        }
      }
    }))
      .pipe(
        catchError((error) => {
          console.error('Erro no uploadFile:', error);
          throw error;
        })
      );
  }

  public removeFile(path: string): Observable<RemoveWithPathOutput> {
    return from(remove({
      path: path,
      options: {
        bucket: {
          bucketName: 'onepiece-files',
          region: 'sa-east-1',
        }
      }
    })).pipe(
      catchError((error) => {
        console.error('Erro no removeFile:', error);
        throw error;
      })
    );
  }

  public getUrl(path: string): Observable<GetUrlWithPathOutput> {
    return from(getUrl({
      path: path,
      options: {

        bucket: {
          bucketName: 'onepiece-files',
          region: 'sa-east-1',
        }
      }
    })).pipe(
      catchError((error) => {
        console.error('Erro no getUrl:', error);
        throw error;
      })
    );
  }
}
