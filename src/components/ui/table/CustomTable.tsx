
import { Column } from "@/interfaces";
// import { Button } from "@/components/ui/button";
// import { FaPlus } from "react-icons/fa";
import { ButtonCreateTable } from "./ButtonCreateTable";

interface Props<T> {
    data: T[];
    columns: Column<T>[];
    searchableFields?: (keyof T)[];
    btnCreate?: {
        text: string;
        textMobile?: string;
        form: React.ReactNode;
    };
    pagination: {
        totalPages: number;
    };
    isLoading?: boolean;
    searcher: React.ReactNode;
    controls?: (item: T) => React.ReactNode;
}

export default function CustomTable<T>({
    data,
    columns,
    btnCreate,
    searcher,
    controls
}: Props<T>) {
    const renderRow = (value: unknown): React.ReactNode => {
        if (value === null || value === undefined) return "";
        if (Array.isArray(value) && value.length > 0) return value.join(", ");
        if (typeof value === "string" || typeof value === "number") return value;
        return "";
    };

    return (
        <div className="container mx-auto p-4">
            {/* Encabezado y Botón de Crear */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Lista de Usuarios</h1>
                {btnCreate && (
                    <ButtonCreateTable text={btnCreate.text} form={btnCreate.form} />
                    // <Button className="flex items-center gap-2">
                    //     <FaPlus /> {btnCreate.text}
                    // </Button>
                )}
            </div>

            {/* Buscador */}
            <div className="mb-4">{searcher}</div>

            {/* Tabla */}
            <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                {/* Encabezado */}
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.accessor as string}
                                scope="col"
                                className="py-3 px-4 text-left text-md font-semibold text-gray-800"
                            >
                                {column.header}
                            </th>
                        ))}
                        {controls && (
                            <th className="py-3 px-4 text-left text-md font-semibold text-gray-800">
                                Acciones
                            </th>
                        )}
                    </tr>
                </thead>


                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length + (controls ? 1 : 0)}
                                className="py-3 px-4 text-center text-sm text-gray-800"
                            >
                                No hay datos disponibles
                            </td>
                        </tr>
                    ) : (
                        data.map((item, index) => (
                            <tr key={index} className="border-b border-gray-200">
                                {columns.map((column) => (
                                    <td
                                        key={column.accessor as string}
                                        className="py-3 px-4 text-sm text-gray-800"
                                    >
                                        {renderRow(item[column.accessor])}
                                    </td>
                                ))}
                                {controls && (
                                    <td className="py-3 px-4 text-sm text-gray-800">
                                        {controls(item)}
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
