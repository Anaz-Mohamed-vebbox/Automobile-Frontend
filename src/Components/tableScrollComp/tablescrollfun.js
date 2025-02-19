import { api } from "../../Api/api";

export const Fetchdata = async (
  Method,
  Url,
  payload,
  setData,
  setWentWrong,
  setLocalHasMore,
  setLoading
) => {
  // payload.SearchValue = FilterValue.SearchValue;
  var value = await api(Method, Url, payload);
  if (value.message == "Success") {
    if (value.data.length == 0 && payload.offset == 0) {
      setWentWrong("empty");
      setLoading(false);
    } else {
      if (value.data.length < 10) {
        setLocalHasMore(false);
      } else {
        setLocalHasMore(true);
      }
      if (payload.offset != 0) {
        setData((prev) => [...prev, ...value.data]);
        setWentWrong("Success");
        // return value.data;
      } else {
        setData(value.data);
        setWentWrong("Success");
        setLoading(false);
        // return value.data;
      }
    }
  } else {
    setWentWrong("Failed");
    setLoading(false);
  }
};
