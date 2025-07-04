import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface RouteStop {
  id: number;
  name: string;
  address: string;
  arrivalTime: string;
  departureTime: string;
  order: number;
}

interface Route {
  id: number;
  name: string;
  fromCity: string;
  toCity: string;
  stops: RouteStop[];
  distance: number;
  estimatedDuration: string;
  isActive: boolean;
  description: string;
}

interface RouteFormProps {
  route: Route | null;
  onSave: (route: Omit<Route, "id">) => void;
  onCancel: () => void;
}

const RouteForm: React.FC<RouteFormProps> = ({ route, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: route?.name || "",
    fromCity: route?.fromCity || "",
    toCity: route?.toCity || "",
    stops: route?.stops || [],
    distance: route?.distance || 0,
    estimatedDuration: route?.estimatedDuration || "",
    isActive: route?.isActive ?? true,
    description: route?.description || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addStop = () => {
    const newStop: RouteStop = {
      id: Date.now(),
      name: "",
      address: "",
      arrivalTime: "",
      departureTime: "",
      order: formData.stops.length + 1,
    };
    setFormData((prev) => ({
      ...prev,
      stops: [...prev.stops, newStop],
    }));
  };

  const updateStop = (index: number, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      stops: prev.stops.map((stop, i) =>
        i === index ? { ...stop, [field]: value } : stop,
      ),
    }));
  };

  const removeStop = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      stops: prev.stops.filter((_, i) => i !== index),
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-h-[80vh] overflow-y-auto"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Название маршрута</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="distance">Расстояние (км)</Label>
          <Input
            id="distance"
            type="number"
            min="1"
            value={formData.distance}
            onChange={(e) => handleChange("distance", parseInt(e.target.value))}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fromCity">Город отправления</Label>
          <Input
            id="fromCity"
            value={formData.fromCity}
            onChange={(e) => handleChange("fromCity", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="toCity">Город прибытия</Label>
          <Input
            id="toCity"
            value={formData.toCity}
            onChange={(e) => handleChange("toCity", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="estimatedDuration">Время в пути</Label>
        <Input
          id="estimatedDuration"
          value={formData.estimatedDuration}
          onChange={(e) => handleChange("estimatedDuration", e.target.value)}
          placeholder="например: 8ч 30м"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Описание маршрута</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={3}
        />
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Остановки</Label>
          <Button type="button" variant="outline" size="sm" onClick={addStop}>
            <Icon name="Plus" className="h-4 w-4 mr-2" />
            Добавить остановку
          </Button>
        </div>

        {formData.stops.map((stop, index) => (
          <Card key={stop.id || index}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-sm">Остановка {index + 1}</CardTitle>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeStop(index)}
                >
                  <Icon name="Trash2" className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor={`stop-name-${index}`}>Название</Label>
                  <Input
                    id={`stop-name-${index}`}
                    value={stop.name}
                    onChange={(e) => updateStop(index, "name", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`stop-address-${index}`}>Адрес</Label>
                  <Input
                    id={`stop-address-${index}`}
                    value={stop.address}
                    onChange={(e) =>
                      updateStop(index, "address", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor={`stop-arrival-${index}`}>
                    Время прибытия
                  </Label>
                  <Input
                    id={`stop-arrival-${index}`}
                    type="time"
                    value={stop.arrivalTime}
                    onChange={(e) =>
                      updateStop(index, "arrivalTime", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor={`stop-departure-${index}`}>
                    Время отправления
                  </Label>
                  <Input
                    id={`stop-departure-${index}`}
                    type="time"
                    value={stop.departureTime}
                    onChange={(e) =>
                      updateStop(index, "departureTime", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => handleChange("isActive", checked)}
        />
        <Label htmlFor="isActive">Маршрут активен</Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">{route ? "Обновить" : "Создать"}</Button>
      </div>
    </form>
  );
};

export default RouteForm;
