export type catagoryType = {
    catagoryName: string,
    children?: catagoryType[],
    createdAt?: string,
    updatedAt?: string,
    parant?: catagoryType
    photo?: string,
    _id: string
}