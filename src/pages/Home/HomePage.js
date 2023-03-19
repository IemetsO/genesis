import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../redux/courses/operations";
import { logIn } from "../../redux/auth/operations";
import { selectAllCourses } from "../../redux/courses/selectors";
import {
  Container,
  Pagination,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Button,
  CardActions,
  Typography,
  Grid
} from "@mui/material";
import s from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [login, setLogin] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let perPage = 10;
  let pageAmount;

  useEffect(() => {
    dispatch(logIn());
  }, [dispatch]);

  function handleClick() {
    dispatch(fetchCourses());
    setLogin(true);
  }

  const allCourses = useSelector(selectAllCourses);
  let reverse;

  if (allCourses?.courses) {
    pageAmount = Math.ceil(allCourses.courses.length / perPage);
    reverse = Array.from(allCourses?.courses).reverse();
  }

  const lastIndex = page * perPage;
  const firstIndex = lastIndex - perPage;

  let coursesPerPage = reverse?.slice(firstIndex, lastIndex);

  function handleClickButton(id) {
    navigate(`${id}`);
  }

  return (
    <>
      {!login ? (
        <div>
          <h1>To start selecting courses, click the button below</h1>
          <button onClick={handleClick}>Start!</button>
        </div>
      ) : (
        <Container className={s.container}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {allCourses.courses?.length > 0 &&
              coursesPerPage?.map((e) => {
                return (
                    <Grid item xs={2} sm={4} md={4} key={e.id}>
                  <Card sx={{ maxWidth: 500, minWidth: 300 }} className = {s.cards}>
                    {" "}
                    <CardContent>
                      <Typography sx={{ fontSize: 24 }} gutterBottom>
                        {e.title}
                      </Typography>
                      <CardMedia
                        component="img"
                        height="154"
                        image={e.previewImageLink+"/cover.webp"}
                        alt="course"
                      />
                      <Typography
                        variant="h7"
                        component="div"
                        color="text.secondary"
                      >
                        Number of lessons: {e.lessonsCount}
                      </Typography>
                      <Typography variant="h7" component="div">
                        Rating: {e.rating}
                      </Typography>

                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Skills:{" "}
                        {e?.meta?.skills?.map((e) => {
                          return (
                            <li key={e} className={s.list}>
                              {e}
                            </li>
                          );
                        })}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => handleClickButton(e.id)}
                      >
                        Learn More
                      </Button>
                    </CardActions>
                  </Card>
                  </Grid>
                );
              })}
          </Grid>
          {pageAmount > 0 && (
            <Pagination
              className={s.pagination}
              count={pageAmount}
              page={page}
              onChange={(_, num) => setPage(num)}
            ></Pagination>
          )}
        </Container>
      )}
    </>
  );
};

export default HomePage;
