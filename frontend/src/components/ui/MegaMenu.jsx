import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import menuData from '../../data/menuData.json';

const MegaMenu = ({ isOpen, onClose, activeMenu = 'new-arrivals' }) => {

  if (!isOpen) return null;

  // Find the active menu data
  const currentMenuData = menuData.mainMenuItems.find(item => item.id === activeMenu);
  
  if (!currentMenuData) return null;

  // Render simple menu (New Arrivals)
  const renderSimpleMenu = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {currentMenuData.items.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="text-sm text-royal-blue hover:text-primary hover:bg-yellow-50 px-3 py-2 rounded transition-colors duration-200 font-serif"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );

  // Render grouped menu (Shop by Fabric, Wedding & Bridal, Featured Collections)
  const renderGroupedMenu = () => (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {currentMenuData.groups.map((group, groupIndex) => (
        <div key={groupIndex} className="space-y-4">
          <h3 className="font-serif font-bold text-lg text-royal-blue border-b-2 border-gold pb-2 mb-4">
            {group.groupName}
          </h3>
          <ul className="space-y-2">
            {group.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <Link
                  to={item.path}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="text-sm text-royal-blue hover:text-primary transition-colors duration-200 block py-1 font-serif hover:translate-x-1 transform"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-[1001] lg:hidden"
        onClick={onClose}
      />
      {/* Mega Menu Content */}
      <div className="absolute top-full left-0 w-full bg-white shadow-2xl border-t-4 border-gold z-[1002] max-h-[80vh] overflow-y-auto">
        <div className="container mx-auto px-6 py-8">
          {/* Menu Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-royal-blue font-serif border-b-2 border-gold inline-block pb-2">
              {currentMenuData.title}
            </h2>
          </div>
          
          {/* Menu Content */}
          {currentMenuData.type === 'simple' ? renderSimpleMenu() : renderGroupedMenu()}
          
          {/* Featured Footer */}
          <div className="mt-8 pt-6 border-t-2 border-gray-200">
            <div className="flex flex-col lg:flex-row items-center justify-between bg-gradient-to-r from-yellow-50 to-gold-50 rounded-lg p-6">
              <div className="text-center lg:text-left mb-4 lg:mb-0">
                <h4 className="font-serif font-bold text-lg text-royal-blue mb-2">
                  ✨ Exclusive Collection
                </h4>
                <p className="font-serif text-blue-800">
                  Discover our handpicked premium saree collection
                </p>
              </div>
              <Link
                to="/product-collection-grid"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="bg-gradient-to-r from-royal-blue to-blue-700 text-white px-8 py-3 rounded-full font-serif font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                Shop Now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MegaMenu;