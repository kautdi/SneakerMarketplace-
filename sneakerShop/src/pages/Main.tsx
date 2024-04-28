import { FC, useEffect } from "react"
import Categories from "../components/Main/Categories"
import Sorting from "../components/Main/Sorting"
import TovarsBlock from "../components/Main/TavarsBlock"



export const Main: FC = () => {

    return (
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories/>
            <Sorting/>
          </div>
          <h2 className="content__title">Все кроссовки</h2>
          <TovarsBlock/>
        </div>
      </div>
    )
}