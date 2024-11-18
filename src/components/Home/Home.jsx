import Feed from "../Feed/Feed";
import { useTitle } from "../hooks/useTitle";
const Home = () => {
  useTitle();
  return (
    <div>
      <Feed />
    </div>
  );
};

export default Home;
