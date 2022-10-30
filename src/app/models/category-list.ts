export interface CategoryList {
    id?: number;
    titulo: string;
    subtitulo: string;
    descricao: string;
    imagem: string;
}

export interface Page {
    content: CategoryList[];
    totalPages: number;
}
