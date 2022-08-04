require("dotenv").config();
const cors = require("cors");
const express = require("express");
const parser = require("body-parser");
const router = require("./routers");

const app = express();
const mdl = require("./core/middleware");
const port = process.env.PORT || 8000;
// const corsOptions = require("./configs/cors");

const log = require("./configs/logger");
const routes = require("./routers");

app.listen(port, () => {
  app.use(mdl.writeReq);
  // app.use(cors(corsOptions));

  app.use(parser.urlencoded({ extended: false }))
  app.use(parser.json());
  app.disable("x-powered-by");
  app.use(
    parser.urlencoded({
      extended: true,
    })
  );

  app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
});

  app.use('/public', express.static('public'))
  app.use('/public/audio/', express.static('/public/audio/'))

  app.get("/download", function(req,res) {
   
    var file = __dirname + '/assets/apk/eCotourism.apk';

    var filename = path.basename(file);
    var mimetype = mime.lookup(file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    var filestream = fs.createReadStream(file);
    filestream.pipe(res);
  });


  router(app);

  // app.use(routers);
  global.APP_PATH = __dirname;

  log.debug(`Server is running on port: ${port}`);
});
