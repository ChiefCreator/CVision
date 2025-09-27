export interface UploadFileRequest {
	file: Express.Multer.File;
	key?: string;
}