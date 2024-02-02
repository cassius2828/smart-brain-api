const handleRegister = (req, res, bcrypt, db) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }

  const hash = bcrypt.hashSync(password);
  // transaction makes sure tables wont fall out of sync
  // if one is able to be updated and the other is not
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      // first update the login table, then we get the login email
      // now we update the users table in a promise
      .then((loginEmail) => {
        return (
          trx("users")
            .returning("*")
            .insert({
              name: name,
              email: loginEmail[0].email,
              joined: new Date(),
            })
            .then((user) => {
              res.json(user[0]);
            })
            .then(trx.commit)
            .catch(trx.rollback)
            // must commit the updates to see changes
            .catch((err) => res.status(400).json("unable to join"))
        );
      });
  });
};

export default handleRegister;
