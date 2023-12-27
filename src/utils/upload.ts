import * as fs from 'fs';

import compress_images from 'compress-images';
import { diskStorage } from 'multer';
export const uploadImg = {
  storage: diskStorage({
    destination: process.cwd() + '/public/img',
    filename: (req, file, calback) =>
      calback(null, new Date().getTime() + '_' + file.originalname),
  })
};

export const toiUuHinh = (file) => {
  console.log("first",file.size)
  if (file.size > 500000)
    // lớn hơn 500 Kb
    compress_images(
      process.cwd() + '/public/img/' + file.filename,
      process.cwd() + '/public/file/',
      { compress_force: false, statistic: true, autoupdate: true },
      false,
      { jpg: { engine: 'mozjpeg', command: ['-quality', '20'] } },
      { png: { engine: 'pngquant', command: ['--quality=20-50', '-o'] } },
      { svg: { engine: 'svgo', command: '--multipass' } },
      {
        gif: {
          engine: 'gifsicle',
          command: ['--colors', '64', '--use-col=web'],
        },
      },
      function (error, completed, statistic) {
        console.log("first")
        // xóa file hình chưa tối ưu
        // fs.unlink(`process.cwd()+public/img/${}`);
      },
    );
};
