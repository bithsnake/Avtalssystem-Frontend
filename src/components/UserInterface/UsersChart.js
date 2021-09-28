import Chart from "../Chart/Chart";

const UsersChart = (props) => {

  const { users } = props;
  const chartDataPoints = [
      ...props.userdata
  ];
  for (let i = 0; i < users.length; i++) {
    chartDataPoints[i].value += users[i].users.length;
    }

  return <Chart dataPoints={chartDataPoints} />;
};

export default UsersChart;
