import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "video-react/dist/video-react.css";
import { Player, BigPlayButton } from "video-react";
import { markLectureAsComplete } from "../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../redux/slices/viewCourseSlice";

function VideoDetails() {
  const [videoData, setVideoData] = useState(null);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { courseId, sectionId, subSectionId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  function isFirstVideo() {
    const sectionIndex = courseSectionData?.findIndex(
      (section) => section._id === sectionId
    );
    const subSectionIndex = courseSectionData?.[
      sectionIndex
    ]?.subSection?.findIndex((subSection) => subSection._id === subSectionId);
    if (subSectionIndex === 0 && sectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  }

  const isLastVideo = () => {
    const sectionIndex = courseSectionData?.findIndex(
      (section) => section._id === sectionId
    );
    const subSectionIndex = courseSectionData?.[
      sectionIndex
    ]?.subSection?.findIndex((subSection) => subSection._id === subSectionId);

    const noOfSubsections = courseSectionData[sectionIndex].subSection.length;

    if (
      sectionIndex === courseSectionData.length - 1 &&
      subSectionIndex === noOfSubsections - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const goToNextVideo = () => {
    // (courseSectionData)

    const sectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );

    const noOfSubsections = courseSectionData[sectionIndex].subSection.length;

    const subSectionIndex = courseSectionData[
      sectionIndex
    ].subSection.findIndex((subSection) => subSection._id === subSectionId);

    // ("no of subsections", noOfSubsections)

    if (subSectionIndex !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[sectionIndex].subSection[subSectionIndex + 1]._id;
      navigate(
        `/viewcourse/${courseId}/section/${sectionId}/subsection/${nextSubSectionId}`
      );
    } else {
      const nextSectionId = courseSectionData[sectionIndex + 1]._id;
      const nextSubSectionId =
        courseSectionData[sectionIndex + 1].subSection[0]._id;
      navigate(
        `/viewcourse/${courseId}/section/${nextSectionId}/subsection/${nextSubSectionId}`
      );
    }
  };

  function goToPrevVideo() {
    const sectionIndex = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );

    const noOfSubsections = courseSectionData[sectionIndex].subSection.length;

    const subSectionIndex = courseSectionData[
      sectionIndex
    ].subSection.findIndex((subSection) => subSection._id === subSectionId);
    if (subSectionIndex !== 0) {
      const prevSubSectionId =
        courseSectionData[sectionIndex].subSection[subSectionIndex - 1]._id;
      navigate(
        `/viewcourse/${courseId}/section/${sectionId}/subsection/${prevSubSectionId}`
      );
    } else {
      const prevSectionId = courseSectionData[sectionIndex - 1]._id;
      const prevSubSectionLength =
        courseSectionData[sectionIndex - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData[sectionIndex - 1].subSection[prevSubSectionLength - 1]
          ._id;
      navigate(
        `/viewcourse/${courseId}/section/${prevSectionId}/subsection/${prevSubSectionId}`
      );
    }
  }
  async function handleLectureCompletion() {
    setLoading(true);
    const res = await markLectureAsComplete({ courseId, subSectionId }, token);
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  }
  useEffect(() => {
    function getFirstVideo() {
      if (!courseSectionData.length) return;
      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`);
      } else {
        const sectionIndex = courseSectionData?.findIndex(
          (section) => section._id === sectionId
        );
        // (courseSectionData[sectionIndex]?.subSection);
        const subSectionIndex = courseSectionData?.[
          sectionIndex
        ]?.subSection?.findIndex(
          (subSection) => subSection._id === subSectionId
        );

        setVideoData(
          courseSectionData?.[sectionIndex]?.subSection?.[subSectionIndex]
        );
        setPreviewSource(courseEntireData?.thumbnail);
        setVideoEnded(false);
      }
    }
    getFirstVideo();
  }, [courseEntireData, courseSectionData, location.pathname]);
  return (
    <div className="flex flex-col gap-5 h-screen text-white">
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          autoPlay={true}
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoURL}
        >
          <BigPlayButton position="center" />
          {/* Render When Video Ends */}
          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="w-full absolute inset-0 z-10 flex items-center justify-center gap-5 flex-col font-inter"
            >
              {!completedLectures.includes(subSectionId) && (
                <button
                  onClick={handleLectureCompletion}
                  className="text-sm text-black bg-yellow-50 py-2 rounded-md font-semibold max-w-max px-4 mx-auto"
                >
                  {!loading ? "Mark As Completed" : "Loading..."}
                </button>
              )}
              <button
                onClick={() => {
                  if (playerRef?.current) {
                    // set the current time of the video to 0
                    playerRef?.current?.seek(0);
                    setVideoEnded(false);
                  }
                }}
                className="text-sm text-black bg-yellow-50 py-2 rounded-md font-semibold max-w-max px-4 mx-auto"
              >
                Rewatch
              </button>

              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="blackButton"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}

      {/* <h1 className="mt-4 text-3xl font-semibold text-richblack-50">
        {videoData?.title}
      </h1>
      <p className="pt-2 pb-6">{videoData?.description}</p> */}
    </div>
  );
}

export default VideoDetails;
