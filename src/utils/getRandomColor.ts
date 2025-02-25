export const getRandomColor = () => {
  const colors = [
    {
      bgColor: "bg-red-100",
      textColor: "text-red-600",
      borderColor: "#DC2626",
    },
    {
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      borderColor: "#2563EB",
    },
    {
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      borderColor: "#16A34A",
    },
    {
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
      borderColor: "#CA8A04",
    },
    {
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
      borderColor: "#7C3AED",
    },
    {
      bgColor: "bg-pink-100",
      textColor: "text-pink-600",
      borderColor: "#DB2777",
    },
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
