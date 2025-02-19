// import React, { useEffect } from "react";
// import Button from "../../Common/Button/Button";
// import { useNavigate } from "react-router-dom";
// import { Path } from "../../Route/Path";

// const Login = () => {
//     const navigate = useNavigate()
//     useEffect(()=>{
//       // console.log("login");

//         navigate(Path.dashboard)
//     },[])
//   return <div>
//     <Button Label={"LOGIN"} onClick={()=>navigate(Path.dashboard)}/>
//   </div>;
// };

//  export default Login;
// import React, { useEffect, useRef, useState } from "react";
// import Para from "../../Common/Para/para";
// import Button from "../../Common/Button/Button";
// import OptionsCom from "../OptionsCom/OptionsCom";
// import Table from "../../Common/Table/Table";
// import { useNavigate } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import "./CommonContainer.css";
// import Popup from "../Popup/Popup";
// import LinearLoading from "../../Common/LoadingComp/LinearLoading";
// import FilterPopUp from "../../Common/FilterPopUp/FilterPopUp";
// const CommonContainer = ({
//   Title,
//   buttons,
//   Actionbtn,
//   data,
//   back,
//   Titlechild,
//   backbtncss,
//   btnlable,
//   btnonclick,
//   filterCriteria,
//   backLogo,
//   buttonsOption,
//   Tablebtns,
//   ConfirmPop,
//   setConfirmPop,
//   popConfirm,
//   popCancel,
//   popContent,
//   popHeading,
//   ProductCard,
//   Popupalert,
//   setPopupalert,
//   ChildComponent,
//   ComfirmPopButtons,
//   scrollFunction = () => {},
//   searchFun,
//   hasMore = false,
//   page,
//   setPage = () => {},
//   loading,
//   setLoading = () => {},
// }) => {
//   const [rowData, setrowData] = useState("");
//   const navigate = useNavigate();
//   const [dateFilter, setDateFilter] = useState({
//     fromDate: "",
//     toDate: "",
//   });
//   const [sortByFilter, setSortByFilter] = useState({
//     sortBy: "",
//     orderBy: "DESC",
//   });

//   const [searchInput, setSearchInput] = useState("");

//   const [isFilterPopUp, setIsFilterPopUp] = useState(false);
//   const [isDateFilter, setIsDateFilter] = useState(false);

//   const tableRef = useRef(null);

//   useEffect(() => {
//     if (buttons) {
//       let filters = {
//         offset: page * 10,
//         limit: 10,
//         search_term: searchInput,
//         from_date: dateFilter.fromDate,
//         to_date: dateFilter.toDate,
//         sort_by: sortByFilter.sortBy,
//         order_by: sortByFilter.orderBy,
//       };
//       setLoading(true);
//       scrollFunction(filters);
//     }
//   }, [page, searchInput, isDateFilter]);

//   const onDateSubmit = () => {
//     setIsFilterPopUp(false);
//     setPage(0);
//     setIsDateFilter(!isDateFilter);
//   };

//   // Scroll event handler to load more data when reaching the bottom
//   const handleScroll = () => {
//     if (tableRef.current) {
//       const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
//       if (scrollTop + clientHeight >= scrollHeight - 1 && !loading && hasMore) {
//         setPage((prevPage) => prevPage + 1);
//       }
//     }
//   };  

//   // Check if the table content is scrollable, and load more data if it's not scrollabl

//   useEffect(() => {
//     const tableElement = tableRef.current;

//     if (tableElement) {
//       tableElement.addEventListener("scroll", handleScroll);
//     }
//     return () => {
//       if (tableElement) {
//         tableElement.removeEventListener("scroll", handleScroll);
//       }
// }
//   }, [loading]);

//   const searchOnChange = (e) => {
//     setSearchInput(e.target.value);
//     setPage(0);
//   };

//   // useEffect(() => {
//   //   if (tableRef.current) {
//   //     tableRef.current.addEventListener("scroll", handleScroll);
//   //     return () => tableRef.current.removeEventListener("scroll", handleScroll);
//   //   }
//   // }, [loading]);

//   // Check if more data is needed after every data load
//   // useEffect(() => {
//   //   checkIfScrollable(); // Automatically fetch more data if the table is not scrollable
//   // }, [data]);

//   return (
//     <div className="CommonParentContainer">
//       {isFilterPopUp && buttons && (
//         <FilterPopUp
//           onDateSubmit={onDateSubmit}
//           date={dateFilter}
//           setDate={setDateFilter}
//           sortBy={sortByFilter}
//           setSortBy={setSortByFilter}
//           open={isFilterPopUp}
//           setOpen={setIsFilterPopUp}
//           data={data}
//         />
//       )}
//       <div
//         style={{ opacity: Popupalert || ConfirmPop ? "0.4" : "1" }}
//         className="ProductParentContainer"
//       >
//         <div className="ProductTitleContainer-1">
//           <Para classname="headingtext" label={Title} />
//           {back && (
//             <Button
//               onclick={btnonclick}
//               icon={backLogo && <FaArrowLeft />}
//               Label={btnlable ? btnlable : "Back"}
//               classname={backbtncss ? backbtncss : "Backbtn"}
//             />
//           )}
//         </div>
//         <Para classname="headingtextmini" label={Titlechild} />
//         {buttons && (
//           <OptionsCom
//             searchInput={searchInput}
//             handleChange={searchOnChange}
//             filterCriteria={filterCriteria}
//             OriginalData={data}
//             setfilterData={data}
//             buttonsOption={buttonsOption}
//             open={isFilterPopUp}
//             setOpen={setIsFilterPopUp}
//           />
//         )}
//         <div className="ProductTableConatiner">
//           <div
//             id="TableChildContainer"
//             className="TableChildContainer"
//             ref={tableRef}
//           >
//             <Table
//               loading={loading}
//               setrowData={setrowData}
//               popvalues={popContent}
//               Popup={Popupalert}
//               setPopup={setPopupalert}
//               isButtons={Actionbtn}
//               data={data}
//             />
//           </div>
//         </div>
//         {loading && <LinearLoading />}
//       </div>
//       {Popupalert &&
//         (ChildComponent ? (
//           <div className="ParentContantViewCard">
//             <div
//               style={{ opacity: ConfirmPop && "0.3" }}
//               className="ContantViewCardCommon"
//             >
//               {ChildComponent}
//             </div>
//           </div>
//         ) : (
//           <Popup
//             isclose={Popupalert}
//             setisclose={setPopupalert}
//             popupButtons={Tablebtns}
//             Content={popHeading}
//           />
//         ))}
//       {ConfirmPop && (
//         <>
//           <Popup
//             popupButtons={ComfirmPopButtons}
//             firstPopupalert={setPopupalert}
//             popCancel={popCancel}
//             popConfirm={popConfirm}
//             setConfirmPop={setConfirmPop}
//             Content="Are you confirm to remove ?"
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default CommonContainer;
