import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import { ContributionInfo } from "../types/graphql";

export type ContributionPieChartProps = {
  contributionInfo: ContributionInfo[];
};

export const ContributionPieChart = ({
  contributionInfo,
}: ContributionPieChartProps): JSX.Element => {
  const mainContributionInfo = contributionInfo.slice(0, 5);
  const totalContributions = contributionInfo
    .map((info) => info.contributions)
    .reduce((total, current) => total + current);
  const otherContributions =
    totalContributions -
    mainContributionInfo
      .map((info) => info.contributions)
      .reduce((total, current) => total + current);

  if (otherContributions > 0) {
    mainContributionInfo.push({
      language: "Other",
      color: "#444444",
      contributions: otherContributions,
    });
  }
  return (
    <PieChart width={730} height={250}>
      <Pie
        data={mainContributionInfo}
        dataKey="contributions"
        nameKey="language"
        fill="#8884d8"
        startAngle={450}
        endAngle={90}
      >
        {mainContributionInfo.map((v, i) => (
          <Cell key={i} fill={v.color} />
        ))}
      </Pie>
      <Legend verticalAlign="top" />
      <Tooltip />
    </PieChart>
  );
};
