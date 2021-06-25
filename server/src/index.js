const express = require("express");
const bodyParser = require("body-parser");
const multiparty = require("connect-multiparty");
// const cors = require("cors");

const app = express();

// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// const corsOptions = {
//   origin: '*',
//   optionsSuccessStatus: 200
// }
// app.use(cors(corsOptions));

const multipartyMiddleware = multiparty({ uploadDir: './uploads'})

app.post('/upload', multipartyMiddleware, (req, res) => {
  const files = req.files;
  console.log('Arquivos recebidos: ', files);
  res.json({ message: files });
})

app.get('/downloadExcel', (rez, res) => {
  res.download("./uploads/report.xlsx");
});

app.get("/downloadPDF", (rez, res) => {
  res.download("./uploads/report.pdf");
});

app.use((err, req, res, next) => res.json({ error: err.message }));

// app.use(function (req, res) {
//   res.setHeader("Content-Type", "text/plain");
//   res.write("you posted:\n");
//   res.end(JSON.stringify(req.body, null, 2));
// });

app.listen(8000, () => {
  console.log('Servidor rodando na porta 8000...');
})

