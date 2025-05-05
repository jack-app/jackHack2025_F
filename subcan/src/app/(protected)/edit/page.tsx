import React from "react";
import InputWithLabel from "./componets/InputWithLabel";
type Props = {
  // Propsの型をここに定義
};

const MyComponent: React.FC<Props> = (props) => {
  return (
    <div>
      {/* コンポーネントの内容をここに記述 */}

      <InputWithLabel />
    </div>
  );
};

export default MyComponent;
