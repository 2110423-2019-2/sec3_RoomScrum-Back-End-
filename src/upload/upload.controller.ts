import { Controller, UploadedFile, Param, UseInterceptors, Post, Get, Res } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { imageFileFilter, editFileName } from "../utils/file-uploading.utils";
import { diskStorage } from "multer";

@Controller('upload')
export class UploadController {
    @Post('image')
    @UseInterceptors(
        FileInterceptor('image/user', {
            storage: diskStorage({
                destination: './files/user/',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadUserImage(@UploadedFile() file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }

    //this is HACK
    @Post('image/band')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './files/band/',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadBandImage(@UploadedFile() file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }

    @Post('image/event')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './files/event/',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadEventImage(@UploadedFile() file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }

    @Get('image/:imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
        return res.sendFile(image, { root: './files/' });
    }
}
