import React from "react";
import LogoutPage from "./test/logout";

type Props = {
  // Propsの型をここに定義
};

const MyComponent: React.FC<Props> = (props) => {
  return (
    <div style={{ margin: "50px" }}>
      <h1 style={{ fontSize: "20px", textAlign: "left" }}>
        Googleアカウントでログイン中
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "2px solid black",
          paddingBottom: "4px",
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <label
          htmlFor="email"
          style={{
            fontSize: "16px",
            marginRight: "10px",
            whiteSpace: "nowrap",
            color: "gray",
            opacity: 0.7,
          }}
        >
          メール
        </label>
        <input
          type="text"
          value="example@example.com"
          readOnly
          // id="email"
          // placeholder="example@example.com"
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: "16px",
            padding: "4px 0",
            backgroundColor: "transparent",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "15vh",
        }}
      >
        {/* <button
          style={{
            opacity: 0.5,
            width: "80%",
            maxWidth: "200px",
            padding: "8px 10px",
            border: "1px solid red",
            borderRadius: "10px",
            backgroundColor: "white",
            color: "red",
            fontSize: "20px",
            fontWeight: "bold",
          }}
          onClick={LogoutPage}
        >
          ログアウト</button> */}
        <LogoutPage />
      </div>
    </div>
  );
};

export default MyComponent;
