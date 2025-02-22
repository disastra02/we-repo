import { IFolderService } from "../ports/IFolderService";
import { IFolderRepository } from "../ports/IFolderRepository";
import { Folder } from "../entities/Folder";
import { File } from "../entities/File";

export class FolderService implements IFolderService {
    constructor(private folderRepository: IFolderRepository) {}

    async getFolder(): Promise<Folder[]> {
        return await this.folderRepository.findFolder();
    }

    async getSubFolder(id: string): Promise<Folder[]> {
        return await this.folderRepository.findSubFolder(id);
    }

    async getFiles(id: string): Promise<File[]> {
        return await this.folderRepository.findFile(id);
    }
}