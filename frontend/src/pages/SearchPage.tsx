import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();
  return <span>You searched for {city}</span>;
};

export default SearchPage;
