import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchCourse } from "../../redux/courses/operations";
import { useLocation } from "react-router-dom";
import { selectCourse } from "../../redux/courses/selectors";
import React from "react";
import ReactPlayer from "react-player/lazy";
import s from "./CoursePage.module.css";
import { useNavigate } from "react-router-dom";

const CoursePage = () => {
  const [played, setPlayed] = useState(0);
  const [lesson, setLesson] = useState({});

  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCourse(location.pathname));
  }, [dispatch, location.pathname]);

  const course = useSelector(selectCourse);
 

  const playerRef = React.useRef();

  const onReady = React.useCallback(() => {
    const timeToStart = played;
    playerRef.current?.seekTo(timeToStart, "seconds");
  }, [played]);

  if (course.lessons && url === "") {
    let firstLesson;
    firstLesson = course?.lessons?.find((e) => e?.order === 1);
    setUrl(firstLesson?.link);
    setLesson(firstLesson);
    
  }

  function handleClickButton(id) {
    let lessons = course.lessons;
    let lesson = lessons.find((e) => e.id === id);
    setLesson(lesson);
    setUrl(lesson.link);
  }

  function handleBack() {
    navigate("/");
  }

  return (
    <>
      {course?.lessons ? (
        <div className={s.container}>
          <h2 className={s.title}>Title : {course.title}</h2>
          <h3 className={s.description}>Description: {course.description}</h3>
          <h3 className={s.description}>
            Number of lessons: {course.lessons?.length}
          </h3>

          <ul className={s.list}>
            {course.lessons?.map((e) => {
              return (
                <li key={e.id}>
                  Lesson {e.order}: {e.title}{" "}
                  {e.status === "locked" && (
                    <button className={s.locked}>locked</button>
                  )}{" "}
                  {e.status !== "locked" && (
                    <button
                      className={s.button}
                      onClick={() => handleClickButton(e.id)}
                    >
                      Start lesson
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
          <div className={s.player}>
            <h3 className={s.lesson}>Lesson : {lesson.order}</h3>
            <ReactPlayer
              url={url}
              controls={true}
              onReady={onReady}
              onProgress={(progress) => {
                setPlayed(progress.playedSeconds);
              }}
            />
          </div>
        </div>
      ) : (
        <button className={s.button} onClick={handleBack}>
          Back to courses
        </button>
      )}
    </>
  );
};

export default CoursePage;
