import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Schedule {
  id: number;
  routeId: number;
  busId: number;
  carrierId: number;
  departureTime: string;
  arrivalTime: string;
  price: number;
  daysOfWeek: string[];
  isActive: boolean;
  validFrom: string;
  validUntil: string;
}

interface Route {
  id: number;
  name: string;
  fromCity: string;
  toCity: string;
}

interface Bus {
  id: number;
  model: string;
  plateNumber: string;
  carrierId: number;
}

interface Carrier {
  id: number;
  name: string;
}

interface ScheduleFormProps {
  schedule: Schedule | null;
  routes: Route[];
  buses: Bus[];
  carriers: Carrier[];
  onSave: (schedule: Omit<Schedule, "id">) => void;
  onCancel: () => void;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({
  schedule,
  routes,
  buses,
  carriers,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    routeId: schedule?.routeId || 0,
    busId: schedule?.busId || 0,
    carrierId: schedule?.carrierId || 0,
    departureTime: schedule?.departureTime || "",
    arrivalTime: schedule?.arrivalTime || "",
    price: schedule?.price || 1000,
    daysOfWeek: schedule?.daysOfWeek || [],
    isActive: schedule?.isActive ?? true,
    validFrom: schedule?.validFrom || new Date().toISOString().split("T")[0],
    validUntil:
      schedule?.validUntil ||
      new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
  });

  const daysOfWeek = [
    { value: "monday", label: "Понедельник" },
    { value: "tuesday", label: "Вторник" },
    { value: "wednesday", label: "Среда" },
    { value: "thursday", label: "Четверг" },
    { value: "friday", label: "Пятница" },
    { value: "saturday", label: "Суббота" },
    { value: "sunday", label: "Воскресенье" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDayChange = (day: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      daysOfWeek: checked
        ? [...prev.daysOfWeek, day]
        : prev.daysOfWeek.filter((d) => d !== day),
    }));
  };

  const selectedRoute = routes.find((r) => r.id === formData.routeId);
  const availableBuses = buses.filter(
    (b) => b.carrierId === formData.carrierId,
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="routeId">Маршрут</Label>
        <Select
          value={formData.routeId.toString()}
          onValueChange={(value) => handleChange("routeId", parseInt(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите маршрут" />
          </SelectTrigger>
          <SelectContent>
            {routes.map((route) => (
              <SelectItem key={route.id} value={route.id.toString()}>
                {route.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="carrierId">Перевозчик</Label>
        <Select
          value={formData.carrierId.toString()}
          onValueChange={(value) => {
            const carrierId = parseInt(value);
            handleChange("carrierId", carrierId);
            // Reset bus selection when carrier changes
            handleChange("busId", 0);
          }}
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
        <Label htmlFor="busId">Автобус</Label>
        <Select
          value={formData.busId.toString()}
          onValueChange={(value) => handleChange("busId", parseInt(value))}
          disabled={!formData.carrierId}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите автобус" />
          </SelectTrigger>
          <SelectContent>
            {availableBuses.map((bus) => (
              <SelectItem key={bus.id} value={bus.id.toString()}>
                {bus.model} ({bus.plateNumber})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="departureTime">Время отправления</Label>
          <Input
            id="departureTime"
            type="time"
            value={formData.departureTime}
            onChange={(e) => handleChange("departureTime", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="arrivalTime">Время прибытия</Label>
          <Input
            id="arrivalTime"
            type="time"
            value={formData.arrivalTime}
            onChange={(e) => handleChange("arrivalTime", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Цена билета (руб.)</Label>
        <Input
          id="price"
          type="number"
          min="100"
          max="10000"
          value={formData.price}
          onChange={(e) => handleChange("price", parseInt(e.target.value))}
          required
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Дни недели</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {daysOfWeek.map((day) => (
              <div key={day.value} className="flex items-center space-x-2">
                <Checkbox
                  id={day.value}
                  checked={formData.daysOfWeek.includes(day.value)}
                  onCheckedChange={(checked) =>
                    handleDayChange(day.value, checked as boolean)
                  }
                />
                <Label htmlFor={day.value} className="text-sm">
                  {day.label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="validFrom">Действует с</Label>
          <Input
            id="validFrom"
            type="date"
            value={formData.validFrom}
            onChange={(e) => handleChange("validFrom", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="validUntil">Действует до</Label>
          <Input
            id="validUntil"
            type="date"
            value={formData.validUntil}
            onChange={(e) => handleChange("validUntil", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => handleChange("isActive", checked)}
        />
        <Label htmlFor="isActive">Рейс активен</Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">{schedule ? "Обновить" : "Создать"}</Button>
      </div>
    </form>
  );
};

export default ScheduleForm;
