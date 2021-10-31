const fsPromises = require('fs/promises');
const sharp = require('sharp');


async function imageConverter(oldPath, newPath) {
    try {
        let files = await fsPromises.readdir(oldPath);
        let uniqueString = '', ch;

        for (let i = 0; i < files.length; i++) {
            for (let j = 1; j <= 20;) {
                let number = Math.floor(Math.random() * 123);
                ch = String.fromCharCode(number);
                if (ch.match(/[a-zA-Z0-9]/g)) {
                    uniqueString += ch;
                    j++;
                }
            }

            await sharp(`${oldPath}/${files[i]}`)
                .resize(1366, 768)
                .toFile(`${newPath}/${uniqueString}.jpg`);
            uniqueString = '';
        }

        console.log('\x1b[1;32m Images Converted successfully');
    } catch (err) {
        console.log({ imageConverter: err.message });
    }
}


imageConverter('./OldImages', './NewImages');
