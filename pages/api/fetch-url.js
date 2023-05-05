export default async (req, res) => {
  const url = req.query.url;
  const text = await fetch(url).then((e) => e.text());
  console.log(text);
  res.status(200).json({ message: text });
};
