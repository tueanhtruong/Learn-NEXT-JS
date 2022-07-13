import { Callback } from '../type';

export enum FileUploadType {
  signature = 'signature',
  proof_of_identity = 'proof_of_identity',
  avatar = 'avatar',
}

export interface GetPresignedPayload {
  fileName: string;
  contentType: string;
  fileData?: File;
  type?: FileUploadType | null;
  callback?: Callback;
  fullPath?: string;
}
