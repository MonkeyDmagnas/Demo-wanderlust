export default function formatPostTime(time) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(time).toLocaleDateString("en-US", options);
}
