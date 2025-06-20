import { Surface, Text } from "natmfat";
import { CopyIconButton } from ".";
import { Wrapper } from "../../wrapper";

export default (
  <Wrapper className="flex-row gap-2 items-center">
    <Surface elevated className="px-2 py-0.5 rounded-default">
      <Text className="font-mono">hello</Text>
    </Surface>
    <CopyIconButton text="hello" />
  </Wrapper>
);
