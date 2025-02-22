import Elysia from "elysia";
import { FolderController } from "../adapters/controllers/FolderControllers"; 
import { FolderRepository } from "../repository/FolderRepository";
import { FolderService } from "../services/FolderService";

const folderRepository = new FolderRepository();
const folderService = new FolderService(folderRepository);
const folderController = new FolderController(folderService);

export const Routes = (app: Elysia) =>
    app.group("/folder", (folder) => {
        // Menambil data folder
        folder.get("/", (() => folderController.getFolder()));
        
        // Mengambil detail folder
        folder.get("/:id", ((req) => {
            const { id } = req.params;
            return folderController.getSubFolder(id);
        }));
    
        return folder;
    });