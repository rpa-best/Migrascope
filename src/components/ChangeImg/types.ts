export interface ChangeImgProps {
    setUserImg?: (st: string) => void;
    callback: (file: File) => Promise<{ avatar: string } | void>;
    revalidateTag: string;
}
