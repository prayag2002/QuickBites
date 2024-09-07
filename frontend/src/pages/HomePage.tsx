import LandingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-36 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-24">
        <h1 className="text-4xl font-bold tracking-tight text-orange-600">
          Get your favourite food!
        </h1>
        <span className="text-xl">Food is just a click away!</span>
        <SearchBar
          placeHolder="Search By City, eg.- Delhi"
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-2">
        <img src={LandingImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order Takeaway even faster!
          </span>
          <span>Download the MernEats app from playstore.</span>
          <img src={appDownloadImage} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
