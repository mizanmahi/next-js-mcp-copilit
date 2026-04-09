import type { NavItem } from './types';
import {
    BadgeInfo,
    BriefcaseBusiness,
    ClipboardList,
    FolderKanban,
    House,
    Mail,
    Sparkles,
} from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
    { id: 'home', label: 'Home', icon: House },
    { id: 'about', label: 'About', icon: BadgeInfo },
    { id: 'skills', label: 'Skills', icon: Sparkles },
    { id: 'services', label: 'Services', icon: BriefcaseBusiness },
    { id: 'portfolio', label: 'Portfolio', icon: FolderKanban },
    { id: 'experience', label: 'Experience', icon: ClipboardList },
    { id: 'contact', label: 'Contact', icon: Mail },
];

export const SWITCH_WORDS = ['Builder', 'Architect', 'Mentor', 'Innovator'];

export const BOOT_LINES = [
    '> Initializing portfolio...',
    '> Loading Mizanur.config.json ✓',
    '> Mounting React components ✓',
    '> Connecting to servers... ✓',
    "> Welcome. Let's build something great.",
];
