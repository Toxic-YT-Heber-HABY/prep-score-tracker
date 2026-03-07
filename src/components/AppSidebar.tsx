import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavLink } from '@/components/NavLink';
import { useI18n } from '@/lib/i18n';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  Home,
  MessageCircle,
  BookOpen,
  History,
  Mail,
  Globe,
  Moon,
  Sun,
  Sparkles,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  MessageSquare,
  FileText,
  Shield,
} from 'lucide-react';
import { toast } from 'sonner';
import AISidebar from './AISidebar';

const navItems = [
  { titleEs: 'Inicio', titleEn: 'Home', url: '/', icon: Home },
  { titleEs: 'ChatIA', titleEn: 'ChatAI', url: '/chat-calculator', icon: MessageCircle },
  { titleEs: 'Guía', titleEn: 'Guide', url: '/guide', icon: BookOpen },
  { titleEs: 'Historial', titleEn: 'History', url: '/version-history', icon: History },
  { titleEs: 'Contacto', titleEn: 'Contact', url: '/contact', icon: Mail },
];

const legalItems = [
  { titleEs: 'Términos', titleEn: 'Terms', url: '/terms', icon: FileText },
  { titleEs: 'Privacidad', titleEn: 'Privacy', url: '/privacy', icon: Shield },
];

const socialLinks = [
  { href: 'https://www.facebook.com/zadkiel.garcia.31', icon: Facebook, label: 'Facebook' },
  { href: 'https://www.instagram.com/habydoors/', icon: Instagram, label: 'Instagram' },
  { href: 'https://www.youtube.com/@HABYOpenDoors?themeRefresh=1', icon: Youtube, label: 'YouTube' },
  { href: 'https://x.com/Haby_Open_Doors', icon: Twitter, label: 'Twitter' },
  { href: 'https://wa.me/5256536812377', icon: MessageSquare, label: 'WhatsApp' },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const { language, toggleLanguage } = useI18n();
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const [isAISidebarOpen, setIsAISidebarOpen] = useState(false);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const handleLanguageToggle = () => {
    toggleLanguage();
    toast.success(language === 'es' ? 'Language changed to English' : 'Idioma cambiado a Español');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <AISidebar isOpen={isAISidebarOpen} onClose={() => setIsAISidebarOpen(false)} />
      <Sidebar collapsible="icon">
        {/* Logo */}
        <SidebarHeader className="p-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/lovable-uploads/22c442b5-67ed-4e06-a4bc-4be99d33c236.png"
              alt="HABY Logo"
              className="h-8 w-auto flex-shrink-0"
              width={28}
              height={32}
            />
            {!collapsed && (
              <div>
                <span className="text-lg font-bold text-foreground">HABY</span>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  {language === 'es' ? 'Calculadora de calificaciones' : 'Grade calculator'}
                </p>
              </div>
            )}
          </Link>
        </SidebarHeader>

        <SidebarSeparator />

        {/* AI Assistant Button */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setIsAISidebarOpen(true)}
                  className="bg-education-primary/10 hover:bg-education-primary/20 text-education-primary font-medium"
                  tooltip={language === 'es' ? 'Asistente IA' : 'AI Assistant'}
                >
                  <Sparkles className="h-4 w-4" />
                  {!collapsed && <span>{language === 'es' ? 'Asistente IA' : 'AI Assistant'}</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Main Navigation */}
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              {language === 'es' ? 'Navegación' : 'Navigation'}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      tooltip={language === 'es' ? item.titleEs : item.titleEn}
                    >
                      <NavLink
                        to={item.url}
                        end={item.url === '/'}
                        className="hover:bg-muted/50"
                        activeClassName="bg-muted text-foreground font-medium"
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{language === 'es' ? item.titleEs : item.titleEn}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>{language === 'es' ? 'Legal' : 'Legal'}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {legalItems.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      tooltip={language === 'es' ? item.titleEs : item.titleEn}
                    >
                      <NavLink
                        to={item.url}
                        className="hover:bg-muted/50"
                        activeClassName="bg-muted text-foreground font-medium"
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{language === 'es' ? item.titleEs : item.titleEn}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarSeparator />

        {/* Footer: Theme, Language, Social */}
        <SidebarFooter className="p-3 space-y-2">
          {/* Theme & Language toggles */}
          <div className={collapsed ? 'flex flex-col gap-1 items-center' : 'flex gap-2'}>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-8 w-8 p-0"
              title={theme === 'dark' ? (language === 'es' ? 'Modo claro' : 'Light mode') : (language === 'es' ? 'Modo oscuro' : 'Dark mode')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLanguageToggle}
              className={collapsed ? 'h-8 w-8 p-0' : 'h-8 px-2 text-xs'}
            >
              <Globe className="h-4 w-4" />
              {!collapsed && <span className="ml-1">{language === 'es' ? 'EN' : 'ES'}</span>}
            </Button>
          </div>

          {/* Social links */}
          {!collapsed && (
            <div className="flex justify-center gap-2 pt-1">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title={label}
                  aria-label={label}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          )}

          {!collapsed && (
            <p className="text-[10px] text-muted-foreground text-center">
              © {new Date().getFullYear()} HABY
            </p>
          )}
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default AppSidebar;
