import prisma from "./client";
import { faker } from '@faker-js/faker';

async function createFolder(parentId: number | null = null) {
    const name = faker.location.city(); // Menggunakan nama kota untuk folder

    const existingFolder = await prisma.folder.findUnique({
        where: { name },
    });
    
    if (existingFolder) { // Jika nama folder sudah digunakan
        console.log(`Folder with name "${name}" already exists.`);
        return;
    }

    return prisma.folder.create({
        data: {
            name: name,
            parent_id: parentId
        }
    });
}

async function createFile(folderId: number) {
    const name = faker.system.commonFileName();

    const existingFile = await prisma.file.findUnique({
        where: { name },
    });
    
    if (existingFile) { // Jika nama file sudah digunakan
        console.log(`File with name "${name}" already exists.`);
        return;
    }

    return prisma.file.create({
        data: {
            name: name,
            folder_id: folderId,
            size: faker.number.int({min: 1024, max: 1048576}),
            mime_type: faker.system.commonFileExt(),
            file_url: faker.internet.url()
        }
    });
}

async function main() {
    for (let i = 0; i < 5; i++) {
        const folder = await createFolder();

        if (!folder) {
            i--; // Diulang jika nama sudah digunakan
            continue;
        }

        await createSubfoldersAndFiles(folder.id);
        await createFilesInFolder(folder.id, 3);
    }

    console.log('Database has been seeded!');
}

async function createSubfoldersAndFiles(parentFolderId: number) {
    for (let i = 0; i < 5; i++) {
        const subFolder = await createFolder(parentFolderId);
        if (!subFolder) {
            i--; // Diulang jika nama sudah digunakan
            continue;
        }
    
        await createFilesInFolder(subFolder.id, 3);
        await createFolderFiles(subFolder.id, 3);
    }
}

// Membuat file didalam folder
async function createFilesInFolder(folderId: number, fileCount: number) {
    for (let k = 0; k < fileCount; k++) {
        await createFile(folderId); 
    }
}

// Membuat folder, file didalam folder
async function createFolderFiles(folderId: number, fileCount: number) {
    for (let k = 0; k < fileCount; k++) {
        await createFolder(folderId); 
        await createFile(folderId);
    }
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async() => {
        await prisma.$disconnect();
    });