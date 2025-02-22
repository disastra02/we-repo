import prisma from "../../../prisma/client";
import { IFolderService } from "../../ports/IFolderService";

export class FolderController {
    constructor(private folderService: IFolderService) {}

    // Mengambil data folder
    async getFolder() {
        try {
            const folders = await this.folderService.getFolder();

            return {
                success: true,
                message: 'List parent folders',
                data: folders
            };
        } catch (e: unknown) {
            console.error(`Error getting folders: ${e}`);
        }
    }

    // Mengambil data sub folder & files
    async getSubFolder(id: string) {
        try {
            const folders = await this.folderService.getSubFolder(id);
            const files = await this.folderService.getFiles(id);
            
            return {
                success: true,
                message: 'List folders',
                data: {
                    folders: folders,
                    files: files
                }
            };
        } catch (e: unknown) {
            console.error(`Error getting folders: ${e}`);
        }
    }
}