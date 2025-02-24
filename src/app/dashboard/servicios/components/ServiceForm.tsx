"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SimplifiedService } from "../../../../interfaces/services.interfaces";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const serviceSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().optional(),
  duration: z
    .number({ invalid_type_error: "Debe ser un número" })
    .min(15, "La duración mínima es 15 min")
    .max(120, "La duración máxima es 120 min"),
  price: z
    .number({ invalid_type_error: "Debe ser un número" })
    .min(10000, "El precio mínimo es 10,000"),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ServiceFormValues) => void;
  initialData?: Partial<SimplifiedService>;
  title: string;
  submitText: string;
}

export default function ServiceForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
  submitText,
}: ServiceFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: "",
      description: "",
      duration: undefined,
      price: undefined,
    },
  });

  const [formattedPrice, setFormattedPrice] = useState("");
  const [formattedDuration, setFormattedDuration] = useState("");

  // Función para formatear el precio a pesos colombianos
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };


  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    }
    return `${minutes} min`;
  };

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key as keyof ServiceFormValues, value as ServiceFormValues[keyof ServiceFormValues]);
      });

      if (initialData.price) {
        setFormattedPrice(formatCurrency(initialData.price));
      }
      if (initialData.duration) {
        setFormattedDuration(formatDuration(initialData.duration));
      }
    }
  }, [initialData, setValue]);

  const onSubmitHandler = (data: ServiceFormValues) => {
    onSubmit(data);
    reset();
    setFormattedPrice("");
    setFormattedDuration("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
          <div>
            <Input {...register("name")} placeholder="Nombre del servicio" />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <Input {...register("description")} placeholder="Descripción" />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>
          <div>
            <Input
              {...register("duration", { valueAsNumber: true })}
              type="number"
              placeholder="Duración (min)"
              onChange={(e) => setFormattedDuration(formatDuration(Number(e.target.value)))}
            />
            <p className="text-gray-600">{formattedDuration}</p>
            {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}
          </div>
          <div>
            <Input
              {...register("price", { valueAsNumber: true })}
              type="number"
              placeholder="Precio"
              onChange={(e) => setFormattedPrice(formatCurrency(Number(e.target.value)))}
            />
            <p className="text-gray-600">{formattedPrice}</p>
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          </div>
          <DialogFooter className="mt-4">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">{submitText}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
