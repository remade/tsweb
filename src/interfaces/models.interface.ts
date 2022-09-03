export interface User {
    id?: string;
    email?: string;
    password?: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface Category {
    id?: string;
    name?: string;
    is_active?: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export interface Book {
    id?: string;
    title?: string;
    author_name?: string;
    category_id?: string;
    published_year?: string;
    price?: number;
    available_quantity?: number;
    currency?: string;

    category?: Category;
    created_at?: Date;
    updated_at?: Date;
}

export interface Cart {
    id?: string;
    user_id?: string;
    is_active?: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export interface Order {
    id?: string;
    user_id?: string;
    payment_status?: string;
    created_at?: Date;
    updated_at?: Date;
}
export interface Role {
    id?: string;
    name?: string;
    slug?: string;
    created_at?: Date;
    updated_at?: Date;
}
