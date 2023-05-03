export default (req, res) => {
  res.status(200).json({ message: "Hello, Next.js API!" });
};
fetch("/api/hello")
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
