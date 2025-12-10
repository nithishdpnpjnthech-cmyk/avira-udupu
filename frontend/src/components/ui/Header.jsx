import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import { useAuth } from '../../contexts/AuthContext';

import Input from './Input';
import MegaMenu from './MegaMenu';
import CartDrawer from './CartDrawer';
import { useCart } from '../../contexts/CartContext.jsx';

const Header = ({ onSearch = () => {} }) => {
  const { cartItems, getCartItemCount, updateQuantity, removeFromCart } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  const announcementMessages = [
    "🚚 Free Shipping on Orders Above ₹500",
    "🎉 Enjoy 10% off on every purchase"
  ];

  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
    setActiveMegaMenu(null);
    setIsSearchOpen(false);
    setIsAccountDropdownOpen(false);
    setActiveDropdown(null);
  }, [location]);
  
  // Rotate announcement messages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex(prevIndex => (prevIndex + 1) % announcementMessages.length);
    }, 5000); // Change message every 5 seconds
    
    return () => clearInterval(interval);
  }, [announcementMessages.length]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isAccountDropdownOpen && !event.target.closest('.account-dropdown')) {
        setIsAccountDropdownOpen(false);
      }
      if (activeDropdown && !event.target.closest('.nav-dropdown')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAccountDropdownOpen, activeDropdown]);

  useEffect(() => {
    const q = searchQuery.trim();
    if (q.length < 2) {
      setSuggestions([]);
      setSuggestionsOpen(false);
      return;
    }
    let ignore = false;
    setSearchLoading(true);
    const timer = setTimeout(async () => {
      try {
        const list = await fetch('/api/products');
        let items = await list.json();
        const qLower = q.toLowerCase();
        items = items.filter(p => String(p?.name || p?.title || '').toLowerCase().includes(qLower));
        const limited = items.slice(0, 8).map(p => ({
          id: p?.id,
          name: p?.name || p?.title,
          price: p?.price ?? p?.salePrice ?? 0,
          image: p?.imageUrl || p?.image || p?.thumbnailUrl || p?.image_path
        }));
        if (!ignore) {
          setSuggestions(limited);
          setSuggestionsOpen(true);
        }
      } catch (e) {
        if (!ignore) {
          setSuggestions([]);
          setSuggestionsOpen(false);
        }
      } finally {
        if (!ignore) setSearchLoading(false);
      }
    }, 250);
    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const handleSearch = (e) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery?.trim()) params.set('search', searchQuery.trim());
    const target = `/product-collection-grid${params.toString() ? `?${params.toString()}` : ''}`;
    navigate(target);
    if (searchQuery?.trim() && onSearch) onSearch(searchQuery.trim());
  };

  const navigationItems = [
    { 
      label: 'Home', 
      path: '/',
      hasMegaMenu: false
    },
    { 
      label: 'Sarees', 
      menuId: 'sarees',
      hasMegaMenu: true
    },
    { 
      label: 'Best Sellers', 
      path: '/product-collection-grid?filter=bestsellers',
      hasMegaMenu: false
    },
    { 
      label: 'New Arrivals', 
      path: '/product-collection-grid?filter=new',
      hasMegaMenu: false
    },

    { 
      label: 'About Us', 
      path: '/about-us',
      hasMegaMenu: false
    },

    { 
      label: 'Contact Us', 
      path: '/contact',
      hasMegaMenu: false
    }
  ];

  return (
    <>
      {/* Scrolling Announcement Bar */}
      <div className="bg-royal-blue text-white py-3 text-center overflow-hidden sticky top-0 z-50 relative h-12">
        <div className="flex items-center justify-center h-full animate-fadeInUp">
          <span className="mx-12 text-lg font-medium">{announcementMessages[currentMessageIndex]}</span>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="header-container z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <Link to="/" className="flex items-center space-x-4 flex-shrink-0 group">
              <div className="relative hover-lift">
                <img 
                  src="/assets/images/logo.jpeg" 
                  alt="AVIRA UDUPU Logo" 
                  className="w-14 h-14 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="hidden sm:block border-l-2 border-gold pl-4">
                <h1 className="text-xl font-bold text-royal-blue premium-text-gradient">
                  AVIRA UDUPU
                </h1>
                <p className="text-xs text-blue-800 font-serif">Premium Saree Collection</p>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8 relative hidden md:block">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative w-full rounded-full border-2 border-gold/30 bg-white overflow-hidden hover-lift transition-all duration-300 focus-within:border-gold focus-within:shadow-lg">
                  <Input
                    type="search"
                    placeholder="Search for premium sarees..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="w-full border-0 focus:ring-0 pl-6 pr-14 py-3 font-serif placeholder:text-blue-300 text-royal-blue"
                  />
                  <button
                    type="submit"
                    className="absolute top-1/2 -translate-y-1/2 right-4 text-gold hover:text-gold/80 transition-colors duration-200"
                    aria-label="Search"
                  >
                    {searchLoading ? (
                      <span className="animate-spin inline-block w-5 h-5 border-2 border-gold border-t-transparent rounded-full" />
                    ) : (
                      <Icon name="Search" size={20} />
                    )}
                  </button>
                </div>
              </form>
              
              {/* Search Suggestions */}
              {suggestionsOpen && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white border-2 border-gold rounded-lg shadow-lg z-50 overflow-hidden animate-fadeInUp">
                  {suggestions.map(item => (
                    <button
                      key={item.id}
                      onClick={() => navigate(`/product-detail-page/${item.id}`)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-yellow-50 text-left transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <img src={item.image || '/assets/images/no_image.png'} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1">
                        <div className="text-sm text-royal-blue font-serif line-clamp-1 font-semibold">{item.name}</div>
                        <div className="text-xs text-gold font-semibold">₹{(item.price || 0).toLocaleString()}</div>
                      </div>
                      <Icon name="ChevronRight" size={16} className="text-gold" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-6">
              {/* Wishlist */}
              <Link
                to="/user-account-dashboard?section=wishlist"
                className="flex flex-col items-center text-secondary hover:text-primary transition-colors duration-200 hover-gold"
              >
                <Icon name="Heart" size={24} />
                <span className="text-xs font-serif mt-1">Wishlist</span>
              </Link>

              {/* User Account */}
              {user ? (
                <div className="relative account-dropdown">
                  <button
                    onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                    className="flex flex-col items-center text-secondary hover:text-primary transition-colors duration-200 hover-gold"
                  >
                    <Icon name="User" size={24} />
                    <span className="text-xs font-serif mt-1">Account</span>
                  </button>
                  
                  {isAccountDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-premium z-50">
                      <div className="py-2">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-serif font-semibold text-secondary">
                            {user.name || user.email?.split('@')[0]}
                          </p>
                          <p className="text-xs text-blue-300">{user.email}</p>
                        </div>
                        <Link
                          to="/user-account-dashboard"
                          className="block px-4 py-2 text-sm font-serif text-secondary hover:bg-gold-50 transition-colors"
                          onClick={() => setIsAccountDropdownOpen(false)}
                        >
                          <Icon name="User" size={16} className="inline mr-2" />
                          My Profile
                        </Link>
                        <Link
                          to="/user-account-dashboard?section=orders"
                          className="block px-4 py-2 text-sm font-serif text-secondary hover:bg-gold-50 transition-colors"
                          onClick={() => setIsAccountDropdownOpen(false)}
                        >
                          <Icon name="Package" size={16} className="inline mr-2" />
                          My Orders
                        </Link>
                        <hr className="my-1 border-gray-100" />
                        <button
                          onClick={async () => {
                            setIsAccountDropdownOpen(false);
                            await signOut();
                            navigate('/');
                          }}
                          className="block w-full text-left px-4 py-2 text-sm font-serif text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Icon name="LogOut" size={16} className="inline mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/user-login"
                  className="flex flex-col items-center text-secondary hover:text-primary transition-colors duration-200 hover-gold"
                >
                  <Icon name="User" size={24} />
                  <span className="text-xs font-serif mt-1">Sign In</span>
                </Link>
              )}

              {/* Cart */}
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="relative flex flex-col items-center text-secondary hover:text-primary transition-colors duration-200 hover-gold"
              >
                <Icon name="ShoppingCart" size={24} />
                <span className="text-xs font-serif mt-1">Cart</span>
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Bar */}
      <div className="bg-secondary text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <div key={index} className="relative nav-dropdown">
                  {item.hasMegaMenu ? (
                    <button
                      onMouseEnter={() => {
                        setActiveMegaMenu(item.menuId);
                        setIsMegaMenuOpen(true);
                      }}
                      className="flex items-center space-x-1 font-serif font-medium hover:text-primary transition-colors duration-200 py-2"
                    >
                      <span>{item.label}</span>
                      <Icon 
                        name="ChevronDown" 
                        size={16} 
                        className="transition-transform duration-200" 
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className="font-serif font-medium hover:text-primary transition-colors duration-200 py-2 block"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            
            {/* Contact Info */}
            <div className="hidden lg:flex items-center space-x-4 text-sm font-serif">
              <span className="flex items-center">
                <Icon name="Phone" size={16} className="mr-1" />
                6362454920
              </span>
              <span className="flex items-center">
                <Icon name="Mail" size={16} className="mr-1" />
                info@aviraudupu.com
              </span>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>


          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-600 bg-secondary">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navigationItems.map((item, index) => (
                <div key={index}>
                  {item.hasMegaMenu ? (
                    <button
                      onClick={() => {
                        setActiveMegaMenu(activeMegaMenu === item.menuId ? null : item.menuId);
                        setIsMegaMenuOpen(activeMegaMenu !== item.menuId);
                      }}
                      className="flex items-center justify-between w-full font-serif font-medium text-white hover:text-primary transition-colors duration-200 py-2"
                    >
                      <span>{item.label}</span>
                      <Icon
                        name="ChevronDown"
                        size={16}
                        className={`transition-transform duration-200 ${activeMegaMenu === item.menuId && isMegaMenuOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className="block font-serif font-medium text-white hover:text-primary transition-colors duration-200 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Mega Menu - Positioned relative to navigation */}
      {isMegaMenuOpen && activeMegaMenu && (
        <div 
          onMouseEnter={() => setIsMegaMenuOpen(true)}
          onMouseLeave={() => {
            setIsMegaMenuOpen(false);
            setActiveMegaMenu(null);
          }}
          className="relative"
        >
          <MegaMenu 
            isOpen={true} 
            onClose={() => {
              setIsMegaMenuOpen(false);
              setActiveMegaMenu(null);
            }} 
            activeMenu={activeMegaMenu}
          />
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </>
  );
};

export default Header;
