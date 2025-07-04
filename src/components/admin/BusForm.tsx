import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface Bus {
  id: number;
  model: string;
  plateNumber: string;
  capacity: number;
  amenities: string[];
  carrierId: number;
  isActive: boolean;
  year: number;
  busType: string;
  description: string;
}

interface Carrier {
  id: number;
  name: string;
}

interface BusFormProps {
  bus: Bus | null;
  carriers: Carrier[];
  onSave: (bus: Omit<Bus, "id">) => void;
  onCancel: () => void;
}

const BusForm: React.FC<BusFormProps> = ({
  bus,
  carriers,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    model: bus?.model || "",
    plateNumber: bus?.plateNumber || "",
    capacity: bus?.capacity || 50,
    amenities: bus?.amenities || [],
    carrierId: bus?.carrierId || 0,
    isActive: bus?.isActive ?? true,
    year: bus?.year || new Date().getFullYear(),
    busType: bus?.busType || "Туристический",
    description: bus?.description || "",
  });

  const availableAmenities = [
    "Wi-Fi",
    "Розетки",
    "Кондиционер",
    "Туалет",
    "Видео",
    "Холодильник",
    "Кухня",
    "Спальные места",
    "Багажное отделение",
    "USB-порты",
  ];

  const busTypes = [
    "Туристический",
    "Междугородный",
    "Региональный",
    "Городской",
    "Люкс",
    "Эконом",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter((a) => a !== amenity),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="model">Модель автобуса</Label>
          <Input
            id="model"
            value={formData.model}
            onChange={(e) => handleChange("model", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="plateNumber">Гос. номер</Label>
          <Input
            id="plateNumber"
            value={formData.plateNumber}
            onChange={(e) => handleChange("plateNumber", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="carrierId">Перевозчик</Label>
          <Select
            value={formData.carrierId.toString()}
            onValueChange={(value) =>
              handleChange("carrierId", parseInt(value))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите перевозчика" />
            </SelectTrigger>
            <SelectContent>
              {carriers.map((carrier) => (
                <SelectItem key={carrier.id} value={carrier.id.toString()}>
                  {carrier.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="busType">Тип автобуса</Label>
          <Select
            value={formData.busType}
            onValueChange={(value) => handleChange("busType", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {busTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="capacity">Вместимость</Label>
          <Input
            id="capacity"
            type="number"
            min="1"
            max="80"
            value={formData.capacity}
            onChange={(e) => handleChange("capacity", parseInt(e.target.value))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Год выпуска</Label>
          <Input
            id="year"
            type="number"
            min="1990"
            max={new Date().getFullYear()}
            value={formData.year}
            onChange={(e) => handleChange("year", parseInt(e.target.value))}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Удобства</Label>
        <div className="grid grid-cols-3 gap-2">
          {availableAmenities.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                checked={formData.amenities.includes(amenity)}
                onCheckedChange={(checked) =>
                  handleAmenityChange(amenity, checked as boolean)
                }
              />
              <Label htmlFor={amenity} className="text-sm">
                {amenity}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Описание</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={3}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => handleChange("isActive", checked)}
        />
        <Label htmlFor="isActive">Активен</Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">{bus ? "Обновить" : "Создать"}</Button>
      </div>
    </form>
  );
};

export default BusForm;
