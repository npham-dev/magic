import { Button, Text } from "natmfat";
import { useState } from "react";
import { AnimateHeight } from ".";
import { Wrapper } from "../../wrapper";

export default () => {
  const [expand, setExpand] = useState(false);

  return (
    <Wrapper className="gap-2">
      <Button onClick={() => setExpand((prevExpand) => !prevExpand)}>
        Expand
      </Button>
      <AnimateHeight expand={expand}>
        <Text>Hello World</Text>
      </AnimateHeight>
    </Wrapper>
  );
};
