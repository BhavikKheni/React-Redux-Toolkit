import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchDataFromApi } from "./utils/api";
import { getApiConfiguration, getGenres } from "./store/HomeSlice";
import Details from "./pages/Details/Details";
import Home from "./pages/Home/Home";
import Header from "./pages/Header/Header";
import Footer from "./pages/Footer/Footer";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res?.images?.secure_base_url + "original",
        poster: res?.images?.secure_base_url + "original",
        profile: res?.images?.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  };
  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres?.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
