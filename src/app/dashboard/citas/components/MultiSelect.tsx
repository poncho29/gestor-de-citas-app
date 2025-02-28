'use client';
import { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { getServiceById } from '@/actions/services';
import { SimplifiedService } from '@/interfaces';

interface MultiSelectProps {
    id: string;
    options: { value: string; label: string }[];
    onChange: (selected: string[]) => void;
    placeholder: string;
}

export const MultiSelect = ({ options, onChange, placeholder }: MultiSelectProps) => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [serviceDetails, setServiceDetails] = useState<{ [key: string]: SimplifiedService }>({});

    const handleSelect = async (value: string) => {
        const newSelected = selectedValues.includes(value)
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value];

        setSelectedValues(newSelected);
        onChange(newSelected);


        if (!newSelected.includes(value)) {
            const updatedDetails = { ...serviceDetails };
            delete updatedDetails[value];
            setServiceDetails(updatedDetails);
        } else {
            try {
                const service = await getServiceById(value);
                setServiceDetails((prev) => ({ ...prev, [value]: service }));
            } catch (error) {
                console.error("Error al obtener detalles del servicio:", error);
            }
        }
    };

    return (
        <div>
            <Select onValueChange={handleSelect}>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="mt-2">
                {selectedValues.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {selectedValues.map((value) => {
                            const details = serviceDetails[value];
                            return (
                                <span
                                    key={value}
                                    className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-sm"
                                >
                                    {details?.name || "Cargando..."} - {details?.price ? `$${details.price}` : ""}
                                </span>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-gray-500 text-sm">No hay servicios seleccionados</p>
                )}
            </div>
        </div>
    );
};