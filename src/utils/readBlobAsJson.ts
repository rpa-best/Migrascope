export const readBlobAsJson = async (blob: Blob): Promise<any> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            try {
                const result = JSON.parse(reader.result as string);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsText(blob);
    });
};
