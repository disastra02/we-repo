import { Folder } from "../entities/Folder";
import { File } from "../entities/File";

export interface IFolderService {
    getFolder(): Promise<Folder[]>;
    getSubFolder(id: string): Promise<Folder[]>;
    getFiles(id: string): Promise<File[]>;
}