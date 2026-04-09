export type NavItem = {
    id: string;
    label: string;
    icon: React.ElementType;
};

export type ContactResponse = {
    ok: boolean;
    message: string;
};

export type CursorMode = 'default' | 'active' | 'eye';
