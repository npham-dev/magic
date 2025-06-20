import { Heading, View } from "natmfat";
import { Logo } from ".";
import { Wrapper } from "../../wrapper";

export default (
  <Wrapper>
    <View className="flex-row items-center gap-2">
      <Logo />
      <Heading size="subheadDefault" className="font-mono font-bold">
        npham_dev
      </Heading>
    </View>
  </Wrapper>
);
