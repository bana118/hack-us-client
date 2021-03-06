import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import { GetUserQuery } from "../types/graphql";

export type ContributionPieChartProps = {
  contributions: GetUserQuery["user"]["contributions"];
};

export const ContributionPieChart = ({
  contributions,
}: ContributionPieChartProps): JSX.Element => {
  const mainContributions =
    contributions != null ? contributions.slice(0, 5) : [];
  const totalContributions =
    contributions != null && contributions.length > 0
      ? contributions
          .map((info) => info.count)
          .reduce((total, current) => total + current)
      : 0;
  const totalMainContributions =
    mainContributions.length > 0
      ? mainContributions
          .map((info) => info.count)
          .reduce((total, current) => total + current)
      : 0;
  const otherContributions = totalContributions - totalMainContributions;

  if (otherContributions > 0) {
    mainContributions.push({
      language: "Other",
      color: "#444444",
      count: otherContributions,
    });
  }
  return (
    <PieChart width={730} height={250}>
      <Pie
        data={mainContributions}
        dataKey="count"
        nameKey="language"
        fill="#8884d8"
        startAngle={450}
        endAngle={90}
      >
        {mainContributions.map((v, i) => (
          <Cell key={i} fill={v.color} />
        ))}
      </Pie>
      <Legend verticalAlign="top" />
      <Tooltip />
    </PieChart>
  );
};
