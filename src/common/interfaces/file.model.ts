export interface FileUpload {
    fieldname:    string;
    originalname: string;
    encoding:     string;
    mimetype:     string;
    buffer:       Buffer;
    size: number
}

export interface Buffer {
    type: string;
    data: any[];
}
