const express = require('express');
const { Command } = require('commander');
const app = express();
const program = new Command();

// Налаштування параметрів командного рядка
program
  .requiredOption('-h, --host <string>', 'server host address')
  .requiredOption('-p, --port <number>', 'server port')
  .requiredOption('-c, --cache <path>', 'path to cache directory')
  .parse(process.argv);

// Отримуємо значення параметрів
const options = program.opts();
const { host, port, cache } = options;

// Перевіряємо шлях до кешу (можна додати перевірку існування директорії)
console.log(`Cache directory: ${cache}`);

// Налаштовуємо сервер Express
app.get('/', (req, res) => {
  res.send(`Server running on ${host}:${port}, caching to ${cache}`);
});

// Запускаємо сервер
app.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
