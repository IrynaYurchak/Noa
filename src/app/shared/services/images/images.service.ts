import { Injectable } from '@angular/core';
import { Storage, getDownloadURL, percentage, ref, uploadBytesResumable, deleteObject } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  public uploadPercent = 0;

  constructor(private storage: Storage) {
    if (!this.storage) {
      console.error('Storage is not initialized in ImageService!');
    }
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';

    if (file) {
      try {
        const storadgeRef = ref(this.storage, path);
        const task = uploadBytesResumable(storadgeRef, file);
        percentage(task).subscribe((data) => {
          this.uploadPercent = data.progress;
        });

        await task;
        url = await getDownloadURL(storadgeRef);
        return Promise.resolve(url);
      } catch (e: any) {
        console.error('Error during file upload:', e);
      }
    } else {
      console.warn('File is null or invalid format.');
    }

    return Promise.resolve(url);
  }

  deleteUploadFile(imagePath: string): Promise<void> {
    const task = ref(this.storage, imagePath);

    return deleteObject(task)
      .then(() => console.log('File deleted successfully.'))
      .catch((e) => console.error('Error deleting file:', e));
  }
}

