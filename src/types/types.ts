export enum UserRole {
    admin = 'admin',
    editor = 'editor',
    operator = 'operator',
    reader = 'editor',
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
    category_id: number | null,
    title_kk: string | null,
    title_ru: string | null,
    title_en: string | null,
    text_kk: string | null,
    text_ru: string | null,
    text_en: string | null,
    region_id: number | null,
    district_id: number | null,
    punkt: string | null,
    date_of_action: string,
    time_of_action: string,
    data: {
        photos?: string[],
        details?: Detail[],
    } | null,
    photo_path: string | null,
    created_at: string,
    user_id: string
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
    icon: JSX.Element
}

export type Field = {
    field_name?: string,
    type: string,
    title_ru: string,
    title_kk: string,
    title_en: string
}

export type Photo = {
    id: string,
    file: File
}

export interface Comment {
    id?: number | null,
    text?: string | null,
    item_id?: string | null,
    user_id?: string | null,
    create_at?: string | null,
    email?: string | null,
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

interface Answer {
    title_ru: string | null,
    title_kk: string | null,
    title_en: string | null,
}

interface Question {
    title_ru: string | null,
    title_kk: string | null,
    title_en: string | null,
    multyple: boolean | null,
    own_answer: boolean | null,
    answers: Answer[] | null,
}

export interface TestType {
    id: number | null,
    title_ru: string | null,
    title_kk: string | null,
    title_en: string | null,
    data: {
        questions: Question[] | null
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