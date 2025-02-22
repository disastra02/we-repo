export class Folder {
    constructor(
        public id: number,
        public name: string,
        public parentId: number | null,
        public children: Folder[] = []
    ) {}

    // Menambahkan child kedalam folder
    addChild(child: Folder) {
        this.children.push(child);
        this.children.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Factory untuk mapping dari prisma ke Entity
    static fromPrisma(data: any): Folder {
        return new Folder(
            data.id,
            data.name,
            data.parent_id,
            data.children ? data.children.map(Folder.fromPrisma) : []
        )
    }
}