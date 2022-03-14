import { BadRequestException } from '@nestjs/common';
import { FileUpload } from '../interfaces';

const imageMimeTypes = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/bmp',
];

const validateExtension = (file:FileUpload):boolean => {
    const mimeType = imageMimeTypes.find(im => im === file.mimetype);
    
    if (!mimeType) throw new BadRequestException('imagen no valida');
    
    return true;

}

const getExtension = (file:FileUpload):String =>{return file.originalname.split('.').pop()}
export {validateExtension,getExtension}