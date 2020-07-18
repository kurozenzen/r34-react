// import original module declarations
import "styled-components";
import theme from "./misc/theme";

// and extend them!
declare module "styled-components" {
  export type DefaultTheme = typeof theme;
}
