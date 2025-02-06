//Шаардлагатай модулиудыг импортлох
const express = require("express") ; 
const mysql = require("mysql2") ;
const app = express();
const cors = require("cors");
//MySQL холболтын сан үүсгэх
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "dream*2025",
    database: "ForPet",
    waitForConnections: true ,
    connectionLimit: 10,
    queueLimit: 0 ,
});

app.use(cors());
app.use(express.json());


//холболтын сан үүсгэх
pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Connected to MySQL!");
    connection.release();
  });
  
  //API -> Application Programming interface
  app.get("/users", (req, res) => {
    //MySQL с өгөгдөл татах
    pool.query("SELECT * FROM users", (err, rows) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Error fetching data from database");
        return;
      }
      res.json(rows); //татаж авсан өгөгдлийг JSON хариу болгон илгээх
    });
  });
  app.get("/order_items", (req, res) => {
    //MySQL с өгөгдөл татах
    pool.query("SELECT * FROM order_items", (err, rows) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Error fetching data from database");
        return;
      }
      res.json(rows); //татаж авсан өгөгдлийг JSON хариу болгон илгээх
    });
 });
 app.get("/orders", (req, res) => {
  //MySQL с өгөгдөл татах
  pool.query("SELECT * FROM orders", (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows); //татаж авсан өгөгдлийг JSON хариу болгон илгээх
  });
});
app.get("/products", (req, res) => {
  //MySQL с өгөгдөл татах
  pool.query("SELECT * FROM products", (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows); //татаж авсан өгөгдлийг JSON хариу болгон илгээх
  });
});

app.get("/reviews", (req, res) => {
  //MySQL с өгөгдөл татах
  pool.query("SELECT * FROM reviews", (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows); //татаж авсан өгөгдлийг JSON хариу болгон илгээх
  });
});


app.get("/",(req ,res) =>
  res.status(200).json({ result : "Сервис ажиллаж бна"})
);
  //серверийг эхлүүлэх
  const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


//CreateUsers
app.post("/createUsers", (req, res) => {
  const { username, email, password } = req.body; 
  const query = "INSERT INTO users (user_id, name, email, password_hash, phone_number, location, user_type, created_at) VALUES (?, ?, ?, ?, ?, ?, ? ,? )";
  pool.query(query, [user_id, name, email, password_hash, phone_number, location, user_type, created_at], (err, result) => {
    if (err) {
      console.error("Мэдээлэл оруулахад алдаа гарлаа", err);
      return res.status(500).send("Мэдээлэл оруулахад алдаа гарлаа.");
    }
    res.json(rows);
  });

});

app.get("/getUsers", (req, res) => {
  pool.query("select * from Users", (err, rows) => {
    if (err) {
      console.error("Мэдээлэл оруулахад алдаа гарлаа", err);
      res.status(500).send("Мэдээлэл оруулахад алдаа гарлаа.");
      return;
    }
    res.json(rows);
  });
});

app.get("/reviews", (req, res) => {
  //MySQL с өгөгдөл татах
  pool.query("SELECT * FROM reviews", (err, rows) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error fetching data from database");
      return;
    }
    res.json(rows); //татаж авсан өгөгдлийг JSON хариу болгон илгээх
  });
});



//CreateProducts
app.post("/createProducts", (req, res) => {
  const { product_name, price, stock } = req.body;
  const query = "INSERT INTO products (product_name, price, stock) VALUES (?, ?, ?)";
  pool.query(query, [product_name, price, stock], (err, result) => {
    if (err) {
      console.error("Мэдээлэл оруулахад алдаа гарлаа", err);
      return res.status(500).send("Мэдээлэл оруулахад алдаа гарлаа.");
    }
    res.status(200).send("Бүтээгдэхүүн амжилттай нэмэгдлээ.");
  });
});



//createorders
app.post("/createOrders", (req, res) => {
  const { user_id, total_amount, status } = req.body;
  const query = "INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)";

  pool.query(query, [user_id, total_amount, status], (err, result) => {
    if (err) {
      console.error("Мэдээлэл оруулахад алдаа гарлаа", err);
      return res.status(500).send("Мэдээлэл оруулахад алдаа гарлаа.");
    }
    res.status(200).send("Захиалга амжилттай нэмэгдлээ.");
  });
});


//updateproducts
app.patch("/updateProducts", (req, res) => {
  const { description, price, product_id } = req.body; 
  const query = "UPDATE products SET description = ?, price = ? WHERE product_id = ?";

  pool.query(query, [ description, price, product_id], (err, result) => {
    if (err) {
      console.error("Мэдээлэл шинэчлэхэд алдаа гарлаа", err);
      return res.status(500).send("Мэдээлэл шинэчлэхэд алдаа гарлаа.");
    } 

    res.status(200).send("Бүтээгдэхүүн амжилттай шинэчлэгдлээ.");
  });
});


//updateUsers
app.patch("/updateUsers", (req, res) => {
  const {username, email, password} = req.body;
  const query = "UPDATE users SET username = ?, email = ? WHERE password = ?";

    pool.query(query, [username, email, password], (err, result) => {
      if (err) {
        console.error("Мэдээлэл оруулахад алдаа гарлаа", err);
        return res.status(500).send("Мэдээлэл оруулахад алдаа гарлаа");
      }
      res.status(201).send("amjilttai");
      })
});


//delete
app.delete("/deleteReviews", (req, res) => {
  const { reviewIds } = req.body; 
  const query = "DELETE FROM reviews WHERE review_id IN (?)";

  pool.query(query, [reviewIds], (err, result) => {
    if (err) {
      console.error("Мэдээлэл устгахад алдаа гарлаа", err);
      return res.status(500).send("Устгах үед алдаа гарлаа.");
    }

    res.status(200).send(" үнэлгээ амжилттай устгагдлаа.");
  });
});

