import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Salon from "../../../components/salon";
import Loader from "../../../components/loader";
import NotFound from "../../../components/notfound";

function SalonsAround(props) {

  return (
    <div className="salons-around-container">
      <div className="title">
        <p className="mb-0">{props.salonsAround.length} Salons Around You</p>
      </div>
      {props.isLoader ? <Loader width={60} height={60} color={"#772286"} />
        : <>{props.salons ? <>{props.salons.length == 0 ? <NotFound /> : <div className="salons">
          <InfiniteScroll
            dataLength={props.salonsAround.length > 0
              ? props.salonsAround.length : 1}
            next={props.increasePerpage}
            hasMore={true}
            loader={
              props.isScrollLoader ? (
                <Loader width={60} height={60} color={"#772286"} />
              ) : (
                ""
              )
            }
            scrollThreshold={.5}
          >
            <Salon
              salons={props.salonsAround}
            />
          </InfiniteScroll>
        </div>
        }</> : ""}</>}
    </div>
  );
}

export default SalonsAround;
