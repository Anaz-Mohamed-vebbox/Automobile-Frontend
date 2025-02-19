import React, { useEffect, useRef, useState } from "react";
import Table from "../Table/Table";
import "./tableScroll.css";
import Loder from "../Loder/Loder";
import { SomethingWrong } from "../SomethingWrong/SomethingWrong";

import { Url } from "../../Api/EndPoint";
import { Fetchdata } from "./tablescrollfun";
import HeadComp from "../../Common/HeadComp/HeadComp";
import LineProgress from "../../Common/LineProgress/LineProgress";

export const TableScroll = ({
  handleUpdateId,
  isButtons,
  data,
  Method,
  URL,
  NestedBtn = false,
  State,
  Current,
  Completed,
  LabelOne,
  LabelTwo,
  Group,
  title,
  id,
  Nodate,
  Close,
  HandlePopUp

}) => {
  const tableRef = useRef();
  const [Data, setData] = useState([]);
  const [wentWrong, setWentWrong] = useState("Loading");
  const [payload, setPayload] = useState({
    id: id ?? "",
    limit: 10,
    offset: 0,
    SearchValue: "",
    FromDate: "",
    ToDate: "",
  });
  const [localHasMore, setLocalHasMore] = useState(true);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (localHasMore) {
      setLocalHasMore(false);
      setLoading(true);
      Fetchdata(
        Method,
        URL,
        payload,
        setData,
        setWentWrong,
        setLocalHasMore,
        setLoading
      );
    }
  }, [payload]);

  useEffect(() => {
    setLoading(false);
  }, [Data]);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.addEventListener("scroll", handleScroll);
    }
    return () => tableRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (!tableRef.current || !localHasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = tableRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 1) {
      setPayload((prev) => ({
        ...prev,
        offset: prev.offset + prev.limit,
      }));
    }
  };
  const HandleFilterSubmit = (e, value) => {
    e.preventDefault();
    setPayload((prev) => ({
      ...prev,
      FromDate: value.FromDate,
      ToDate: value.ToDate,
      offset: 0
    }));
    setLocalHasMore(true);
  };
  const HandleClearData =()=>{
    setPayload((prev) => ({
      ...prev,
      FromDate: "",
      ToDate:"",
      offset: 0
    }));
    setLocalHasMore(true);
  }
  return (
    <>
      {NestedBtn ? (
        <HeadComp
          State={State}
          Current={Current}
          Completed={Completed}
          LabelOne={LabelOne}
          LabelTwo={LabelTwo}
          Group={Group}
          onChangeHandle={(e) => {
            setPayload((prev) => ({ ...prev, SearchValue: e, offset: 0 }));
            // e != "" && setLocalHasMore(true);
            setLocalHasMore(true)
          }}
          title={title ?? ""}
          HandleFilterSubmit={HandleFilterSubmit}
          HandleClearData={HandleClearData}
          Nodate={Nodate}
          Method={Method}
          URL = {URL}
          payload={payload}
          setWentWrong={setWentWrong}
          setLoading={setLoading}
        
        />
      ) : (
        <HeadComp
          onChangeHandle={(e) => {
            setPayload((prev) => ({ ...prev, SearchValue: e, offset: 0 }));
            setLocalHasMore(true);
          }}
          title={title ?? ""}
          HandleFilterSubmit={HandleFilterSubmit}
          HandleClearData={HandleClearData}
          Nodate={Nodate}
          Method={Method}
          URL = {URL}
          payload={payload}
          setWentWrong={setWentWrong}
          setLoading={setLoading}
          Close={Close}
          HandlePopUp={HandlePopUp}
        />
      )}
      <div className="ViewAgentComponent-Table-Parent-Div">
        <div className="ViewAgentComponent-Table-Div">
          <div className="tableScroll-container" ref={tableRef}>
            {wentWrong == "Success" ? (
              <>
                <Table isButtons={isButtons} data={Data} Loading={Loading} />
              </>
            ) : wentWrong == "Failed" ? (
              <div className="SomeThing-Wrong">
                <SomethingWrong responce={""} />
              </div>
            ) : wentWrong == "empty" ? (
              <div className="SomeThing-Wrong">
                <SomethingWrong responce={"empty"} />
              </div>
            ) : (
              <div className="SomeThing-Wrong">
                <Loder />
              </div>
            )}
           
          </div>
          
        </div>
        {Loading && (
              <div
                style={{
                  width: "92.5%",
                  // border:"2px solid black",
                  zIndex: 1,
                }}
              >
                <LineProgress />
              </div>
            )}
      </div>
    </>
  );
};
