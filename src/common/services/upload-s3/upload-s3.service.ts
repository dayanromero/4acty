import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
// import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from 'src/config/constants';
import { ConfigService } from '@nestjs/config';
import {FileUpload, ImageS3} from 'src/common/interfaces';
import { getExtension } from 'src/common/helpers';
import { User } from 'src/user/entity';
@Injectable()
export class UploadS3Service  {
    
     bucketS3 = '4acty-multimedia';

    async upload(file:FileUpload,user:User) {
        
        let name = `${user.id}.${getExtension(file)}`;
        

        // const { originalname } = file;
        
        return await this.uploadS3(file.buffer, this.bucketS3, name);
    }
    
    async uploadS3(file, bucket, name) {
        const s3 = this.getS3();
        const params = {
            Bucket: bucket,
            Key: `profile/${String(name)}`,
            Body: file,
            ACL:'public-read'
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
            if (err) {
                // Logger.error(err);
                reject(err.message);
            }
            resolve(data);
            });
        });
    }
    deleteImage(image:string){
        let cleanImage = image.replace('https://4acty-multimedia.s3.amazonaws.com/', '');
        const s3 = this.getS3();
        const params = {
            Bucket: this.bucketS3,
            Delete: { // required
                Objects: [ // required
                  {
                    Key: cleanImage // required
                  },
                ]
            }
        };
        s3.deleteObjects(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else     console.log(data);           // successful response
        });
    }
    
     getS3() {
        return new S3({
            accessKeyId:  process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });
    }
}
