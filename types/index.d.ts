
export type Author = {_id: number, name: string}

declare interface StartupCardType {
    _createdAt: any,
    views: number,
    author: Author,
    _id: number,
    description: string,
    image: string,
    category: string,
    title: string,
}
