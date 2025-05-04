import { Kosugi_Maru } from "next/font/google";
import React from "react";
import Card from "./components/card";
import FrequencyButton from "./components/frequency_button";

type Props = {
  // Propsの型をここに定義
};

const MyComponent: React.FC<Props> = (props) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.value;
    alert(`選択された値: ${value}`);
  };

  return (
    <div>
      {/* コンポーネントの内容をここに記述 */}
      <Card
        name="Amazon"
        price={2000}
        iconPath="https://images.ctfassets.net/4cd45et68cgf/Rx83JoRDMkYNlMC9MKzcB/2b14d5a59fc3937afd3f03191e19502d/Netflix-Symbol.png?w=700&h=456"
      />
      <div>
        <h1
          style={{
            fontSize: 20,
            marginTop: 30,
            textAlign: "center",
            fontFamily: "Kosugi_Maru",
          }}
        >
          使用頻度を選択してください
        </h1>
      </div>
      <FrequencyButton content="毎日" handleClick={handleClick} />
      <FrequencyButton content="週に数回" handleClick={handleClick} />
      <FrequencyButton content="月に数回" handleClick={handleClick} />
      <FrequencyButton content="年に数回" handleClick={handleClick} />
      <FrequencyButton content="最近使ってない" handleClick={handleClick} />
    </div>
  );
};

export default MyComponent;
