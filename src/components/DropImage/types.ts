export interface ImageType {
    img: File;
    preview: string;
}

export interface ImageProps {
    image: ImageType[] | ImageType | string | string[] | null;
    isDragActive: boolean;
    rootProps: any;
    deleteImage: (() => void) | ((index: number) => void);
}
export interface ImageCardProps {
    index?: number;
    multiple?: boolean;
    image: ImageType | string;
    deleteImage: (() => void) | ((index: number) => void);
}
