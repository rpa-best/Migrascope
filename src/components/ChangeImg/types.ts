import React from 'react';

export interface ChangeImgProps {
    setUserImg: (st: string) => void;
    callback: (file: File) => Promise<{ image: string }>;
    revalidateTag: string;
}
