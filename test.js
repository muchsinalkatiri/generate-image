const readline = require("readline");

(async () => {
  // Membuat interface pembacaan untuk membaca dari terminal
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Meminta input dari pengguna
  await rl.question("Masukkan nilai variabel: ", (inputVariable) => {
    // Menampilkan nilai variabel yang dimasukkan
    console.log("Input Variabel:", inputVariable);

    // Menutup interface pembacaan
    rl.close();
  });
})();
