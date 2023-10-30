import { useState } from "react";
import { Detail, Field } from "../../../types/types";
import { useTranslation } from "react-i18next";
import { Button, IconButton } from "@material-tailwind/react";
import { AiFillDelete } from 'react-icons/ai';

interface DetailsProps {
    details: Detail[],
    fields: Field[],
    handleAddDetail: (fieldName: string | undefined, value: string | undefined) => void,
    handleRemoveDetail: (index: number) => void,
    showError: boolean,
}

const DetailsTable = ({ details, fields, handleAddDetail, handleRemoveDetail, showError }: DetailsProps) => {
    const { t, i18n } = useTranslation();
    const [fieldName, setFieldName] = useState<string>();
    const [value, setValue] = useState<string>()

    return (
        <table className="border-2 border-collapse border-teal-900 w-full">
            <caption className="text-teal-600 text-left">
                {t('details')}
            </caption>
            <thead>
                <tr className="border-2 p-1">
                    <th className="border-2 p-1">
                        {t('name')}
                    </th>
                    <th className="border-2 p-1">
                        {t('value')}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-2 p-1">
                    <td>
                        <select
                            className="bg-white p-1 border-2 border-blue-gray-200 rounded-md"
                            value={fieldName}
                            onChange={e => {
                                setFieldName(e.target.value);
                            }}
                        >
                            <option value=''>-</option>
                            {fields.map((field, index) => {
                                return (
                                    <option key={index} value={field.field_name} className="flex items-center gap-1">
                                        {field[`title_${i18n.language}` as keyof typeof field]}
                                    </option>
                                )
                            })}
                        </select>
                    </td>
                    <td className="border-2 p-1">
                        <input
                            className="border-2 border-blue-gray-200 p-1 w-full rounded-md"
                            type="text"
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value)
                            }}
                        />
                    </td>
                    <td className="text-center">
                        <Button onClick={() => handleAddDetail(fieldName, value)} size="sm" color="teal">{t('add')}</Button>
                    </td>
                </tr>
                {showError
                    ? <tr key={1} className="text-red-700 border-2 p-1">
                        <td colSpan={3}>
                            {t('notNullError')}
                        </td>
                    </tr>
                    : null}
                {
                    details.map((detail, index) => {
                        const field = fields.find((field) => field.field_name === detail.field_name);
                        return (
                            <tr key={index} className="border-2 p-1">
                                <td className="border-2 p-1">
                                    {field ? field[`title_${i18n.language}` as keyof typeof field] : ''}
                                </td>
                                <td className="border-2 p-1">{detail.value}</td>
                                <td className="border-2 p-1 text-center">
                                    <IconButton
                                        className="rounded-full"
                                        variant="outlined"
                                        size="sm"
                                        color="teal"
                                        onClick={() => handleRemoveDetail(index)}
                                    >
                                        <AiFillDelete />
                                    </IconButton>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default DetailsTable;