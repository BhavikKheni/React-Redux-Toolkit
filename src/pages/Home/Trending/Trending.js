import React, { useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../component/lazyLoadImage/Img";
import SwitchTabs from "../../../component/switchTabs/SwitchTabs";
import Skeleton from "@mui/material/Skeleton";
import "react-circular-progressbar/dist/styles.css";
import "./Trending.scss";

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");
  const navigate = useNavigate();
  const { url, genres } = useSelector((state) => state.home);
  const { data ,loading} = useFetch(`/trending/movie/${endpoint}`);
  
  const onTabChange = (event, newValue) => {
    setEndpoint(newValue === "Day" ? "day" : "week");
  };
  return (
    <div className="trending-component">
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} loading={loading}></SwitchTabs> 
      <div
        className="card-wrapper"
      >
        {!loading ? (
          data?.results?.map((item, index) => {
            const posterUrl = item.poster_path
              ? url.poster + item.poster_path
              : "";
            const rating = item.vote_average.toFixed(1);
            return (
              <Card
                sx={{ maxWidth: 300, minWidth: 300 }}
                key={index}
                style={{ margin: "10px" }}
                onClick={() =>
                  navigate(`/${item.media_type || endpoint}/${item.id}`)
                }
              >
                <div className="trending_img">
                  <Img src={posterUrl} />
                </div>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    noWrap={true}
                  >
                    {item.title}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                  </Typography>
                </CardContent>
                <CardActions>
                  <div className="circleRating">
                    <CircularProgressbar
                      value={rating}
                      maxValue={10}
                      text={rating}
                      styles={buildStyles({
                        pathColor:
                          rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                      })}
                    />
                  </div>

                  <div className="genres">
                    {item.genre_ids.slice(0, 2)?.map((g) => {
                      // eslint-disable-next-line array-callback-return
                      if (!genres[g]?.name) return;
                      return (
                        <div key={g} className="genre">
                          {genres[g]?.name}
                        </div>
                      );
                    })}
                  </div>
                </CardActions>
              </Card>
            );
          })
        ) : (
          <>
           
            {Array.from(new Array(7)).map((data,index) => {
              return (
                <Skeleton key={index} variant="rectangular" width={216} height={324} />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Trending;
