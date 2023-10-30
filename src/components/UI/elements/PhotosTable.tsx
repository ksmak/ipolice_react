import { Button, IconButton } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { AiFillDelete } from 'react-icons/ai';
import { Photo } from "../../../types/types";

interface PhotosTableProps {
    photos: Photo[],
    handleAddPhoto: () => void,
    handleRemovePhoto: (index: number) => void,
    showError: boolean,
}

const PhotosTable = ({ photos, handleAddPhoto, handleRemovePhoto, showError }: PhotosTableProps) => {
    const { t } = useTranslation();


    return (
        <table className="border-2 border-collapse border-teal-900 w-full">
            <caption className="text-teal-600 text-left">
                {t('photos')}:
            </caption>
            <thead>
                <tr className="border-2 p-1">
                    <th className="border-2 p-1">
                        {t('value')}
                    </th>
                    <th className="border-2 p-1 text-center">
                        <Button
                            size="sm"
                            color="teal"
                            onClick={() => {
                                handleAddPhoto()
                            }}
                        >
                            {t('add')}
                        </Button>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-2 p-1"></tr>
                {showError
                    ? <tr className="text-red-700 border-2 p-1">
                        <td colSpan={3}>
                            {t('loadError')}
                        </td>
                    </tr>
                    : null}
                {photos.map((photo, index) => {
                    return (
                        <tr key={index} className="border-2 p-1">
                            <td className="border-2 p-1">
                                <img alt="" src={URL.createObjectURL(photo.file)} />
                            </td>
                            <td className="border-2 p-1 text-center">
                                <IconButton
                                    className="rounded-full"
                                    size="sm"
                                    color="teal"
                                    variant="outlined"
                                    onClick={() => handleRemovePhoto(index)}
                                >
                                    <AiFillDelete />
                                </IconButton>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default PhotosTable;