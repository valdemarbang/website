import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import Typography from "@mui/material/Typography";

interface BookmarkProps {
  markerID: number;
  userID: number;
  sxDesign: string;
}

function Bookmark({ markerID, userID, sxDesign }: BookmarkProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = async () => {
    const response = await fetch(
      `http://localhost:8080/bookmark/${markerID}/${userID}`
    );
    const data = await response.json();
    setIsBookmarked(data.bookmarked);
  };

  useEffect(() => {
    const fetchBookmark = async () => {
      const response = await fetch(
        `http://localhost:8080/bookmark/${markerID}/${userID}`
      );
      const data = await response.json();
      setIsBookmarked(data.bookmarked);
    };
    fetchBookmark();
  }, [markerID, userID]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={sxDesign}
    >
      {isBookmarked ? (
        <BookmarkAddedIcon />
      ) : (
        <BookmarkBorderIcon onClick={handleBookmark} />
      )}
      <Typography
        variant="caption"
        sx={{ fontFamily: "Outfit", fontSize: "8px" }}
      >
        Bookmark
      </Typography>
    </Box>
  );
}

export default Bookmark;
