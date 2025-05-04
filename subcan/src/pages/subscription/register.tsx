import React from "react";

type Props = {
  // Propsの型をここに定義
};

const MyComponent: React.FC<Props> = (props) => {
  const formData = [
    { label: "サブスク名", value: "" },
    { label: "サブスク期間", value: "" },
    { label: "金額", value: "" },
    { label: "更新頻度", value: "" },
    { label: "利用頻度", value: "" },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* コンポーネントの内容をここに記述 */}
        <h3 style={{ marginLeft: "20px" }}>どのサブスクを登録しますか？</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "300px",
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "15px",
          }}
        >
          <select
            style={{
              width: "80%",
              height: "40px",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            <option>NetFlix</option>
            <option>AmazonPrime</option>
            <option>その他</option>
          </select>

          {formData.map((item, index) => (
            <div
              style={{
                color: "gray",
                width: "300px",
                padding: "10px",
                borderRadius: "10px",
                marginBottom: "15px",
                margin: "auto",
              }}
            >
              {" "}
              {item.label}
              <input
                type="text"
                key={index}
                style={{
                  display: "block",
                  width: "80%",
                  height: "35px",
                  borderRadius: "5px",
                  border: "2px solid brack",
                  padding: "5px",
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          style={{
            backgroundColor: "white",
            border: "2px solid #3C6E71",
            borderRadius: "7px ",
            width: "20%",
          }}
        >
          登録
        </button>
      </div>
    </div>
  );
};

export default MyComponent;
