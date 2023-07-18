import React from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./DetailsBanner/DetailsBanner";

const Details = () => {
  const { mediaType, id } = useParams();
  const { data } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits } = useFetch(`/${mediaType}/${id}/credits`);

  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
    </div>
  );
};

export default Details;
