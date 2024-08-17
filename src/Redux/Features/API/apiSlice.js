import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const apiSlice = createApi({
  reducerPath: "FACEHOOKAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
    prepareHeaders: (headers) => {
      if (Cookies.get("token")) {
        headers.set("authorization", Cookies.get("token"));
        // headers.set("Content-Type", "multipart/form-data");
      }
      return headers;
    },
  }),
  tagTypes: ["update", "update-image", "user-post"],
  endpoints: (builder) => ({}),
});
//https://cloud.mongodb.com/v2/66af7a3e1a711066d90511f1#/metrics/replicaSet/66af7a94457c8a069f10e62d/explorer/Facehook/users/find
