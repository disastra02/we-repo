export class File {
    constructor(
        public id: number,
        public name: string,
        public folderId: number,
        public size: number,
        public mimeType: string,
        public createdAt: Date,
        public updatedAt: Date,
        public fileUrl: string
    ) {}

    // Factory untuk mapping dari prisma ke Entity
    static fromPrisma(data: any): File {
        return new File(
            data.id,
            data.name,
            data.folder_id,
            data.size,
            data.mime_type,
            new Date(data.created_at),
            new Date(data.updated_at),
            data.file_url
        );
    }
}