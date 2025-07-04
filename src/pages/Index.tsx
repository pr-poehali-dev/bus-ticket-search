import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const popularRoutes = [
    {
      from: "Москва",
      to: "Санкт-Петербург",
      price: 1200,
      duration: "8ч 30м",
      company: "Комфорт Трансфер",
    },
    {
      from: "Москва",
      to: "Казань",
      price: 1800,
      duration: "12ч 15м",
      company: "Экспресс Тур",
    },
    {
      from: "Санкт-Петербург",
      to: "Новгород",
      price: 800,
      duration: "3ч 45м",
      company: "Северный Экспресс",
    },
    {
      from: "Москва",
      to: "Нижний Новгород",
      price: 1100,
      duration: "6ч 20м",
      company: "Волга Транс",
    },
  ];

  const mockResults = [
    {
      id: 1,
      from: "Москва",
      to: "Санкт-Петербург",
      departure: "07:30",
      arrival: "16:00",
      duration: "8ч 30м",
      price: 1200,
      company: "Комфорт Трансфер",
      busType: "Мерседес Турисмо",
      amenities: ["Wi-Fi", "Розетки", "Кондиционер", "Туалет"],
      availableSeats: 12,
    },
    {
      id: 2,
      from: "Москва",
      to: "Санкт-Петербург",
      departure: "14:15",
      arrival: "22:45",
      duration: "8ч 30м",
      price: 1100,
      company: "Экспресс Тур",
      busType: "Сетра Топ Класс",
      amenities: ["Wi-Fi", "Розетки", "Кондиционер"],
      availableSeats: 8,
    },
    {
      id: 3,
      from: "Москва",
      to: "Санкт-Петербург",
      departure: "22:00",
      arrival: "06:30",
      duration: "8ч 30м",
      price: 950,
      company: "Ночной Экспресс",
      busType: "Вольво Люкс",
      amenities: ["Wi-Fi", "Розетки", "Кондиционер", "Туалет", "Видео"],
      availableSeats: 15,
    },
  ];

  const reviews = [
    {
      name: "Анна К.",
      rating: 5,
      text: "Отличный сервис! Автобус комфортный, водитель вежливый. Рекомендую!",
      route: "Москва - СПб",
    },
    {
      name: "Дмитрий С.",
      rating: 4,
      text: "Всё прошло хорошо, приехали вовремя. Единственный минус - Wi-Fi работал не очень.",
      route: "Москва - Казань",
    },
    {
      name: "Елена П.",
      rating: 5,
      text: "Супер! Удобные кресла, чистый салон. Обязательно воспользуюсь снова.",
      route: "СПб - Новгород",
    },
  ];

  const handleSearch = () => {
    setSearchResults(mockResults);
    setShowResults(true);
  };

  const handleSeatSelect = (seatNumber: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber],
    );
  };

  const renderBusSeats = () => {
    const seats = [];
    const occupiedSeats = [3, 7, 12, 18, 21, 25];

    for (let i = 1; i <= 40; i++) {
      const isOccupied = occupiedSeats.includes(i);
      const isSelected = selectedSeats.includes(i);

      seats.push(
        <div
          key={i}
          className={`w-8 h-8 rounded border-2 cursor-pointer text-xs flex items-center justify-center font-medium transition-all ${
            isOccupied
              ? "bg-red-200 border-red-300 cursor-not-allowed"
              : isSelected
                ? "bg-blue-500 border-blue-600 text-white"
                : "bg-gray-100 border-gray-300 hover:bg-blue-100 hover:border-blue-400"
          }`}
          onClick={() => !isOccupied && handleSeatSelect(i)}
        >
          {i}
        </div>,
      );
    }

    return seats;
  };

  const AdminPanel = () => {
    const [routes, setRoutes] = useState([
      {
        id: 1,
        from: "Москва",
        to: "Санкт-Петербург",
        price: 1200,
        status: "active",
      },
      { id: 2, from: "Москва", to: "Казань", price: 1800, status: "active" },
      {
        id: 3,
        from: "Санкт-Петербург",
        to: "Новгород",
        price: 800,
        status: "inactive",
      },
    ]);

    const [bookings, setBookings] = useState([
      {
        id: 1,
        passenger: "Иванов И.И.",
        route: "Москва - СПб",
        date: "2024-01-15",
        seats: [12, 13],
        status: "confirmed",
      },
      {
        id: 2,
        passenger: "Петрова А.С.",
        route: "Москва - Казань",
        date: "2024-01-16",
        seats: [8],
        status: "pending",
      },
      {
        id: 3,
        passenger: "Сидоров П.П.",
        route: "СПб - Новгород",
        date: "2024-01-17",
        seats: [15, 16],
        status: "confirmed",
      },
    ]);

    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Админпанель</h1>
          <Button onClick={() => setShowAdmin(false)} variant="outline">
            <Icon name="X" className="mr-2" />
            Закрыть
          </Button>
        </div>

        <Tabs defaultValue="routes" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="routes">Маршруты</TabsTrigger>
            <TabsTrigger value="bookings">Бронирования</TabsTrigger>
            <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="routes" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Управление маршрутами</h2>
              <Button>
                <Icon name="Plus" className="mr-2" />
                Добавить маршрут
              </Button>
            </div>

            <div className="grid gap-4">
              {routes.map((route) => (
                <Card key={route.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">
                          {route.from} → {route.to}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Цена: {route.price} ₽
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            route.status === "active" ? "default" : "secondary"
                          }
                        >
                          {route.status === "active" ? "Активен" : "Неактивен"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Icon name="Edit" className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Icon name="Trash2" className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <h2 className="text-xl font-semibold">Управление бронированиями</h2>

            <div className="grid gap-4">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{booking.passenger}</h3>
                        <p className="text-sm text-gray-600">{booking.route}</p>
                        <p className="text-sm text-gray-600">
                          Дата: {booking.date}
                        </p>
                        <p className="text-sm text-gray-600">
                          Места: {booking.seats.join(", ")}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            booking.status === "confirmed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {booking.status === "confirmed"
                            ? "Подтверждено"
                            : "Ожидает"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Icon name="Edit" className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <h2 className="text-xl font-semibold">Аналитика</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Продажи за месяц</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₽158,400</div>
                  <div className="text-sm text-green-600">
                    +12% к прошлому месяцу
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Билетов продано</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">342</div>
                  <div className="text-sm text-green-600">
                    +8% к прошлому месяцу
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Заполняемость</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">73%</div>
                  <Progress value={73} className="mt-2" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <h2 className="text-xl font-semibold">Настройки системы</h2>

            <Card>
              <CardHeader>
                <CardTitle>Общие настройки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notifications">Уведомления по email</Label>
                    <p className="text-sm text-gray-600">
                      Получать уведомления о новых бронированиях
                    </p>
                  </div>
                  <Switch id="notifications" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-confirm">Автоподтверждение</Label>
                    <p className="text-sm text-gray-600">
                      Автоматически подтверждать бронирования
                    </p>
                  </div>
                  <Switch id="auto-confirm" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance">Режим обслуживания</Label>
                    <p className="text-sm text-gray-600">
                      Временно отключить бронирования
                    </p>
                  </div>
                  <Switch id="maintenance" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  if (showAdmin) {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Icon name="Bus" className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">БусТикет</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Главная
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Маршруты
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                О нас
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Контакты
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Icon name="User" className="h-4 w-4 mr-2" />
                Войти
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdmin(true)}
                className="text-xs"
              >
                <Icon name="Settings" className="h-4 w-4 mr-2" />
                Админ
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">
              Удобный поиск автобусных билетов
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Найдите и забронируйте билеты на автобус по лучшим ценам
            </p>

            {/* Search Form */}
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                  <div className="space-y-2">
                    <Label
                      htmlFor="from"
                      className="text-sm font-medium text-gray-700"
                    >
                      Откуда
                    </Label>
                    <Select>
                      <SelectTrigger id="from">
                        <SelectValue placeholder="Выберите город" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="moscow">Москва</SelectItem>
                        <SelectItem value="spb">Санкт-Петербург</SelectItem>
                        <SelectItem value="kazan">Казань</SelectItem>
                        <SelectItem value="nn">Нижний Новгород</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="to"
                      className="text-sm font-medium text-gray-700"
                    >
                      Куда
                    </Label>
                    <Select>
                      <SelectTrigger id="to">
                        <SelectValue placeholder="Выберите город" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spb">Санкт-Петербург</SelectItem>
                        <SelectItem value="moscow">Москва</SelectItem>
                        <SelectItem value="kazan">Казань</SelectItem>
                        <SelectItem value="novgorod">Новгород</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Дата отправления
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Icon name="Calendar" className="mr-2 h-4 w-4" />
                          {date
                            ? format(date, "dd MMMM yyyy", { locale: ru })
                            : "Выберите дату"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(newDate) => newDate && setDate(newDate)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="passengers"
                      className="text-sm font-medium text-gray-700"
                    >
                      Пассажиры
                    </Label>
                    <Select defaultValue="1">
                      <SelectTrigger id="passengers">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 пассажир</SelectItem>
                        <SelectItem value="2">2 пассажира</SelectItem>
                        <SelectItem value="3">3 пассажира</SelectItem>
                        <SelectItem value="4">4 пассажира</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={handleSearch}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Icon name="Search" className="mr-2 h-4 w-4" />
                    Найти билеты
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {showResults && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Найденные рейсы</h2>
              <div className="flex items-center gap-4">
                <Select defaultValue="price">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Сортировать по цене</SelectItem>
                    <SelectItem value="time">Сортировать по времени</SelectItem>
                    <SelectItem value="duration">
                      Сортировать по длительности
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-6">
              {searchResults.map((result) => (
                <Card
                  key={result.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-6 mb-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold">
                              {result.departure}
                            </div>
                            <div className="text-sm text-gray-600">
                              {result.from}
                            </div>
                          </div>

                          <div className="flex-1 text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                              <div className="flex-1 h-px bg-gray-300 relative">
                                <Icon
                                  name="Bus"
                                  className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-blue-600"
                                />
                              </div>
                              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                            </div>
                            <div className="text-sm text-gray-600">
                              {result.duration}
                            </div>
                          </div>

                          <div className="text-center">
                            <div className="text-2xl font-bold">
                              {result.arrival}
                            </div>
                            <div className="text-sm text-gray-600">
                              {result.to}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                          <div className="text-sm text-gray-600">
                            <strong>{result.company}</strong> • {result.busType}
                          </div>
                          <div className="flex gap-2">
                            {result.amenities.map((amenity) => (
                              <Badge
                                key={amenity}
                                variant="secondary"
                                className="text-xs"
                              >
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="text-sm text-gray-600">
                          Свободных мест: {result.availableSeats}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {result.price} ₽
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              onClick={() => setSelectedRoute(result)}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Выбрать места
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Выбор мест в автобусе</DialogTitle>
                            </DialogHeader>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              <div>
                                <h3 className="font-semibold mb-4">
                                  Схема автобуса
                                </h3>
                                <div className="bg-gray-100 p-4 rounded-lg">
                                  <div className="text-center mb-4">
                                    <div className="inline-block bg-gray-300 px-4 py-2 rounded text-sm font-medium">
                                      Водитель
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
                                    {renderBusSeats()}
                                  </div>

                                  <div className="flex justify-center gap-4 mt-6 text-sm">
                                    <div className="flex items-center gap-2">
                                      <div className="w-4 h-4 bg-gray-100 border-2 border-gray-300 rounded"></div>
                                      <span>Свободно</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-4 h-4 bg-blue-500 border-2 border-blue-600 rounded"></div>
                                      <span>Выбрано</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="w-4 h-4 bg-red-200 border-2 border-red-300 rounded"></div>
                                      <span>Занято</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h3 className="font-semibold mb-4">
                                  Детали поездки
                                </h3>
                                <div className="space-y-4">
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">
                                      {result.from} → {result.to}
                                    </h4>
                                    <p className="text-sm text-gray-600 mb-2">
                                      {result.departure} - {result.arrival}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {result.company} • {result.busType}
                                    </p>
                                  </div>

                                  {selectedSeats.length > 0 && (
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                      <h4 className="font-medium mb-2">
                                        Выбранные места
                                      </h4>
                                      <p className="text-sm text-gray-600 mb-2">
                                        Места: {selectedSeats.join(", ")}
                                      </p>
                                      <p className="text-lg font-semibold">
                                        Итого:{" "}
                                        {result.price * selectedSeats.length} ₽
                                      </p>
                                    </div>
                                  )}

                                  <div className="space-y-2">
                                    <Label htmlFor="passenger-name">
                                      Имя пассажира
                                    </Label>
                                    <Input
                                      id="passenger-name"
                                      placeholder="Введите ваше имя"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor="passenger-phone">
                                      Телефон
                                    </Label>
                                    <Input
                                      id="passenger-phone"
                                      placeholder="+7 (___) ___-__-__"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor="passenger-email">
                                      Email
                                    </Label>
                                    <Input
                                      id="passenger-email"
                                      type="email"
                                      placeholder="example@mail.ru"
                                    />
                                  </div>

                                  <Button
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                    disabled={selectedSeats.length === 0}
                                  >
                                    Забронировать за{" "}
                                    {result.price * selectedSeats.length} ₽
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Routes */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            Популярные маршруты
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoutes.map((route, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Icon name="MapPin" className="h-5 w-5 text-blue-600" />
                    <Badge variant="secondary">{route.company}</Badge>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {route.from} → {route.to}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Время в пути: {route.duration}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {route.price} ₽
                    </span>
                    <Button size="sm" variant="outline">
                      Выбрать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Почему выбирают нас?</h2>
            <p className="text-lg text-gray-600">
              Мы делаем путешествия комфортными и доступными
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Icon name="Clock" className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Точность расписания
              </h3>
              <p className="text-gray-600">
                Автобусы отправляются строго по расписанию
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Icon name="Shield" className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Безопасность</h3>
              <p className="text-gray-600">
                Все автобусы проходят техосмотр и страхование
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <Icon name="CreditCard" className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Удобная оплата</h3>
              <p className="text-gray-600">Оплачивайте картой или наличными</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            Отзывы пассажиров
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback>
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-sm text-gray-600">{review.route}</p>
                    </div>
                  </div>

                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-600">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Icon name="Bus" className="h-6 w-6 text-blue-400 mr-2" />
                <h3 className="text-xl font-bold">БусТикет</h3>
              </div>
              <p className="text-gray-400">
                Удобный поиск и бронирование автобусных билетов по всей стране
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Сервис</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Поиск билетов
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Мои поездки
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Возврат билетов
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Статус рейса
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    О нас
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Контакты
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Вакансии
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Партнерам
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Помощь
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Правила
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Безопасность
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Обратная связь
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-gray-800" />

          <div className="flex justify-between items-center">
            <p className="text-gray-400">
              © 2024 БусТикет. Все права защищены.
            </p>
            <div className="flex space-x-4">
              <Icon name="Phone" className="h-5 w-5 text-gray-400" />
              <span className="text-gray-400">8 (800) 555-0123</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
