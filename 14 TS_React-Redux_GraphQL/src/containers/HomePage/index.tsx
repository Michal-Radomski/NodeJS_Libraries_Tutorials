import React from "react";
import {Dispatch} from "redux";
import styled from "styled-components";

import {useAppDispatch} from "../../redux/hooks";
import animeService from "../../services/animeService";
import {GetAnimePage} from "../../services/animeService/__generated__/GetAnimePage";
import {setAnimePage} from "./homePageSlice";
import {HotAnime} from "./hotAnime";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const actionDispatch = (dispatch: Dispatch) => ({
  setAnimePage: (page: GetAnimePage["Page"]) => dispatch(setAnimePage(page)),
});

const HomePage = (): JSX.Element => {
  const {setAnimePage} = actionDispatch(useAppDispatch());

  React.useEffect(() => {
    const fetchAnimePage = async () => {
      const animePage = await animeService.getAnimePage(0, 4).catch((error) => {
        console.log("Error: ", error);
      });
      // console.log("AnimePage: ", animePage);
      if (animePage) {
        setAnimePage(animePage);
      }
    };

    fetchAnimePage();
  }, [setAnimePage]);

  return (
    <Container>
      <h1>Hot Anime</h1>
      <HotAnime />
    </Container>
  );
};

export default HomePage;
