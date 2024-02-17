const fs = require("fs");
const Jimp = require("jimp");
const readline = require("readline");

const sourceFolder = "sources/";
const resultFolder = "result/";
const frameFolder = "frame/";

// Mengecek apakah folder result sudah ada, jika belum akan dibuat
if (!fs.existsSync(resultFolder)) {
  fs.mkdirSync(resultFolder);
}

// Fungsi untuk memproses setiap kombinasi gambar source dan frame
const processAllCombinations = async (
  sourceFiles,
  frameFiles,
  text,
  posisiText
) => {
  let index = 1;

  // Looping untuk setiap file frame
  for (const frameFileName of frameFiles) {
    // Baca gambar dari frame folder menggunakan Jimp
    const frameImage = await Jimp.read(`${frameFolder}${frameFileName}`);

    // Looping untuk setiap file source
    for (const sourceFileName of sourceFiles) {
      try {
        // Baca gambar dari source folder menggunakan Jimp
        const sourceImage = await Jimp.read(`${sourceFolder}${sourceFileName}`);

        // Potong gambar source menjadi rasio 1:1 (center)
        const targetWidth = Math.min(
          sourceImage.getWidth(),
          sourceImage.getHeight()
        );
        const targetHeight = targetWidth;
        const xOffset = Math.floor((sourceImage.getWidth() - targetWidth) / 2);
        const yOffset = Math.floor(
          (sourceImage.getHeight() - targetHeight) / 2
        );
        sourceImage.crop(xOffset, yOffset, targetWidth, targetHeight);

        // Samakan ukuran rasio gambar dan frame
        // const targetWidth2 = Math.min(
        //   sourceImage.getWidth(),
        //   frameImage.getWidth()
        // );
        // const targetHeight2 = Math.min(
        //   sourceImage.getHeight(),
        //   frameImage.getHeight()
        // );

        // // Resize gambar source
        // sourceImage.resize(targetWidth2, targetHeight2);

        // Resize gambar frame
        frameImage.resize(targetWidth, targetHeight);

        // Gabungkan gambar frame dengan gambar source (frame di atas source)
        const resultImage = new Jimp(targetWidth, targetHeight);
        resultImage.blit(sourceImage, 0, 0);
        resultImage.blit(frameImage, 0, 0);

        if (text) {
          // Tambahkan teks ke dalam hasil gambar dan letakkan di tengah
          const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE); // Ubah ukuran teks sesuai kebutuhan
          const textWidth = Jimp.measureText(font, text);
          const textHeight = Jimp.measureTextHeight(font, text, textWidth);

          // const yRandom = [100, 200, 300, 420];

          const yRandom = [
            (targetHeight / 13) * 1,
            (targetHeight / 13) * 7,
            (targetHeight / 13) * 12,
          ];

          // Mendapatkan indeks acak dari array
          let randomIndex;
          if (posisiText == "1") {
            randomIndex = Math.floor(Math.random() * yRandom.length);
          } else if (posisiText == "2") {
            randomIndex = 0;
          } else if (posisiText == "3") {
            randomIndex = 2;
          } else if (posisiText == "4") {
            randomIndex = 1;
          }

          // Mengakses nilai x dan y
          const textX = Math.floor((resultImage.getWidth() - textWidth) / 2);
          const textY = yRandom[randomIndex];

          resultImage.scan(textX, textY, textWidth, textHeight, (x, y, idx) => {
            // Mengganti warna latar belakang teks dengan warna yang diinginkan
            const backgroundColor = 0x000000; // Warna hitam
            resultImage.bitmap.data[idx + 0] = (backgroundColor >> 16) & 0xff; // R
            resultImage.bitmap.data[idx + 1] = (backgroundColor >> 8) & 0xff; // G
            resultImage.bitmap.data[idx + 2] = backgroundColor & 0xff; // B
            resultImage.bitmap.data[idx + 3] = 255; // Alpha
          });
          // Tambahkan teks dan shape menggunakan composite
          resultImage.print(font, textX, textY, text);
        }

        // Resize gambar hasil ke ukuran yang diinginkan (500x500)
        if (targetHeight > 1000 && targetWidth > 1000) {
          resultImage.resize(1000, 1000);
        }

        // Simpan hasil gabungan ke folder result dalam format JPG
        await resultImage.writeAsync(`${resultFolder}${index}.jpg`);

        console.log(`Kombinasi ke-${index} berhasil digabungkan dan disimpan.`);
        index++;
      } catch (error) {
        console.error(
          `Gagal memproses kombinasi ke-${index}: ${error.message}`
        );
      }
    }
  }
};

(async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Meminta input dari pengguna
  const text = await new Promise((resolve) => {
    rl.question("Masukkan Text (bisa no wa): ", (input) => {
      resolve(input);
    });
  });

  const posisiText = await new Promise((resolve) => {
    rl.question(
      "Posisi Text : \n1. Acak \n2. Atas \n3. Bawah \n4. Tengah\n",
      (input) => {
        resolve(input);
      }
    );
  });

  // Menutup interface pembacaan
  rl.close();
  // Baca semua file di folder sources
  fs.readdir(sourceFolder, async (err, sourceFiles) => {
    if (err) {
      console.error(`Gagal membaca folder sources: ${err.message}`);
      return;
    }

    // Filter hanya file gambar dengan ekstensi jpg, jpeg, dan png
    const sourceImageFiles = sourceFiles.filter((file) =>
      /\.(jpg|jpeg|png|webp)$/i.test(file)
    );

    // Baca semua file di folder frame
    fs.readdir(frameFolder, async (err, frameFiles) => {
      if (err) {
        console.error(`Gagal membaca folder frame: ${err.message}`);
        return;
      }

      // Filter hanya file gambar dengan ekstensi png
      const frameImageFiles = frameFiles.filter((file) => /\.png$/i.test(file));

      // Proses semua kombinasi gambar source dan frame
      await processAllCombinations(
        sourceImageFiles,
        frameImageFiles,
        text,
        posisiText
      );
    });
  });
})();
