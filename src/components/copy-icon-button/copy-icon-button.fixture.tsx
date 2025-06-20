import { Surface, Text } from "natmfat";
import { CopyIconButton } from ".";
import { Wrapper } from "../../wrapper";

export default (
  <Wrapper className="flex-row items-center gap-2">
    <Surface elevated className="rounded-default px-2 py-0.5">
      <Text className="font-mono">hello</Text>
    </Surface>
    <CopyIconButton text="hello" />
  </Wrapper>
);
