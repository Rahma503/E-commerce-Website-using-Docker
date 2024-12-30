
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if user exists in the database
  pool.query(
    `SELECT * FROM users WHERE username = $1`,
    [username],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
        return;
      }

      if (results.rows.length === 0) {
        // User not found, redirect to signup
        res.redirect("foront/signup.html");
        return;
      }

      const user = results.rows[0];

      // Compare passwords
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: "Internal server error" });
          return;
        }

        if (!isMatch) {
          // Passwords don't match
          res.status(401).json({ message: "Invalid credentials" });
          return;
        }

        // Passwords match, redirect to index.html
        res.redirect("foront/index.html");
      });
    }
  );
});
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert new user into the database
  pool.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`,
      [username, email, hashedPassword],
      (err, results) => {
          if (err) {
              console.error(err);
              res.status(500).json({ message: "Failed to sign up" });
              return;
          }
          
          // Successful sign-up
          res.sendStatus(200);
      }
  );
});

