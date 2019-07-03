const sayHi = (req, res) => {
  const name = req.query.name || "there";
  res.end(`Hi ${name}!`);
};

module.exports = sayHi;
