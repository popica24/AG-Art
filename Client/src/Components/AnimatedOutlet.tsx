import React, { useState } from "react";
import { useOutlet } from "react-router";

const AnimatedOutlet: React.FC = () => {
  const o = useOutlet();
  const [outlet] = useState(o);

  return <>{outlet}</>;
};

export default AnimatedOutlet;
