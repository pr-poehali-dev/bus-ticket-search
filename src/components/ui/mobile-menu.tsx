import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface MobileMenuProps {
  onAdminClick: () => void;
}

export default function MobileMenu({ onAdminClick }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Главная', href: '#' },
    { label: 'Маршруты', href: '#' },
    { label: 'О нас', href: '#' },
    { label: 'Контакты', href: '#' },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="lg:hidden">
          <Icon name="Menu" className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <div className="flex flex-col space-y-4 mt-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-lg font-medium text-gray-700 hover:text-blue-600 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          
          <div className="border-t pt-4 mt-6">
            <Button 
              variant="outline" 
              className="w-full mb-3" 
              onClick={() => setIsOpen(false)}
            >
              <Icon name="User" className="h-4 w-4 mr-2" />
              Войти
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full" 
              onClick={() => {
                onAdminClick();
                setIsOpen(false);
              }}
            >
              <Icon name="Settings" className="h-4 w-4 mr-2" />
              Админпанель
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}