import React, { useState } from "react";

import ContentToggle from "./ContentToggle";

export default function StatefulContentToggle(props) {
  const [open, setOpen] = useState(false);
  return <ContentToggle {...props} isOpen={open} onToggle={setOpen} />;
}
