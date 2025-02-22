import { Folder } from "../entities/Folder";
import { File } from "../entities/File";

export interface IFolderRepository {
    findFolder(): Promise<Folder[]>;
    findSubFolder(id: string): Promise<Folder[]>;
    findFile(id: string): Promise<File[]>;
}