export default async (req, res) => {
  const baidu = await fetch("https://www.baidu.com").then((e) => e.text());
  console.log(baidu);
  res.status(200).json({ message: baidu });
};
//s
