import { useMemo } from 'react';

export const useGenerateImageUrl = ({ imaePath, imageName }, depArr) => {
    const imageUrl = `${imaePath}/${imageName}`;

    return imageUrl;
}