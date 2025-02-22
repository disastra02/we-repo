import prisma from "../../prisma/client";
import { Folder } from "../entities/Folder";
import { File } from "../entities/File";
import { IFolderRepository } from "../ports/IFolderRepository";

export class FolderRepository implements IFolderRepository {
    // Fetch data folder
    private async fetchDataFolder(where: object): Promise<Folder[]> {
        try {
            const folders = await prisma.folder.findMany({
                where: where, 
                orderBy: {name: 'asc'},
                include: {children: true}
            });

            return folders.map(Folder.fromPrisma);
        } catch (error) {
            throw new Error(`Error fetching folder: " ${error}`);
        }
    }

    // Ambil folder
    async findFolder(): Promise<Folder[]> { 
        return this.fetchDataFolder({parent_id: null});
    }

    // Ambil sub folder
    async findSubFolder(id: string): Promise<Folder[]> {
        const parentId = parseInt(id);
        return this.fetchDataFolder({parent_id: parentId});
    }

    // Ambil file
    async findFile(id: string): Promise<File[]> {
        try {
            const parentId = parseInt(id);
            const files = await prisma.file.findMany({
                where: {folder_id: parentId}, 
                orderBy: {name: 'asc'}
            });

            return files.map(File.fromPrisma);
        } catch (error) {
            throw new Error(`Error fetching file: ${error}`);
        }
    }
}