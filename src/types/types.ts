export enum UserRole {
    admin = 'admin',
    item_edit = 'item_edit',
    info_edit = 'info_edit',
    test_edit = 'test_edit',
}

export interface Menu {
    label: string,
    link: string,
}

export interface Category {
    id: number,
    title_kk: string,
    title_ru: string,
    title_en: string,
    photo: string | null,
    fields: Field[],
}

export interface Detail {
    field_name: string,
    value: string,
}

export interface Item {
    id: number | null,
    is_active: boolean,
    category_id: number | null,
    title_kk: string | null,
    title_ru: string | null,
    title_en: string | null,
    text_kk: string | null,
    text_ru: string | null,
    text_en: string | null,
    region_id: number | null,
    district_id: number | null,
    punkt_kk: string | null,
    punkt_ru: string | null,
    punkt_en: string | null,
    date_of_action: string,
    time_of_action: string,
    data: {
        photos?: string[],
        details?: Detail[],
    } | null,
    photo_path: string | null,
    created_at: string,
    user_id: string,
    show_danger_label: boolean
}

export interface Dict {
    id: number,
    title_kk: string,
    title_ru: string,
    title_en: string,
}

export enum CardType {
    gallery = 'gallery',
    list = 'list',
    grid = 'grid',
}

export interface Action {
    label: string,
    onclick: () => void,
    icon: JSX.Element,
    role: string,
}

export type Field = {
    field_name?: string,
    type: string,
    title_ru: string,
    title_kk: string,
    title_en: string
}

export type Media = {
    id: string,
    file: File,
}

export interface Comment {
    id?: number | null,
    text?: string | null,
    item_id?: number | null,
    user_id?: string | null,
    create_at?: string | null,
    email?: string | null,
    about?: boolean
}

export interface Profile {
    id?: number | null,
    username?: string | null,
    full_name?: string | null,
    avatar_url?: string | null,
}

export interface CategoryInfo {
    category_id: number,
    count: number,
}

export interface Info {
    id: number | null,
    is_active: boolean,
    order: number | null,
    title_ru: string | null,
    title_kk: string | null,
    title_en: string | null,
    text_kk: string | null,
    text_ru: string | null,
    text_en: string | null,
    date_of_action: string,
    data: {
        photos: string[],
    } | null,
    photo_path: string | null,
    user_id: string | null,
}

export interface Question {
    title: string,
    multyple: boolean,
    own_answer: boolean,
    answers: string[],
}

export interface TestType {
    id: number | null,
    is_active: boolean,
    title_ru: string | null,
    title_kk: string | null,
    title_en: string | null,
    data: {
        test_kk: Question[] | null,
        test_ru: Question[] | null,
        test_en: Question[] | null,
    } | null,
    user_id: string | null,
}

export interface ResultTest {
    question: string,
    answers: boolean[],
    own_answer?: string,
}

export interface TestResults {
    test_id: number | null,
    data: {
        results: ResultTest[]
    } | null,
}

export interface TestDataRow {
    title: string,
    labels: string[],
    data: number[],
    own_answers: string[]
}

export interface Site {
    href: string,
    title_kk: string,
    title_ru: string,
    title_en: string,
}