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
        <div>
            <div className="flex flex-row flex-wrap justify-between items-center mb-1">
                <div className="text-blue-400 text-left">
                    {t('photos')}:
                </div>
                <div className="text-end">
                    <Button
                        size="sm"
                        color="blue"
                        onClick={() => {
                            handleAddPhoto()
                        }}
                    >
                        {t('add')}
                    </Button>
                </div>
            </div>
            <table className="border-2 border-collapse border-blue-400 w-full">
                <thead>
                    <tr className="border-2 p-1">
                        <th className="border-2 p-1">
                            {t('value')}
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
                                        color="blue"
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
        </div>
    )
}

export default PhotosTable;