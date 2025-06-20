import { Heading, View } from "natmfat";
import { Logo } from ".";
import { Wrapper } from "../../wrapper";

export default (
  <Wrapper>
    <View className="flex-row items-center gap-2">
      <Logo
        defaultGrid={[
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
          [0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
          [0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
          [0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
          [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
          [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
          [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
          [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]}
      />
      <Heading size="subheadDefault" className="font-mono font-bold">
        @natmat/magic
      </Heading>
    </View>
  </Wrapper>
);
