import React from "react";
import Main from "./pages/Main";

function App() {
  return (
    <div
      style={{
        height: "auto",
        padding: "6rem",
        paddingTop: 0,
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "url('https://wallup.net/wp-content/uploads/2019/09/495651-interior-design-home-room-beautiful-arhitecture.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "url('https://wallup.net/wp-content/uploads/2019/09/495651-interior-design-home-room-beautiful-arhitecture.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "blur(8px)",
          maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 50%, transparent 100%)",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 20rem)", // Adjust height to account for padding
        }}
      >
        <Main />
      </div>
    </div>
  );
}

export default App;
